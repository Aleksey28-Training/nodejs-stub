import http from 'http';
import Koa from 'koa';
import KoaStatic from 'koa-static';
import path from 'path';
import { once } from 'events';

class Server {
    constructor (port) {
        this._port   = port;
        this._app    = new Koa();
        this._server = http.createServer(this._app.callback());
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

