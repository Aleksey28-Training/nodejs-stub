import { config as envConfig } from 'dotenv';
import debug from 'debug';
import * as GLOBALS from './globals.js';

const DEFAULTS = { ...GLOBALS };

envConfig();

const DEBUG_PREFIX_APP    = 'app';
const DEBUG_PREFIX_CONFIG = 'config';
const DEBUG_PREFIX_GLOBAL = 'global';

export const debugApp    = debug(DEBUG_PREFIX_APP);
export const debugConfig = debug(DEBUG_PREFIX_CONFIG);
export const debugGlobal = debug(DEBUG_PREFIX_GLOBAL);

export class Config {

    static get defaults () {
        return DEFAULTS;
    }

    static get globals () {
        return GLOBALS;
    }

    static _getFromEnv () {
        const { port, host } = process.env;

        return { port, host };
    }

    constructor (values) {
        this.values = { ...Config.defaults };
        this.values.update(Object.assign(Config._getFromEnv(), values));

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`PORT: ${this.values.port}`);
        debugConfig(`HOST: ${this.values.host}`);

        Config.globals.update(this.values);

    }
}

export default Config.globals;

export * from './globals.js';

