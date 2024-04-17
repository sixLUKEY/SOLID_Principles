import IStoreWriter from "./IStoreWriter";

/**
 * Example of how we can extract the logging method to a new class
 * so that we can implement a common interface for IStoreWriter.
 *
 * NOTE: This is not a good solution in the long term since it breaks
 * the OCP. We will not use this, it is just here to show how we can
 * break the class into these smaller classes in order to implement a common interface.
 */
export default class LogSavedStoreWriter implements IStoreWriter {
  public save(id: number, message: string): void {
    console.info(`Saved message ${id}.`);
  }
}
