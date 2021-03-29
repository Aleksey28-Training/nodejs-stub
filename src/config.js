import { config as envConfig } from 'dotenv';
import debug from 'debug';

envConfig();

const DEBUG_PREFIX_APP    = 'app';
const DEBUG_PREFIX_CONFIG = 'config';

const debugApp    = debug(DEBUG_PREFIX_APP);
const debugConfig = debug(DEBUG_PREFIX_CONFIG);

class Config {
    constructor (port = '', host = '') {
        this._port = port;
        this._host = host;
    }

    get port () {
        const { port = '1337' } = process.env;

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`PORT: ${this._port || port}`);

        return this._port || port;
    }

    get host () {
        const { host = 'localhost' } = process.env;

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`HOST: ${this._host || host}`);

        return this._host || host;
    }
}

const config = new Config();
const PORT = config.port;
const HOST = config.host;

export default {
    PORT,
    HOST,
    debugApp,
    debugConfig,
    Config,
};

export {
    PORT,
    HOST,
    debugApp,
    debugConfig,
    Config,
};

