import defaultConfig, { debugConfig, default as config, host, port } from '../src/config.js';
import server from '../index.js';
import { expect } from 'chai';
import got from 'got';

debugConfig(typeof config);
debugConfig(config);

describe('Checking "HOST"', () => {
    it('"HOST" equals "localhost"', () => {
        expect(host, 'HOST doesn\'t equal localhost').to.equal('localhost');
    });
});

describe('Checking "PORT"', () => {
    it('"PORT" equals "1337"', () => {
        expect(port, 'PORT doesn\'t equal 1337').to.equal(1337);
    });
});

describe('Checking "config"', () => {
    it('config has property HOST', () => {
        expect(config, 'config must have property HOST').to.have.property('host');
    });
    it('config\'s property HOST equals localhost', () => {
        expect(config['host'], 'config\'s property HOST doesn\'t equal localhost').to.equal('localhost');
    });
    it('config has property PORT', () => {
        expect(config, 'config must have property PORT').to.have.property('port');
    });
    it('config\'s property PORT equals "1337"', () => {
        expect(config['port'], 'config\'s property PORT doesn\'t equal "1337"').to.equal(1337);
    });
});

describe('Checking "defaultConfig"', () => {
    it('"defaultConfig" has property "HOST"', () => {
        expect(defaultConfig, '"defaultConfig" must have property "HOST"').to.have.property('host');
    });
    it('"defaultConfig"\'s property "HOST" equals "localhost"', () => {
        expect(defaultConfig['host'], '"defaultConfig"\'s property HOST doesn\'t equal "localhost"').to.equal('localhost');
    });
    it('"defaultConfig" has property PORT', () => {
        expect(defaultConfig, '"defaultConfig" must have property "PORT"').to.have.property('port');
    });
    it('"defaultConfig"\'s property PORT equals localhost', () => {
        expect(defaultConfig['port'], 'config\'s property "PORT" doesn\'t equal localhost').to.equal(1337);
    });
});


describe('Checking server', () => {
    it('Server sends status 200', async () => {
        const objServer = await server;

        await objServer.start();
        const response = await got(`http://${config.host}:${config.port}/`);

        await objServer.stop();

        expect(response.statusCode, 'Server doesn\'t send status 200').to.equal(200);
    });
});

//TODO: write tests for github APIs after migrating to TypeScript
