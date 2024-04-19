import fs from "fs";
import path from "path";
import IFileLocator from "./IFileLocator";
import IStoreReader from "./IStoreReader";
import IStoreWriter from "./IStoreWriter";

/**
 * A class that allows for messages to be stored in a local file system
 */
export default class FileStore
  implements IStoreReader, IStoreWriter, IFileLocator
{
  directory: string;

  constructor(_directory: string) {
    this.directory = _directory;
  }

  save(id: number, message: string): void {
    let fileFullName = this.getFileInfo(id);
    fs.writeFileSync(fileFullName, message);
  }

  read(id: number): string {
    let fileFullName = this.getFileInfo(id);
    let exists = fs.existsSync(fileFullName);
    if (!exists) {
      return "";
    }
    return fs.readFileSync(fileFullName, { encoding: "ascii" });
  }

  getFileInfo(id: number): string {
    return path.join(__dirname, this.directory, `${id}.txt`);
  }
}
