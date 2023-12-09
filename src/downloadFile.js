import https from 'https'
import fs from 'fs'

export function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination)
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    }
    
    https.get(url, options, (response) => {
      response.pipe(file)
      
      file.on('finish', () => {
        file.close(resolve(true))
      })

    }).on('error', (error) => {
      fs.unlink(destination, () => reject(error))
    })
  })
}
