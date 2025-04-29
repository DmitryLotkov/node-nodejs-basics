import {fileURLToPath} from "url";
import path from "path";
import fs from "fs/promises";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const list = async () => {
    const folderPath = path.join(dirname, 'files');

    try {
        await fs.access(folderPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed'); // folder doesnt exists
        }
        throw err;
    }

    const files = await fs.readdir(folderPath);
    files.forEach((file) => console.log(file));
};

await list();