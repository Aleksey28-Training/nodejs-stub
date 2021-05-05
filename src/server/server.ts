import * as http from 'http';
import Koa from 'koa';
import * as path from 'path';
import { once } from 'events';
import { Config, debugApp, debugConfig } from './config.js';
import { readFileSync } from 'fs';
import Pug from 'koa-pug';
import RunsRouter from './routes/runs.js';
import bodyparser from 'koa-bodyparser';
import KoaStatic from 'koa-static';


class Server {
    _port: number;
    _app: Koa;
    _server: http.Server;
    _pug: Pug;
    _runsRouter: RunsRouter;

    constructor (port: number) {
        this._port = port;
        this._app = new Koa();
        this._pug = new Pug({
            viewPath: path.join(path.resolve(), 'views'),
            basedir:  path.resolve(),
            app:      this._app
        });
        this._runsRouter = new RunsRouter();
        this._server = http.createServer(this._app.callback());
    }

    static create (): Server {
        //NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(Config);

        const { port } = Config.globals;
        const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

        //NOTE: You need to tap $env:DEBUG="app" in terminal to turn on debug
        debugApp(`${packageJSON.name} booting`);

        return new Server(port);
    }

    async start (): Promise<unknown> {
        const listenPromise = once(this._server, 'listening');

        this._app.use(bodyparser({
            detectJSON: function (ctx) {
                return /\.json$/i.test(ctx.path);
            }
        }));

        this._app.use(KoaStatic(path.join(path.resolve(), 'views')));
        this._app.use(KoaStatic(path.join(path.resolve(), 'lib/src/client/')));

        this._app.use(this._runsRouter.getRouter());
        this._server.listen(this._port);

        return listenPromise;
    }

    async stop (): Promise<unknown> {
        const closePromise = once(this._server, 'close');

        this._server.close();

        return closePromise;
    }
}

export default Server;

