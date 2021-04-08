class RunsModel {
    constructor () {
        this._runs = [];
    }

    get runs () {
        return this._runs;
    }

    set runs (newRuns) {
        this._runs = newRuns;
    }
}

export default RunsModel;
