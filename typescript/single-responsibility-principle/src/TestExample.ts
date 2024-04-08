import StoreLogger from "./StoreLogger";
import StoreCache from "./StoreCache";
import FileStore from "./FileStore";
import MessageStore from "./MessageStore";
import fs from "fs";
import path from "path";

let dirtest = "./testfiles";
let dirpath = path.join(__dirname, dirtest);
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// Test StoreLogger class
console.log("//-- Testing the StoreLogger Class --//");
console.log();
let logger = new StoreLogger();
logger.saving(1);
logger.saved(1);
logger.readingFilestore(1);
logger.didNotFind(1);
logger.readingCache(1);
console.log();

// Test StoreCache class
console.log("//-- Testing the StoreCache Class --//");
console.log();
let cache = new StoreCache(logger);
cache.addOrUpdate(1, "Message 1");
console.log(cache.checkCache()); // Should include the new message and id
let message1 = cache.getOrAdd(1);
console.log(message1); // Should return message 1
let exists2 = cache.exists(2);
console.log("Message 2 exists?", exists2);
let message2 = cache.getOrAdd(2, "Message 2");
console.log();

(async () => {
  // Test the FileStore class
  console.log("//-- Testing the FileStore Class --//");
  console.log();
  let fileStore = new FileStore(dirtest, logger);
  let fileInfo = fileStore.getInfo(1);
  console.log(fileInfo);
  await fileStore.save(1, "Message file 1");
  let fileMessage1 = fileStore.read(1);
  console.log(fileMessage1);
  let fileMessage2 = fileStore.read(2);
  console.log(fileMessage2);
  await fileStore.save(2, "Message file 2");
  fileMessage2 = fileStore.read(2);
  console.log(fileMessage2);
  console.log();

  // Test the MessageStore class
  console.log("//-- Testing the MessageStore Class --//");
  console.log();
  let messageStore = new MessageStore(dirtest);
  await messageStore.save(99, "Message 99 saved via MessageStore class");
  let fileMessage99 = messageStore.read(99);
  console.log(fileMessage99);
  console.log();
})();
