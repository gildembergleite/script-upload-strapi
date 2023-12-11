import fs from "node:fs";

export function log(log) {
  console.log(log);
  fs.appendFile("logs.txt", `${log}\n`, function (err) {
    if (err) throw err;
  });
}
