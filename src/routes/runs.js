import Router from 'koa-router';
import RunsController from '../controllers/runs.js';

class RunsRouter {
    constructor () {
        this._router = new Router();
        this._runsController = new RunsController();
    }

    getRouter () {
        this._router.get('/', this._runsController.renderRuns.bind(this._runsController));

        return this._router.routes();
    }
}

export default RunsRouter;
