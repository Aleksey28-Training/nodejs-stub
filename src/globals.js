import { debugGlobal } from './config.js';

export let host = 'localhost';
export let port = 1337;
export let owner = '';
export let repo = '';
export let token = '';

export function update (newValues = {}) {
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
