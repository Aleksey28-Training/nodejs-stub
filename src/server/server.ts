import * as http from 'http';
import Koa from 'koa';
import * as path from 'path';
import { once } from 'events';
import { Config, debugApp, debugConfig } from './config';
import Pug from 'koa-pug';
import RunsRouter from './routes/runs';
import bodyparser from 'koa-bodyparser';
import KoaStatic from 'koa-static';


class Server {
    _config: Config;
    _port: number;
    _app: Koa;
    _server: http.Server;
    _pug: Pug;
    _runsRouter: RunsRouter;

    constructor (config?: Config) {
        this._config = config || new Config();

        // NOTE: You need to tap $env:DEBUG="node-stub:config" in terminal to turn on debug
        debugConfig(this._config);

        this._port = this._config.values.port;
        this._app = new Koa();

        this._pug = new Pug({
            viewPath: path.join(path.resolve(), 'views'),
            basedir:  path.resolve(),
            app:      this._app
        });

        this._runsRouter = new RunsRouter();

        // NOTE: You need to tap $env:DEBUG="node-stub:app" in terminal to turn on debug
        debugApp(`booting`);

        this._server = http.createServer(this._app.callback());
    }

    static async create (config?: Config): Promise<Server> {
        const server = new Server(config);

        await server.start();

        return server;
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

