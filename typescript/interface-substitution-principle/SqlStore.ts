import IStore from "./IStore";
import IStoreWriter from "./IStoreWriter";

export default class SqlStore implements IStore, IStoreWriter {
  save(id: number, message: string): void {
    // Write to database code goes here
  }
  read(id: number): string {
    // Read from database here
    return "";
  }
  /**
   * NOTE: We have removed the getFileInfo method definition since
   * it is no longer part of the IStore interface
   */
}
