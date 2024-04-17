import IStoreLogger from "./IStoreLogger";

/**
 * @implements {IStoreLogger}
 */
export default class StoreLogger implements IStoreLogger {
  saving(id: number, message: string): void {
    console.log(`Saving message ${id}.`);
  }
  saved(id: number, message: string): void {
    console.info(`Saved message ${id}.`);
  }
  readingFilestore(id: number): void {
    console.debug(`Reading message ${id} from FileStore.`);
  }
  readingCache(id: number): void {
    console.debug(`Reading message ${id} from StoreCache.`);
  }
  didNotFind(id: number): void {
    console.debug(`No message ${id} found.`);
  }
  missingFromCache(id: number): void {
    console.debug(`Message ${id} missing from cache.`);
  }
  returning(id: number): void {
    console.debug(`Returning message ${id}`);
  }
  errorSaving(id: number): void {
    console.error(`Error saving message ${id}`);
  }
}
