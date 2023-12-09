import fs from 'node:fs'

export async function uploadPdf(refID, fileName) {
  try {
    const buffer = fs.readFileSync(`./downloads/${fileName}.pdf`)
    const blob = new Blob([buffer], { type: 'application/pdf' })
    
    const formData = new FormData()
    formData.append('ref', 'api::download.download')
    formData.append('refId', refID)
    formData.append('field', 'Arquivo')
    formData.append('files', blob, `${fileName}.pdf`)

    const response = await fetch(process.env.UPLOAD_ENDPOINT, {
      method: 'POST',
      body: formData,
    })
    
    console.log(`Status code: ${response.status} | Upload File: ./downloads/${fileName}.pdf`)
    return await response.json()
  } catch (error) {
    throw new Error('Erro ao enviar arquivo para o Strapi:', error)
  }
}