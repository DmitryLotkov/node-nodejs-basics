import {fileURLToPath} from "url";
import path from "path";
import { createReadStream } from 'fs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const read = async () => {
    const source = path.join(dirname, 'files/fileToRead.txt');

    const readableStream  = createReadStream(source);
    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readableStream.on('end', () => {
        console.log(' Stream ended');
    });
};

await read();