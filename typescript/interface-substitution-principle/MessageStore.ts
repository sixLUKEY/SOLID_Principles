import FileStore from "./FileStore";
import StoreCache from "./StoreCache";
import StoreLogger from "./StoreLogger";
import IStore from "./IStore";
import IStoreCache from "./IStoreCache";
import IStoreLogger from "./IStoreLogger";

export default class MessageStore {
  store: IStore;
  cache: IStoreCache;
  logger: IStoreLogger;

  constructor(directory: string) {
    this.logger = new StoreLogger();
    this.store = new FileStore(directory, this.Logger);
    this.cache = new StoreCache(this.Logger)
  }

  /**
   * @returns an instance of logger
   * Purpose of this is to be able to extend this class and use
   * different types of logger ( that inherits from StoreLogger )
   */
  get Logger(): IStoreLogger {
    return this.logger;
  }

  /**
   * @returns an instance of store
   * Purpose of this is to be able to use a different type of store
   * that would implement the IStore interface
   */
  get Store(): IStore {
    return this.store;
  }

  /**
   * @returns an instance of cache
   * Purpose of this is to be able to use a different type of cache
   * that would implement the IStore interface
   */
  get Cache(): IStoreCache {
    return this.cache;
  }

  /**
   * Function writes the file to disk using the id as part of the filename.
   * The id is a number and the file name is formed as a .txt file using the pattern id.txt.
   * It's saved in the relative directory as set in the constructor.
   * 
   * @param id the id of the file to save
   * @param message the text message to write to the file
   */
  save(id: number, message: string) {
    this.Store.save(id, message);
    this.Cache.save(id, message);
  }

  /**
   * Function that asks the cache to fetch the message by id and
   * passes an anonymous function that fetches the message from 
   * the store if the message is not in the cache
   * 
   * @param id the id of the message to read
   * @returns message string
   */
  read(id: number): string {
    let message = this.Cache.getOrAdd(id, () => this.Store.read(id));
    return message
  }
}
