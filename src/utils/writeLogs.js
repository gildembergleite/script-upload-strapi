import fs from "node:fs";
import { log } from "./log.js";

export async function writeLogs(entries, itemsError) {
  log("Begin write logs...");
  fs.writeFileSync("entries.json", JSON.stringify(entries), function (err) {
    if (err) throw err;
    log("[entries.json] File is created successfully.");
  });

  fs.writeFileSync(
    "entries-error.json",
    JSON.stringify(itemsError),
    function (err) {
      if (err) throw err;
      log("[entries-error.json] File is created successfully.");
    }
  );
  log("...End write logs");
}
