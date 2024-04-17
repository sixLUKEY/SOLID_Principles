import MessageStore from "./MessageStore";
import CustomMessageStore from "./CustomMessageStore";
import fs from "fs";
import path from "path";

let dirtest = "./testfiles";
let dirpath = path.join(__dirname, dirtest);
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

(async () => {
  // Test the CstomMessageStore class
  console.log("** Test the CustomMessageStore class **");
  console.log();

  let messageStore = new CustomMessageStore(dirtest);

  // Note: Simply comment out the above line and uncomment the line below and we are back to our original MessageStore that does not log to Splunk

  //   let messageStore = new MessageStore(dirtest)

  await messageStore.save(99, "Message 99 saved via MessageStore class");
  let fileMessage99 = messageStore.read(99);
  console.log(fileMessage99);
  console.log();
})();
