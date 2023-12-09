import { createNewEntry } from './utils/creteNewEntry.js'

export async function processDataWithDelay(delayTime) {
  let i = 0
  let shouldContinue = true

  while (shouldContinue) {
    try {
      const response = await fetch(`${process.env.COLLECTIONS_URL}${i}`)
      const data = await response.json()

      if (data === null || data.payload.length === 0) {
        shouldContinue = false
        break
      }

      for (const item of data.payload) {
        await createNewEntry(item)
        await new Promise(resolve => setTimeout(resolve, delayTime))
      }

      i += 3
    } catch (error) {
      console.error(error)
      shouldContinue = false
      break
    }
  }
}

await processDataWithDelay(0, 0, 500)