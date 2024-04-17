import fs from 'fs';
import path from 'path';
import StoreLogger from './StoreLogger';
import IStore from './IStore';

/**
 * A class that allows for messages to be stored in a local file system
 * 
 * @implements interface IStore
 */
export default class FileStore implements IStore {
    directory: string
    logger: StoreLogger

    constructor(_directory: string, _logger: StoreLogger){
        this.directory = _directory
        this.logger = _logger
    }

    public save(id: number, message: string): void {
        this.logger.saving(id)
        let fileFullName = this.getFileInfo(id)
        try {
            fs.writeFileSync(fileFullName, message)
        } catch(err){
            this.logger.errorSaving(id)
        }
        this.logger.saved(id)
    }

    public read(id: number): string {
        this.logger.readingFilestore(id)
        let fileFullName = this.getFileInfo(id)
        let exists = fs.existsSync(fileFullName)
        if (!exists){
            this.logger.didNotFind(id);
            return ''
        }
        return fs.readFileSync(fileFullName, {encoding: 'ascii'})
    }

    public getFileInfo(id: number): string {
        return path.join(__dirname, this.directory, `${id}.txt`)
    }
}