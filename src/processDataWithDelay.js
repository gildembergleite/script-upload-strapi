export async function processDataWithDelay(startIndex, endIndex, delayTime) {
  for (let i = startIndex; i <= endIndex; i += 3) {
    try {
      const response = await fetch(`https://www.ceramicaportinari.com.br/pt/downloads/load_more_collections/${i}`)
      const data = await response.json()

      for (const item of data.payload) {
        
        const formData = {
          data: {
            Ordem: Number(item.id),
            Titulo: item.api_name,
            download_categoria: { id: 2 }
          }
        }

        const strapiResponse = await fetch('https://portinari-site-strapi.prd.cloud.dex.co/api/downloads', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log(`Status Code: ${strapiResponse.status} | Entry: ${item.api_name}`)

        await new Promise(resolve => setTimeout(resolve, delayTime))
      }
    } catch (error) {
      console.error(error)
    }
  }
}