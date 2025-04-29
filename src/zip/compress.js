import {fileURLToPath} from "url";
import * as zlib from "node:zlib";
import path from "path";
import {createReadStream, createWriteStream} from "fs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compress = async () => {
    const source = path.join(dirname, 'files/fileToCompress.txt');
    const destinationPath = path.join(dirname, 'archive.gz');

    const readableStream  = createReadStream(source);
    const writableStream  = createWriteStream(destinationPath);

    const gzip = zlib.createGzip();

    readableStream
        .pipe(gzip)
        .pipe(writableStream)
        .on('finish', () => console.log('The file successfully compressed!'));
};

await compress();