import https from "node:https";
import fs from "node:fs";
import { log } from "./log.js";

export function downloadFile(url, destination) {
  if (fs.existsSync(destination)) {
    log("File has downloaded: " + destination);
  }

  const fileStream = fs.createWriteStream(destination);

  const requestOptions = {
    headers: { "User-Agent": process.env.USER_AGENT_CONTENT },
  };

  https
    .get(url, requestOptions, (response) => {
      if (response.statusCode == 404 || response.statusCode == 500) {
        log("Error download file: " + destination);
        fs.unlink(destination, (err) => {
          if (err) throw err;
          log(`${destination} was deleted`);
        });
        return;
      }

      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
      });
      log("Download file: " + destination);
    })
    .on("error", (error) => {
      log("Error URL download file: " + destination);
      log("ERROR: " + error.message);
      fs.unlink(destination, (err) => {
        log(`${destination} was deleted`);
      });
    });
}
