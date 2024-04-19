import IStoreReader from "./IStoreReader";
import IStoreWriter from "./IStoreWriter";

export default class StoreCache implements IStoreWriter, IStoreReader {
  cache: { [key: number]: string };
  writer: IStoreWriter;
  reader: IStoreReader;

  constructor(_writer: IStoreWriter, _reader: IStoreReader) {
    this.cache = {};
    this.writer = _writer;
    this.reader = _reader;
  }

  save(id: number, message: string): void {
    this.writer.save(id, message);
  }

  read(id: number) {
    if (this.exists!(id)) {
      return this.cache[id];
    }
    let retValue = this.reader.read(id);
    if (retValue !== undefined) {
      this.addOrUpdate(id, retValue);
    }
    return retValue
  }

  private exists?(id: number): boolean {
    return (this.cache as Object).hasOwnProperty(id);
  }

  private addOrUpdate(id: number, message: string) {
    this.cache[id] = message;
  }
}
