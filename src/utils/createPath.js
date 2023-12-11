import fs from "node:fs";
import { promisify } from "node:util";
import { log } from "./log.js";

const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

export async function createPath(path) {

  try {
    await access(path, fs.constants.F_OK);
    log(`folder ${path} exist`);
  } catch (err) {
    try {
      await mkdir(path);
      log(`${path} is created with success`);
    } catch (mkdirErr) {
      log(`${path} error on create, see error below\n${mkdirErr}`);
    }
  }

  return path;
}
