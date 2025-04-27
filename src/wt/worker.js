import { parentPort } from 'worker_threads';

if (!parentPort) {
    throw new Error('Should run from main.js');
}

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

// Listen messages from parent thread
parentPort.on('message', (n) => {
    try {
        const result = nthFibonacci(n);
        parentPort.postMessage({ status: 'resolved', data: result });
    } catch (error) {
        parentPort.postMessage({ status: 'error', data: null });
    }
});
const sendResult = () => {
    // This function sends result of nthFibonacci computations to main thread
};

sendResult();