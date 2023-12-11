import fs from "node:fs";
import { log } from "./log.js";

export async function uploadImage(refID, fileName) {
  try {
    const PATH = `./downloads/${fileName}.jpg`;

    if (!fs.existsSync(PATH)) {
      log("Uploaded fail: " + `${fileName}.jpg ` + "Not downloaded");
      return false;
    }

    log("Upload image: " + `${fileName}.jpg`);
    const buffer = fs.readFileSync(PATH);
    const blob = new Blob([buffer], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("ref", "api::download.download");
    formData.append("refId", refID);
    formData.append("field", "Thumb");
    formData.append("files", blob, `${fileName}.jpg`);

    const response = await fetch(process.env.UPLOAD_ENDPOINT, {
      method: "POST",
      body: formData
    });

    await response.json();

    log(response.status);
    log(response.statusText);

    if (response.status != 200) {
      log("Uploaded fail: " + `${fileName}.jpg`);
      return false;
    }

    log("Uploaded success: " + `${fileName}.jpg`);
    return true;
  } catch (error) {
    log("Uploaded fail: " + `${fileName}.jpg`);
    return false;
  }
}
