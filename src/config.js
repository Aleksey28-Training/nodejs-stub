import { config as envConfig } from 'dotenv';
import debug from 'debug';
import * as GLOBALS from './globals.js';

const DEFAULTS = { ...GLOBALS };

envConfig();

const DEBUG_PREFIX_APP    = 'app';
const DEBUG_PREFIX_CONFIG = 'config';
const DEBUG_PREFIX_GLOBAL = 'global';
const DEBUG_PREFIX_GITHUB_API = 'github api';

export const debugApp    = debug(DEBUG_PREFIX_APP);
export const debugConfig = debug(DEBUG_PREFIX_CONFIG);
export const debugGlobal = debug(DEBUG_PREFIX_GLOBAL);
export const debugApiGithub = debug(DEBUG_PREFIX_GITHUB_API);

export class Config {

    static get defaults () {
        return DEFAULTS;
    }

    static get globals () {
        return GLOBALS;
    }

    static _getFromEnv () {
        return {
            port:  process.env['PORT'],
            host:  process.env['HOST'],
            owner: process.env['OWNER'],
            repo:  process.env['REPO'],
            token: process.env['GITHUB_TOKEN']
        };
    }

    constructor (values) {
        this.values = { ...Config.defaults };
        this.values.update(Object.assign(Config._getFromEnv(), values));

        if (!this.values.owner || !this.values.repo)
            throw new Error('Owner or repo are empty!');

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`PORT: ${this.values.port}`);
        debugConfig(`HOST: ${this.values.host}`);
        debugConfig(`OWNER: ${this.values.owner}`);
        debugConfig(`REPO: ${this.values.repo}`);
        debugConfig(`TOKEN: ${this.values.token}`);

        Config.globals.update(this.values);

    }
}

export default Config.globals;

export * from './globals.js';

