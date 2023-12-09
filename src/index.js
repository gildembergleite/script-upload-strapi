import { createNewEntry } from './utils/creteNewEntry'

export async function processDataWithDelay(startIndex, endIndex, delayTime) {
  for (let i = startIndex; i <= endIndex; i += 3) {
    try {
      const response = await fetch(`${process.env.COLLECTIONS_URL}${i}`)
      const data = await response.json()

      for (const item of data.payload) {
        await createNewEntry(item)
        await new Promise(resolve => setTimeout(resolve, delayTime))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

await processDataWithDelay(0, 0, 500)