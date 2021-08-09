import { Config, debugApp, debugRuns } from '../config';
import ApiGithub from '../apiGithub';
import RunsModel from '../models/runs';
import { RenderOptions } from 'koa-pug/dist';
import { DefaultContext, Next } from 'koa';

class RunsController {
    _apiGithubObj: ApiGithub;
    _owner: string;
    _repo: string;
    _model: RunsModel;

    constructor () {
        const { token, owner, repo } = Config.globals;

        this._apiGithubObj = new ApiGithub(token);
        this._owner = owner;
        this._repo = repo;
        this._model = new RunsModel();
    }

    async renderRuns (ctx: RenderOptions): Promise<void> {

        const listWFRuns = await this._apiGithubObj.getListRuns(this._owner, this._repo);
        const runsKey = 'workflow_runs';

        this._model.runs = listWFRuns[runsKey] || [];

        debugApp(`Runs count: ${this._model.runs.length}`);

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
            values: this._model.runs,
        };

        await ctx.render('index', locals, true);
    }

    async rerunRun (ctx: DefaultContext, next: Next): Promise<void> {
        const params = ctx.request.params;

        debugRuns('Rerunning');
        debugRuns(params);

        if (!('id' in params)) {
            ctx.status = 400;
            ctx.body = {
                message: 'Id is empty!'
            };
            next();
        }

        ctx.body = await this._apiGithubObj.rerunRun(this._owner, this._repo, params.id);
    }

    async checkRun (ctx: DefaultContext, next: Next): Promise<void> {
        const params = ctx.request.params;

        debugRuns('Checking');
        debugRuns(params);

        if (!('id' in params)) {
            ctx.status = 400;
            ctx.body = {
                message: 'Id is empty!'
            };
            next();
        }

        ctx.body = await this._apiGithubObj.checkRun(this._owner, this._repo, params.id);
    }

}

export default RunsController;
