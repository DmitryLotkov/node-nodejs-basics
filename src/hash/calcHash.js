import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import {fileURLToPath} from "url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const calculateHash = async () => {
    const source = path.join(dirname, 'files/fileToCalculateHashFor.txt');

    const fileBuffer = await readFile(source);
    const hash = createHash('sha256').update(fileBuffer).digest('hex');
    console.log(hash);
};

await calculateHash();