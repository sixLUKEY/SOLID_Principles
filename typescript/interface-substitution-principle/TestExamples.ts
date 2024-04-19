import MessageStore from "./MessageStore";
import fs from 'fs'
import path from "path";

let dirtest = './testfiles'
let dirpath = path.join(__dirname, dirtest)
if (!fs.existsSync(dirpath)){
    fs.mkdirSync(dirpath)
}

// Test the MessageStore class
console.log(`** Test the MessageStore class **`)
console.log()

let messageStore = new MessageStore(dirtest)

messageStore.save(99, 'Message 99 saved via MessageStore class')
let fileMessage99 = messageStore.read(99)
console.log(fileMessage99)
let fileMessage33 = messageStore.read(33)
console.log(fileMessage33)
messageStore.save(33, 'Message 33 saved via MessageStore class')
console.log()