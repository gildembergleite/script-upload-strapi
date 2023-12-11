/* eslint-disable no-undef */
import { createPath as checkDownloadsFolder } from "./utils/createPath.js";
import { createNewEntry } from "./utils/creteNewEntry.js";
import { uploadImage } from "./utils/uploadImage.js";
import { uploadPdf } from "./utils/uploadPdf.js";
import { writeLogs } from "./utils/writeLogs.js";
import { downloadFiles } from "./utils/downloadFiles.js";
import { log } from "./utils/log.js";

let itemsError = [];
let entries = [];

function logError(item, hasUploadImage, hasUploadPdf) {
  if (!hasUploadImage || !hasUploadPdf) {
    const ITEM_EROR = {
      // ...item,
      name: item.api_name,
      hasImage: hasUploadImage,
      hasPdf: hasUploadPdf,
    };

    itemsError.push(ITEM_EROR);
  }
}

export async function processDataWithDelay(delayTime) {
  let paginationItemIndex = 0;
  let itemOrder = 0;
  let shouldProcessContinue = true;

  // setup Environment
  await checkDownloadsFolder("./downloads");

  while (shouldProcessContinue) {
    try {
      const response = await fetch(`${process.env.COLLECTIONS_URL}${paginationItemIndex}`);
      const data = await response.json();

      if (data === null || data.payload.length === 0) {
        shouldProcessContinue = false;
        break;
      }

      entries.push(...data.payload);

      for (const item of data.payload) {
        // download files
        await downloadFiles(item);

        //  Save Entry on Strapi
        const ENTRY_CREATED_DATA = await createNewEntry(item, itemOrder);
        const ENTRY_ID = ENTRY_CREATED_DATA?.data.id;

        // Connect files on Entry
        const HAS_UPLOAD_IMAGE = await uploadImage(ENTRY_ID, item.api_id);
        const HAS_UPLOAD_PDF = await uploadPdf(ENTRY_ID, item.api_id);

        logError(item, HAS_UPLOAD_IMAGE, HAS_UPLOAD_PDF);

        // setup for Throttling
        log(`Cooldown... ${delayTime / 1000} seg\n-----`);
        await new Promise((resolve) => setTimeout(resolve, delayTime));

        itemOrder += 1;
      }

      paginationItemIndex += 3;
    } catch (error) {
      log(error);
      shouldProcessContinue = false;
      break;
    }
  }
}

log(`DATE_BEGIN: ${Date()}`);

await processDataWithDelay(3000);
await writeLogs(entries, itemsError);

log(`DATE_END: ${Date()}`);

log("items with error:")
console.table(itemsError)