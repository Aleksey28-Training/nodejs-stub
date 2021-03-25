import { config } from 'dotenv';
import debug from 'debug';

config();

const debugConfig = debug('config');

const { PORT = '1337', HOST = 'localhost' } = process.env;

//HACK: You need to tap $env:DEBUG="config" in terminal to turn on debug
debugConfig(`PORT: ${PORT}`);
debugConfig(`HOST: ${HOST}`);

const myConfig = {
    PORT,
    HOST
};

export default myConfig;

export {
    PORT,
    HOST,
    myConfig as config,
};
