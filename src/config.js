import { config as envConfig } from 'dotenv';
import debug from 'debug';
import { name } from '../package.json';

envConfig();

const { PORT = '1337', HOST = 'localhost' } = process.env;

const DEBUG_PREFIX_APP    = 'app';
const DEBUG_PREFIX_CONFIG = 'config';

const debugApp    = debug(DEBUG_PREFIX_APP);
const debugConfig = debug(DEBUG_PREFIX_CONFIG);

//NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
debugApp('booting %o', name);

debugConfig(`PORT: ${PORT}`);
debugConfig(`HOST: ${HOST}`);

const config = {
    PORT,
    HOST
};

export default config;

export {
    PORT,
    HOST,
    config,
};
