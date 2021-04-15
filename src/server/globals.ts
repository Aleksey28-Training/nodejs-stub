import { debugGlobal } from './config.js';

export let host = 'localhost';
export let port = 1337;
export let owner = '';
export let repo = '';
export let token = '';

interface UpdateInterface {
    port: number,
    host: string,
    owner: string,
    repo: string,
    token?: string,
    [Symbol.toStringTag]?: string,
}

export function update (this: UpdateInterface, newValues: UpdateInterface): UpdateInterface {
    debugGlobal(typeof this);
    if (this && !(this[Symbol.toStringTag] === 'Module'))
        return Object.assign(this, newValues);


    host = newValues.host ? newValues.host : host;
    port = newValues.port ? newValues.port : port;
    owner = newValues.owner ? newValues.owner : owner;
    repo = newValues.repo ? newValues.repo : repo;
    token = newValues.token ? newValues.token : token;

    debugGlobal(`HOST: ${host}`);
    debugGlobal(`PORT: ${port}`);
    debugGlobal(`OWNER: ${owner}`);
    debugGlobal(`REPO: ${repo}`);
    debugGlobal(`TOKEN: ${token}`);

    return this;
}