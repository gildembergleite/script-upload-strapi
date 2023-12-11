import fs from "node:fs";
import { log } from "./log.js";

export async function uploadFile(refID, fileName) {
  try {
    const PATH_IMAGE = `./downloads/${fileName}.jpg`;
    const PATH_PDF = `./downloads/${fileName}.pdf`;

    const bufferImage = fs.readFileSync(PATH_IMAGE);
    const bufferPdf = fs.readFileSync(PATH_PDF);

    const blobImage = new Blob([bufferImage], { type: "image/jpeg" });
    const blobPdf = new Blob([bufferPdf], { type: "application/pdf" });

    const formData = new FormData();
    formData.append("ref", "api::download.download");
    formData.append("refId", refID);
    formData.append("files.Thumb", blobImage, `${fileName}.jpg`);
    formData.append("files.Arquivo", blobPdf, `${fileName}.pdf`);
    formData.append("path", "catalogo-colecoes/pdfs");

    const response = await fetch(process.env.UPLOAD_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    log("Uploaded success: " + `${fileName}.pdf`);
    await response.json();

    log(response.status);
    if (response.status != 200) {
      return false;
    }

    return true;
  } catch (error) {
    log("Uploaded fail: " + `${fileName}.pdf`);
    return false;
  }
}
