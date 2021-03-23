const { PORT = 1337, HOST = 'localhost' } = process.env;
const config = {
    PORT,
    HOST
};

export default config;

export {
    PORT,
    HOST,
    config
};
