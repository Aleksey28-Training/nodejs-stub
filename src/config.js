import { config as envConfig } from 'dotenv';
import { readFileSync } from 'fs';
import debug from 'debug';

envConfig();

const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

const DEBUG_PREFIX_APP    = 'app';
const DEBUG_PREFIX_CONFIG = 'config';

const debugApp    = debug(DEBUG_PREFIX_APP);
const debugConfig = debug(DEBUG_PREFIX_CONFIG);

//NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
debugApp('%o booting', packageJSON.name);

class Config {
    constructor (port = '', host = '') {
        this._port = port;
        this._host = host;
    }

    static get port () {
        const { port = '1337' } = process.env;

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`PORT: ${this._port || port}`);

        return this._port || port;
    }

    static get host () {
        const { host = 'localhost' } = process.env;

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`HOST: ${this._host || host}`);

        return this._host || host;
    }
}

// const { PORT = '1337', HOST = 'localhost' } = process.env;
const PORT = Config.port;
const HOST = Config.host;

export default {
    PORT,
    HOST,
    Config,
};

export {
    PORT,
    HOST,
    Config,
};

