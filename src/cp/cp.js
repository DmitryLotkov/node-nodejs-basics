import { spawn } from 'child_process';

import {fileURLToPath} from "url";
import path from "path";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const spawnChildProcess = async (args) => {
    const source = path.join(dirname, 'files/script.js');

    const childProcess = spawn('node', [source, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    childProcess.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

};

// Put your arguments in function call to test this functionality
await spawnChildProcess(  [1,2] );
