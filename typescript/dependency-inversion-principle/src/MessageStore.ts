import IStoreWriter from "./IStoreWriter";
import IStoreReader from "./IStoreReader";

export default class MessageStore {
  writer: IStoreWriter;
  reader: IStoreReader;

  constructor(_writer: IStoreWriter, _reader: IStoreReader) {
    if (_writer === null) {
      throw new Error("Writer argument cannot be null");
    }
    if (_reader === null) {
      throw new Error("Reader argument cannot be null");
    }
    this.writer = _writer;
    this.reader = _reader;
  }

  /**
   * 
   * @param id the id of the message to return
   * @param message the text message to write to storage
   */
  save(id: number, message: string) {
    this.writer.save(id, message);
  }

  /**
   * 
   * @param id the id of the message to read
   * @returns message string
   */
  read(id: number): string {
    return this.reader.read(id);
  }
}
