import IStoreWriter from "./IStoreWriter";

/**
 * Example of how we can extract the logging method to a new class
 * so that we can implement a common interface for IStoreWriter.
 *
 * NOTE: this is not a good solution in the long terms since it
 * breaks OCP. We will not be using this, it is just here to show
 * that we can break the class into smaller classes to create
 * a common interface.
 */
export default class LogSavingWriter implements IStoreWriter {
  public save(id: number, message: string): void {
    console.log(`Saving message ${id}.`);
  }
}
