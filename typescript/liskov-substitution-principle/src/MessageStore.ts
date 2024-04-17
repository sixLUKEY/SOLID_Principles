import FileStore from "./FileStore";
import StoreCache from "./StoreCache";
import StoreLogger from "./StoreLogger";
import IStore from "./IStore";

export default class MessageStore {
  store: IStore;
  cache: StoreCache;
  logger: StoreLogger;

  constructor(directory: string) {
    this.logger = new StoreLogger();
    this.store = new FileStore(directory, this.Logger);
    this.cache = new StoreCache(this.Logger);
  }

  /**
   * @returns an instance of logger
   * Purpose of this is to be able to extend this class and use a different type of logger (that inherits from StoreLogger)
   */
  get Logger() {
    return this.logger;
  }

  /**
   * @returns an instance of store
   * Purpose of this is to be able to use a different type of store that would implement the IStore interface
   */
  get Store() {
    return this.store;
  }

  /**
   * Function writes the file to disk using the id as part of the filename.
   * The id is a number and the filename is formed as a `.txt` file using the pattern `id.txt`.
   * It's saved in the relative directory as set in the constructor.
   *
   * @param id the id of the file to save
   * @param message the text message to write to the file
   */
  public save(id: number, message: string) {
    this.Store.save(id, message);
    this.cache.addOrUpdate(id, message);
  }

  /**
   * Function asks the cache to fetch the message by id and passes an anonymous function that 
   * fetches the message from the store if the message is not in the cache 
   * 
   * @param id the id of the message to read
   * @returns message string
   */
  public read(id: number): string {
    let message = this.cache.getOrAdd(id, () => this.Store.read(id));
    return message;
  }
}
