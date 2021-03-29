import { config } from 'dotenv';
import debug from 'debug';

config();

const debugConfig = debug('config');

class Config {
    constructor (port = '', host = '') {
        this._port = port;
        this._host = host;
    }

    static get port () {
        const { port = '1337' } = process.env;

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`PORT: ${this._port || port}`);

        return this._port || port;
    }
    static get host () {
        const { host = 'localhost' } = process.env;

        //You need to tap $env:DEBUG="config" in terminal to turn on debug
        debugConfig(`HOST: ${this._host || host}`);

        return this._host || host;
    }
}

// const { PORT = '1337', HOST = 'localhost' } = process.env;
const PORT = Config.port;
const HOST = Config.host;

const myConfig = {
    PORT,
    HOST,
    Config
};

export default myConfig;

export {
    PORT,
    HOST,
    myConfig as config,
    Config,
};
