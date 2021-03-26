import Koa from 'koa';
import { once } from 'events';
import http from 'http';

class Server {
    constructor (port) {
        this._port   = port;
        this._app    = new Koa();
        this._server = http.createServer(this._app.callback());
    }

    async start () {
        const listenPromise = once(this._server, 'listening');

        this._server.listen(this._port);

        return listenPromise;
    }
}

export default Server;

