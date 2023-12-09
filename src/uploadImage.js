import fs from 'fs'

export async function uploadImage(refID, fileName) {
  try {
    const buffer = fs.readFileSync(`./downloads/${fileName}.jpg`)
    const blob = new Blob([buffer], { type: 'image/jpeg' })
    
    const formData = new FormData()
    formData.append('ref', 'api::download.download')
    formData.append('refId', refID)
    formData.append('field', 'Thumb')
    formData.append('files', blob, fileName)

    const response = await fetch(process.env.UPLOAD_ENDPOINT, {
      method: 'POST',
      body: formData,
    })
    
    console.log(`Status code: ${response.status} | File: ./downloads/${fileName}.jpg`)
    return await response.json()
  } catch (error) {
    throw new Error('Erro ao enviar arquivo para o Strapi:', error)
  }
}