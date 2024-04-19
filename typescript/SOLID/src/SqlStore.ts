import IStoreWriter from "./IStoreWriter";
import IStoreReader from "./IStoreReader";

/**
 * A class that allows for messsages to be stored in a relational database such as Postgres or MySql
 *
 * Included as an example but not implemented or used
 */
export default class SqlStore implements IStoreReader, IStoreWriter {
  save(id: number, message: string): void {
    // Write to database code would go here
  }
  read(id: number): string {
    // Read from database here
    return "";
  }
}
