import Router, { IMiddleware } from 'koa-router';
import RunsController from '../controllers/runs.js';

class RunsRouter {
    _router: Router;
    _runsController: RunsController;

    constructor () {
        this._router = new Router();
        this._runsController = new RunsController();
    }

    getRouter (): IMiddleware {
        this._router.get('/', this._runsController.renderRuns.bind(this._runsController));
        this._router.post('/rerun/:id', this._runsController.rerunRun.bind(this._runsController));
        this._router.get('/rerun/:id', this._runsController.checkRun.bind(this._runsController));

        return this._router.routes();
    }
}

export default RunsRouter;
