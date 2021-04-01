import http from 'http';
import Koa from 'koa';
import path from 'path';
import { once } from 'events';
import { Config, debugApp, debugConfig } from './config.js';
import { readFileSync } from 'fs';
import ApiGithub from './apiGithub.js';
import Pug from 'koa-pug';

class Server {
    constructor (port) {
        this._port   = port;
        this._app    = new Koa();
        this._server = http.createServer(this._app.callback());
    }

    static create () {
        //NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(Config);

        const { port }    = Config.globals;
        const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

        //NOTE: You need to tap $env:DEBUG="app" in terminal to turn on debug
        // debugApp(listWF);
        debugApp(`${packageJSON.name} booting`);

        return new Server(port);
    }

    async start () {

        //NOTE: getting settings
        const { token, owner, repo } = Config.globals;

        //NOTE: getting data from github
        const apiGithubObj = new ApiGithub(token);
        const listWFRuns   = await apiGithubObj.getListRuns(owner, repo);
        const runsKey      = 'workflow_runs';

        debugApp(`Runs count: ${listWFRuns[runsKey] && listWFRuns[runsKey].length}`);

        //NOTE: rendering output page
        const locals = {
            columns: [
                'id',
                'name',
                'head_branch',
                'run_number',
                'status',
                'conclusion',
                'workflow_id',
                'created_at'
            ],
            values: listWFRuns[runsKey] ? listWFRuns[runsKey] : [],
        };
        const pug    = new Pug({
            viewPath: path.join(path.resolve(), 'views'),
            locals:   locals,
            basedir:  path.resolve(),
            app:      this._app
        });

        pug.locals.someKey = 'some value';
        this._app.use(async ctx => {
            await ctx.render('index', locals, true);
        });

        //NOTE: enabling server listening
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

