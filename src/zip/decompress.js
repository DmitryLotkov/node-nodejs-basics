import {fileURLToPath} from "url";
import path from "path";
import {createReadStream, createWriteStream} from "fs";
import zlib from "node:zlib";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const decompress = async () => {
    const source = path.join(dirname, 'archive.gz');
    const destinationPath = path.join(dirname, 'files/fileToCompress.txt');

    const readableStream  = createReadStream(source);
    const writableStream  = createWriteStream(destinationPath);
    const gzip = zlib.createUnzip();

    readableStream
        .pipe(gzip)
        .pipe(writableStream)
        .on('finish', () => console.log('The file successfully decompressed!'));
};

await decompress();