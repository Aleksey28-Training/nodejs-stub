import http from 'http';
import Koa from 'koa';
import KoaStatic from 'koa-static';
import path from 'path';
import { once } from 'events';
import { Config, debugApp, debugConfig } from './config.js';
import { readFileSync } from 'fs';

class Server {
    constructor (port) {
        this._port   = port;
        this._app    = new Koa();
        this._server = http.createServer(this._app.callback());
    }

    static create () {
        const config = new Config({ host: 'localhost', port: 1337 });

        //NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig('%O', config);

        const { port } = Config.globals;
        const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

        //NOTE: You need to tap $env:DEBUG="app" in terminal to turn on debug
        debugApp('%o booting', packageJSON.name);

        return new Server(port);
    }

    async start () {
        this._app.use(KoaStatic(path.resolve() + '/public'));

        const listenPromise = once(this._server, 'listening');

        this._server.listen(this._port);

        return listenPromise;
    }

    async stop () {
        const closePromise = once(this._server, 'close');

        this._server.close();

        return closePromise;
    }
}

export default Server;

