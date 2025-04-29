import {fileURLToPath} from "url";
import path from "path";
import {createWriteStream} from "fs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const write = async () => {
    const source = path.join(dirname, 'files/fileToWrite.txt');

    const writableStream  = createWriteStream(source);

    process.stdin.pipe(writableStream);

    writableStream.on('end', () => {
        console.log(' Stream ended');
    });
};

await write();