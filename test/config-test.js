import defaultConfig, { debugConfig, default as config, host, owner, port, repo, token } from '../src/config.js';
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

describe('Checking "OWNER"', () => {
    it('"OWNER" doesn\'t equal ""', () => {
        expect(owner, 'OWNER equals ""').not.to.equal('');
    });
});

describe('Checking "REPO"', () => {
    it('"REPO" doesn\'t equal ""', () => {
        expect(repo, 'REPO equals ""').not.to.equal('');
    });
});

describe('Checking "TOKEN"', () => {
    it('"TOKEN" doesn\'t equal ""', () => {
        expect(token, 'TOKEN equals ""').not.to.equal('');
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
    it('config has property OWNER', () => {
        expect(config, 'config must have property OWNER').to.have.property('owner');
    });
    it('config has property REPO', () => {
        expect(config, 'config must have property REPO').to.have.property('repo');
    });
    it('config has property TOKEN', () => {
        expect(config, 'config must have property TOKEN').to.have.property('token');
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
    it('defaultConfig has property OWNER', () => {
        expect(defaultConfig, 'defaultConfig must have property OWNER').to.have.property('owner');
    });
    it('defaultConfig has property REPO', () => {
        expect(defaultConfig, 'defaultConfig must have property REPO').to.have.property('repo');
    });
    it('defaultConfig has property TOKEN', () => {
        expect(defaultConfig, 'defaultConfig must have property TOKEN').to.have.property('token');
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
