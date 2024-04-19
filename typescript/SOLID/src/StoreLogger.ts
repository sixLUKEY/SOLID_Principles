import IStoreWriter from "./IStoreWriter";
import IStoreReader from "./IStoreReader";

export default class StoreLogger implements IStoreWriter, IStoreReader {
  writer: IStoreWriter;
  reader: IStoreReader;

  constructor(_writer: IStoreWriter, _reader: IStoreReader) {
    this.writer = _writer;
    this.reader = _reader;
  }

  read(id: number): string {
    this.reading(id);
    let retValue = this.reader.read(id);
    if (retValue === undefined) {
      this.didNotFind(id);
    } else {
      this.returning(id);
    }
    return retValue;
  }

  save(id: number, message: string): void {
    this.saving(id);
    try {
      this.writer.save(id, message);
    } catch (err) {
      console.log(err);
      this.errorSaving(id);
    }
    this.saved(id);
  }

  saving(id: number): void {
    console.log(`Saving message ${id}.`);
  }

  saved(id: number): void {
    console.info(`Saved message ${id}.`);
  }

  reading(id: number): void {
    console.debug(`Reading message ${id}.`);
  }

  didNotFind(id: number): void {
    console.debug(`No message ${id} found.`);
  }

  missingFromCache(id: number): void {
    console.debug(`Message ${id} missing from cache.`);
  }

  returning(id: number): void {
    console.debug(`Returning message ${id}.`);
  }

  errorSaving(id: number): void {
    console.error(`Error saving message ${id}.`);
  }
}
