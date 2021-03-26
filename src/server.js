import http from 'http';
import Koa from 'koa';
import { once } from 'events';

class Server {
    constructor (port, staticPage = '') {
        this._port   = port;
        this._app    = new Koa();
        this._server = http.createServer(this._app.callback());
        this._staticPage = staticPage;
    }

    async start () {

        this._app.use(async ctx => {
            ctx.body = this._staticPage;
        });

        const listenPromise = once(this._server, 'listening');

        this._server.listen(this._port);

        return listenPromise;
    }
}

export default Server;

