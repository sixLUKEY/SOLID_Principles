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

  get Logger(): IStoreLogger {
    return this.logger;
  }

  get Store(): IStore {
    return this.store;
  }

  get Cache(): IStoreCache {
    return this.cache;
  }

  save(id: number, message: string) {
    this.Store.save(id, message);
    this.Cache.save(id, message);
  }

  read(id: number): string {
    let message = this.Cache.getOrAdd(id, () => this.Store.read(id));
    return message
  }
}
