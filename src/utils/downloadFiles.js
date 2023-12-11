import { downloadFile } from "./downloadFile.js";

export async function downloadFiles(item) {
  const IMAGE_PATH = `./downloads/${item.api_id}.jpg`;
  const IMAGE_LINK = `${process.env.BASE_URL}${item.img}`;
  const PDF_PATH = `./downloads/${item.api_id}.pdf`;
  const PDF_LINK = item.link;

  downloadFile(IMAGE_LINK, IMAGE_PATH);
  downloadFile(PDF_LINK, PDF_PATH);
}
