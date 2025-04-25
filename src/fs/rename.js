import fs from 'fs/promises';
import {fileURLToPath} from "url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rename = async () => {
    const filePath = path.join(dirname, 'files/wrongFilename.txt');
    const correctFileName = path.join(dirname, 'files/properFilename.md');

    // Check if file exists
    try {
        await fs.access(correctFileName);
        throw new Error('FS operation failed'); // file already exists
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    try {
        await fs.access(filePath);
        await fs.rename(filePath, correctFileName);
    } catch (err) {

        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await rename();