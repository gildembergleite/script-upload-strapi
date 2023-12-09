import https from 'https'
import fs from 'fs'

export function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination)
    
    const options = {
      headers: { 'User-Agent': process.env.USER_AGENT_CONTENT }
    }
    
    https.get(url, options, (response) => {
      response.pipe(file)
      
      file.on('finish', () => {
        file.close(resolve(true))
      })
      console.log('Download file: ', destination)

    }).on('error', (error) => {
      fs.unlink(destination, () => reject(error))
    })
  })
}
