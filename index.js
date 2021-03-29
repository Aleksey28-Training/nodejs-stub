import { PORT } from './src/config.js';
import esMain from 'es-main';
import Server from './src/server.js';
import path from 'path';
import { readFile } from 'fs/promises';

//TODO: make config like class


async function run () {
    const __dirname = path.resolve();
    const staticPage = await readFile(path.join(__dirname, 'public/index.html'), { 'encoding': 'utf8' });
    const server = new Server(PORT, staticPage);

    if (esMain(import.meta)) {
        await server.start().then(() => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    }

    return server;
}

export default run();
