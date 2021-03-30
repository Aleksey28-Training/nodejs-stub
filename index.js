import { Config, debugApp, debugConfig } from './src/config.js';
import esMain from 'es-main';
import Server from './src/server.js';
import { readFileSync } from 'fs';

async function run () {

    const config = new Config({ host: 'localhost', port: 1337 });

    debugConfig('%O', config);

    const { port } = Config.globals;
    const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

    //NOTE: You need to tap $env:DEBUG="app" in terminal to turn on debug
    debugApp('%o booting', packageJSON.name);

    const server = new Server(port);

    if (esMain(import.meta)) {
        await server.start();
        debugApp(`%o is listening on port: ${port}`, packageJSON.name);
    }

    return server;
}

export default run();
