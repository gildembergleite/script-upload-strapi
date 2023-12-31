import fs from "node:fs";
import { log } from "./log.js";

export async function uploadPdf(refID, fileName) {
  try {
    const PATH = `./downloads/${fileName}.pdf`;

    if (!fs.existsSync(PATH)) {
      log("Uploaded fail: " + `${fileName}.pdf ` + "Not downloaded");
      return false;
    }

    log("Upload pdf: " + `${fileName}.pdf`);
    const buffer = fs.readFileSync(PATH);
    const blob = new Blob([buffer], { type: "application/pdf" });

    const formData = new FormData();
    formData.append("ref", "api::download.download");
    formData.append("refId", refID);
    formData.append("field", "Arquivo");
    formData.append("files", blob, `${fileName}.pdf`);
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
