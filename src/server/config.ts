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
        const settingsFromEnv: { [key: string]: string } = {};
        const propertiesFromEnv = [
            { envKey: 'PORT', key: 'port' },
            { envKey: 'HOST', key: 'host' },
            { envKey: 'OWNER', key: 'owner' },
            { envKey: 'REPO', key: 'repo' },
            { envKey: 'GITHUB_TOKEN', key: 'token' },
        ];

        propertiesFromEnv.forEach(item => {
            if (process.env[item.envKey])
                settingsFromEnv[item.key.toLowerCase()] = String(process.env[item.envKey]);
        });

        return settingsFromEnv;
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
