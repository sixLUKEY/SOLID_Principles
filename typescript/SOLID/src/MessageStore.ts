import IStoreWriter from "./IStoreWriter";
import IStoreReader from "./IStoreReader";

export default class MessageStore {
  writer: IStoreWriter;
  reader: IStoreReader;

  constructor(_writer: IStoreWriter, _reader: IStoreReader) {
    if (_writer === null) {
      throw new Error("_writer argument cannt be null");
    }
    if (_reader === null) {
      throw new Error("_reader argument cannot be null");
    }
    this.writer = _writer;
    this.reader = _reader;
  }

  /**
   * 
   * @param id the id of the message to save
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
