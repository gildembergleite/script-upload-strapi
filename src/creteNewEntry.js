import { downloadFile } from './downloadFile.js'

export async function createNewEntry(item) {
  const imagePath = `./downloads/${item.api_id}.jpg`
  const pdfPath = `./downloads/${item.api_id}.pdf`

  await downloadFile(`${process.env.BASE_URL}${item.img}`, imagePath)
  await downloadFile(`${process.env.BASE_URL}/${item.catalog}`, pdfPath)
        
  const formData = {
    data: {
      Ordem: Number(item.id),
      Titulo: item.api_name,
      download_categoria: { id: 2 }
    }
  }

  const response = await fetch(process.env.DOWNLOAD_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  console.log(`Status: ${response.statusText} | New entry: ${item.api_name}`)
}