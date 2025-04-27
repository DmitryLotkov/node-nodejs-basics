import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import path, { join } from "path";


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const performCalculations = async () => {
    const numCores = cpus().length;
    const results = [];

    for (let i = 0; i < numCores; i++) {
        const workerPath = join(dirname, 'worker.js');

        const workerPromise = new Promise((resolve) => {
            const worker = new Worker(workerPath);

            worker.postMessage(10 + i);

            worker.on('message', (data) => {
                resolve(data);
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });

        results.push(workerPromise);
    }

    const allResults = await Promise.all(results);
    console.log(allResults);
};

await performCalculations();