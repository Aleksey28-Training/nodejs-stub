class RunsModel {

    _runs: Array<unknown>;

    constructor () {
        this._runs = [];
    }

    get runs (): Array<unknown> {
        return this._runs;
    }

    set runs (newRuns: Array<unknown>) {
        this._runs = newRuns;
    }
}

export default RunsModel;
