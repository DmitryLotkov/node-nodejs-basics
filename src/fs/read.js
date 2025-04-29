import {fileURLToPath} from "url";
import path from "path";
import fs from "fs/promises";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const read = async () => {
    const filePath = path.join(dirname, 'files/fileToRead.txt');

    try {
        await fs.access(filePath)
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data)
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await read();