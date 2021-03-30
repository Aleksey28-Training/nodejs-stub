import { Config, debugApp } from './src/config.js';
import esMain from 'es-main';
import Server from './src/server.js';

const server = Server.create();

if (esMain(import.meta)) {
    (async function () {
        await server.start();
        //NOTE: You need to tap $env:DEBUG="app" in terminal to turn on debug
        debugApp(`App is listening on port: ${Config.port}`);
    })();
}

export default server;
