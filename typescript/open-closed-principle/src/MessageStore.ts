import FileStore from "./FileStore";
import StoreCache from "./StoreCache";
import StoreLogger from "./StoreLogger";

export default class MessageStore {
  fileStore: FileStore;
  cache: StoreCache;
  logger: StoreLogger;

  constructor(directory: string) {
    this.logger = new StoreLogger();
    this.fileStore = new FileStore(directory, this.Logger);
    this.cache = new StoreCache(this.Logger);
  }

  /**
   * A getter that returns an instance of logger
   * Purpose of this ito be able to extend this class
   * and use a different type of logger ( that inherits from StoreLogger )
   */
  get Logger() {
    return this.logger;
  }

  /**
   * @param id the id of the file to save
   * @param message the text message to write to the file
   *
   * Function writes the file to disk using the id as part of the filename.
   * The id is a number and the file name is formed as a .txt file using the pattern id.txt.
   * Its saved in the relative directory as set in the constructor
   */
  public async save(id: number, message: string) {
    await this.fileStore.save(id, message);
    this.cache.addOrUpdate(id, message);
  }

  /**
   *
   * @param id the id of the file to read
   * @returns message string
   *
   * Function checks if the file exists and if not returns an empty string.
   * If the file does not exist then the function checks if the file id is in the cache and if not will read the contents of the file from disk and add to cache.
   */
  public read(id: number): string {
    if (!this.cache.exists!(id)) {
      // Does not exist in cache so read from file
      let message = this.fileStore.read(id);
      this.cache.getOrAdd(id, message);
    }
    return this.cache.getOrAdd(id);
  }
}
