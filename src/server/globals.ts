import debug from 'debug';

const DEBUG_PREFIX = 'node-stub';
const DEBUG_PREFIX_APP = `${DEBUG_PREFIX}:app`;
const DEBUG_PREFIX_CONFIG = `${DEBUG_PREFIX}:config`;
const DEBUG_PREFIX_GLOBAL = `${DEBUG_PREFIX}:global`;
const DEBUG_PREFIX_GITHUB_API = `${DEBUG_PREFIX}:github_api`;
const DEBUG_PREFIX_RUNS = `${DEBUG_PREFIX}:runs`;
const DEBUG_PREFIX_FUNCTIONAL_TEST = `${DEBUG_PREFIX}:ftest`;

export const debugApp = debug(DEBUG_PREFIX_APP);
export const debugConfig = debug(DEBUG_PREFIX_CONFIG);
export const debugGlobal = debug(DEBUG_PREFIX_GLOBAL);
export const debugApiGithub = debug(DEBUG_PREFIX_GITHUB_API);
export const debugRuns = debug(DEBUG_PREFIX_RUNS);
export const debugFunctionalTest = debug(DEBUG_PREFIX_FUNCTIONAL_TEST);

export let baseUrlGitHub = 'https://api.github.com';
export let host = 'localhost';
export let port = 1337;
export let owner = '';
export let repo = '';
export let token = '';

export interface ValuesInterface {
    owner: string;
    repo: string;

    port?: number;
    host?: string;
    token?: string;
    baseUrlGitHub?: string;

    // HACK: have to declare Symbol.toStringTag as optional since TS cannot deduct types even by well-known Symbols
    [Symbol.toStringTag]?: string;
}

interface Module extends ValuesInterface {
    [Symbol.toStringTag]: string;
}

function isModule (config: Module | ValuesInterface): config is Module {
    return Symbol.toStringTag in config && config[Symbol.toStringTag] === 'Module';
}

export function update (this: Module | ValuesInterface, newValues: ValuesInterface): ValuesInterface {
    debugGlobal(typeof this);

    if (this && isModule(this))
        return Object.assign(this, newValues);

    host = newValues.host ? newValues.host : host;
    port = newValues.port ? newValues.port : port;
    owner = newValues.owner ? newValues.owner : owner;
    repo = newValues.repo ? newValues.repo : repo;
    token = newValues.token ? newValues.token : token;
    baseUrlGitHub = newValues.baseUrlGitHub ? newValues.baseUrlGitHub : baseUrlGitHub;

    debugGlobal(`HOST: ${host}`);
    debugGlobal(`PORT: ${port}`);
    debugGlobal(`OWNER: ${owner}`);
    debugGlobal(`REPO: ${repo}`);
    debugGlobal(`TOKEN: ${token}`);
    debugGlobal(`BASE URL GITHUB: ${baseUrlGitHub}`);

    return this;
}
