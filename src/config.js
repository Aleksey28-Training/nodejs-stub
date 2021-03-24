import { config } from 'dotenv';

config();

const { PORT = '1337', HOST = 'localhost' } = process.env;

console.log(PORT);

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
