import { config as envConfig } from 'dotenv';
import debug from 'debug';
import * as GLOBALS from './globals.js';

const DEFAULTS = { ...GLOBALS };

envConfig();

const DEBUG_PREFIX_APP = 'app';
const DEBUG_PREFIX_CONFIG = 'config';
const DEBUG_PREFIX_GLOBAL = 'global';
const DEBUG_PREFIX_GITHUB_API = 'github_api';

export const debugApp = debug(DEBUG_PREFIX_APP);
export const debugConfig = debug(DEBUG_PREFIX_CONFIG);
export const debugGlobal = debug(DEBUG_PREFIX_GLOBAL);
export const debugApiGithub = debug(DEBUG_PREFIX_GITHUB_API);

interface ValuesInterface {
    port: number,
    host: string,
    owner: string,
    repo: string,
    token?: string,
    update?: (values: ValuesInterface) => ({
        port: number,
        host: string,
        owner: string,
        repo: string,
        token?: string,
    })
}

export class Config {

    values: ValuesInterface;

    static get defaults (): ValuesInterface {
        return DEFAULTS;
    }

    static get globals (): ValuesInterface {
        return GLOBALS;
    }

    static _getFromEnv (): ValuesInterface {
        return {
            port:  Number(process.env['PORT']),
            host:  process.env['HOST'] || '',
            owner: process.env['OWNER'] || '',
            repo:  process.env['REPO'] || '',
            token: process.env['GITHUB_TOKEN']
        };
    }

    constructor ({ host, port }: { host: string, port: number }) {
        this.values = { ...Config.defaults };
        if (this.values.update)
            this.values.update(Object.assign(Config._getFromEnv(), { host, port }));


        if (!this.values.owner || !this.values.repo)
            throw new Error('Owner or repo are empty!');


        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`PORT: ${this.values.port}`);
        debugConfig(`HOST: ${this.values.host}`);
        debugConfig(`OWNER: ${this.values.owner}`);
        debugConfig(`REPO: ${this.values.repo}`);
        debugConfig(`TOKEN: ${this.values.token}`);
        if (Config.globals.update)
            Config.globals.update(this.values);


    }
}

export default Config.globals;

export * from './globals.js';

