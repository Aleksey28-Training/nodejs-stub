import { Config, debugApp, debugConfig } from './src/config.js';
import esMain from 'es-main';
import Server from './src/server.js';
import { readFileSync } from 'fs';

const config = new Config({ host: 'localhost', port: 1337 });
const server = Server.create();
const config = new Config({ host: 'localhost', port: 1337 });

//NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
debugConfig(config);

//NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
debugConfig(config);

async function runServer () {
    const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

    await server.start();
    //NOTE: You need to tap $env:DEBUG="app" in terminal to turn on debug
    debugApp(`App "${packageJSON.name}" is listening on port: ${Config.globals.port}`);
}

if (esMain(import.meta))
    runServer();

export default server;
