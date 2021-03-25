import { config as envConfig } from 'dotenv';
import { readFileSync } from 'fs';
import debug from 'debug';

envConfig();

const { PORT = '1337', HOST = 'localhost' } = process.env;

const packageJSON = JSON.parse(readFileSync('./package.json', 'utf8'));

const DEBUG_PREFIX_APP    = 'app';
const DEBUG_PREFIX_CONFIG = 'config';

const debugApp    = debug(DEBUG_PREFIX_APP);
const debugConfig = debug(DEBUG_PREFIX_CONFIG);

//NOTE: You need to tap $env:DEBUG="config" in terminal to turn on debug
debugApp('%o booting', packageJSON.name);

debugConfig(`PORT: ${PORT}`);
debugConfig(`HOST: ${HOST}`);

export default {
    PORT,
    HOST
};

export {
    PORT,
    HOST,
};
