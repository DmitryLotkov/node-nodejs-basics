import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk
                .toString()
                .split('')
                .reverse()
                .join('');

            callback(null, reversed);
        }
    });

    process.stdin.setEncoding('utf8');

    process.stdin
        .pipe(reverseTransform)
        .pipe(process.stdout);
};

await transform();