import StoreLogger from "./StoreLogger";
import IStoreCache from "./IStoreCache";
import IStoreLogger from "./IStoreLogger";

export default class StoreCache implements IStoreCache {
  cache: any;
  logger: IStoreLogger;

  constructor(_logger: IStoreLogger) {
    this.cache = {};
    this.logger = _logger;
  }

  save(id: number, message: string): void {
    this.cache[id] = message;
  }

  getOrAdd(id: number, fnStoreRead: Function): string {
    this.logger.readingCache(id);
    if (!this.exists!(id)) {
      // The message does not exist in the cache
      this.logger.missingFromCache(id);
      // Load the contents from the store using the passed in function
      let message = fnStoreRead();
      // Save the message to cache
      this.save(id, message);
    }
    return this.cache[id];
  }

  exists?(id: number): boolean {
    return this.cache.hasOwnProperty(id);
  }
}
