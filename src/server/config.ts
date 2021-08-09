import { config as envConfig } from 'dotenv';
import * as GLOBALS from './globals';

const DEFAULTS = { ...GLOBALS };

envConfig();

type ValueStorageInterface = typeof GLOBALS;
export type ValuesInterface = Omit<ValueStorageInterface, 'update'>;
export type OptionalValuesInterface = Partial<ValuesInterface>;

export class Config {
    values: ValueStorageInterface;

    static get defaults (): ValuesInterface {
        return DEFAULTS;
    }

    static get globals (): ValuesInterface {
        return GLOBALS;
    }

    static _getFromEnv (): OptionalValuesInterface {
        return {
            port:  process.env['PORT'] ? Number(process.env['PORT']) : void 0,
            host:  process.env['HOST'],
            owner: process.env['OWNER'],
            repo:  process.env['REPO'],
            token: process.env['GITHUB_TOKEN'] && `Bearer ${process.env['GITHUB_TOKEN']}`
        };
    }

    constructor (values?: OptionalValuesInterface) {
        this.values = { ...DEFAULTS };

        if (this.values.update)
            this.values.update(Object.assign(this.values, Config._getFromEnv(), values));

        if (!this.values.owner || !this.values.repo)
            throw new Error('Owner or repo are empty!');

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        GLOBALS.debugConfig(`PORT: ${this.values.port}`);
        GLOBALS.debugConfig(`HOST: ${this.values.host}`);
        GLOBALS.debugConfig(`OWNER: ${this.values.owner}`);
        GLOBALS.debugConfig(`REPO: ${this.values.repo}`);
        GLOBALS.debugConfig(`TOKEN: ${this.values.token}`);
        GLOBALS.debugConfig(`BASE URL GITHUB: ${this.values.baseUrlGitHub}`);

        GLOBALS.update(this.values);
    }
}

export default Config.globals;

export * from './globals';
