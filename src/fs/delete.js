import path from "path";
import fs from "fs/promises";
import {fileURLToPath} from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const remove = async () => {
    const filePath = path.join(dirname, 'files/fileToRemove.txt');

    // Check if file exists
    try {
        await fs.access(filePath);
        await fs.rm(filePath)
    } catch (err) {
        throw new Error('FS operation failed'); // file doesnt exist
    }
};

await remove();