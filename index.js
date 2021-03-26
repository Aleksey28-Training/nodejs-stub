import { PORT } from './src/config.js';
import esMain from 'es-main';
import Server from './src/server.js';

//TODO: test server
//TODO: return static index.html from server
//TODO: make config like class


async function run () {
    const server = new Server(PORT);

    if (esMain(import.meta)) {
        await server.start().then(() => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    }

    return server;
}

export default run();
