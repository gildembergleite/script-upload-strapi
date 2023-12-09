import { createPath } from './createPath.js'
import { downloadFile } from './downloadFile.js'

export async function createNewEntry(item) {
  try {
    await createPath()

    const imagePath = `./downloads/${item.api_id}.jpg`
    const pdfPath = `./downloads/${item.api_id}.pdf`

    await Promise.all([
      downloadFile(`${process.env.BASE_URL}${item.img}`, imagePath),
      downloadFile(item.link, pdfPath),
    ])

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
      headers: { 'Content-Type': 'application/json' },
    })

    console.log(`\nStatus code: ${response.status}`)
    console.log(`FormData: ${JSON.stringify(formData.data)}\n`)
  } catch (error) {
    console.error('Error occurred:', error)
  }
}
