import { debugGlobal } from './config.js';

export let host = 'localhost';
export let port = 1337;

export function update (newValues) {
    if (this && !(this[Symbol.toStringTag] === 'Module'))
        return Object.assign(this, newValues);

    host = newValues.host ? newValues.host : host;
    port = newValues.port ? newValues.port : port;
    debugGlobal(`HOST: ${host}`);
    debugGlobal(`PORT: ${port}`);

    return { host, port };
}
