import { Config, DEBUG_PREFIX_APP } from './src/config.js';
import esMain from 'es-main';
import Server from './src/server.js';
import path from 'path';
import { readFile } from 'fs/promises';
import debug from 'debug';
import { readFileSync } from 'fs';

async function run () {

    const config = new Config('1337', 'localhost');

    console.log(config);
    const debugApp    = debug(DEBUG_PREFIX_APP);
    const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

    //NOTE: You need to tap $env:DEBUG="app" in terminal to turn on debug
    debugApp('%o booting', packageJSON.name);

    const __dirname = path.resolve();
    const staticPage = await readFile(path.join(__dirname, 'public/index.html'), { 'encoding': 'utf8' });
    const server = new Server(config.port, staticPage);

    if (esMain(import.meta)) {
        await server.start().then(() => {
            debugApp('%o is listening', packageJSON.name);
            console.log(`Example app listening at http://${config.host}:${config.port}`);
        });
    }

    return server;
}

export default run();
