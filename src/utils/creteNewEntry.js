import { downloadFile } from './downloadFile.js'
import { uploadImage } from './uploadImage.js'
import { uploadPdf } from './uploadPdf.js'

export async function createNewEntry(item, order) {
  try {

    const formData = {
      data: {
        Ordem: Number(order),
        Titulo: item.api_name,
        download_categoria: { id: 2 },
      },
    }

    const response = await fetch(process.env.DOWNLOAD_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })

    const RESPONSE_DATA = await response.json()

    console.log(
      `\nStatus: ${response.statusText} | New entry: ${item.api_name}\n`
    )

    const ENTRY_ID = RESPONSE_DATA.data.id

    const imagePath = `./downloads/${item.api_id}.jpg`
    const pdfPath = `./downloads/${item.api_id}.pdf`

    await Promise.all([
      downloadFile(`${process.env.BASE_URL}${item.img}`, imagePath),
      downloadFile(item.link, pdfPath),
    ])

    await uploadImage(ENTRY_ID, item.api_id)
    await uploadPdf(ENTRY_ID, item.api_id)
  } catch (error) {
    console.error('Error occurred:', error)
  }
}
