import { config as envConfig } from 'dotenv';
import debug from 'debug';

envConfig();

const DEBUG_PREFIX_APP    = 'app';
const DEBUG_PREFIX_CONFIG = 'config';

const debugApp    = debug(DEBUG_PREFIX_APP);
const debugConfig = debug(DEBUG_PREFIX_CONFIG);

class Config {
    constructor (port = '', host = '') {
        const { envPort = '1337', envHost = 'localhost' } = process.env;

        this._port = port || envPort;
        this._host = host || envHost;
        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`PORT: ${this._port}`);
        debugConfig(`HOST: ${this._host}`);
    }

    get port () {
        return this._port;
    }

    get host () {
        return this._host;
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

