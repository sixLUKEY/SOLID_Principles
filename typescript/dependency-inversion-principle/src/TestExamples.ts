import MessageStore from "./MessageStore";
import FileStore from "./FileStore";
import StoreCache from "./StoreCache";
import StoreLogger from "./StoreLogger";

import fs from "fs";
import path from "path";

let dirtest = "./testfiles";
let dirpath = path.join(__dirname, dirtest);
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// 'Compose' our objects ...
let fileStore = new FileStore(dirtest);
let cache = new StoreCache(fileStore, fileStore);
let logger = new StoreLogger(cache, cache);
let messageStore = new MessageStore(logger, logger);

// Test the MessageStore class
console.log("** Test the MessageStore class **");
console.log();

messageStore.save(99, "Message 99 saved via MessageStore class");
let fileMessage99 = messageStore.read(99);
console.log(fileMessage99);
let fileMessage33 = messageStore.read(33);
console.log(fileMessage33);
messageStore.save(33, "Message 33 saved via MessageStore class");
console.log();
