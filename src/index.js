import { createPath } from './utils/createPath.js'
import { createNewEntry } from './utils/creteNewEntry.js'

export async function processDataWithDelay(delayTime) {

  // setup environment
  await createPath()

  let index = 0
  let order = 0
  let shouldContinue = true

  while (shouldContinue) {
    try {
      const response = await fetch(`${process.env.COLLECTIONS_URL}${index}`)
      const data = await response.json()

      if (data === null || data.payload.length === 0) {
        shouldContinue = false
        break
      }

      for (const item of data.payload) {
        await createNewEntry(item, order)
        console.log('Cooldown...', delayTime)
        await new Promise(resolve => setTimeout(resolve, delayTime))
        order += 1
      }

      index += 3
    } catch (error) {
      console.error(error)
      shouldContinue = false
      break
    }
  }
}

await processDataWithDelay(3000)