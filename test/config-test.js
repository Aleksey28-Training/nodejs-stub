import defaultConfig, { config, HOST, PORT } from '../src/config.js';
import { expect } from 'chai';


describe('Checking "HOST"', () => {
    it('"HOST" equals "localhost"', () => {
        expect(HOST, 'HOST doesn\'t equal localhost').to.equal('localhost');
    });
});

describe('Checking "PORT"', () => {
    it('"PORT" equals "1337"', () => {
        expect(PORT, 'PORT doesn\'t equal 1337').to.equal('1337');
    });
});

describe('Checking "config"', () => {
    it('config is object', () => {
        expect(config, 'config isn\'t object').to.be.an('object');
    });
    it('config has property HOST', () => {
        expect(config, 'config must have property HOST').to.have.property('HOST');
    });
    it('config\'s property HOST equals localhost', () => {
        expect(config['HOST'], 'config\'s property HOST doesn\'t equal localhost').to.equal('localhost');
    });
    it('config has property PORT', () => {
        expect(config, 'config must have property PORT').to.have.property('PORT');
    });
    it('config\'s property PORT equals localhost', () => {
        expect(config['PORT'], 'config\'s property PORT doesn\'t equal localhost').to.equal('1337');
    });
});

describe('Checking "defaultConfig"', () => {
    it('"defaultConfig" is object', () => {
        expect(defaultConfig, '"defaultConfig" isn\'t object').to.be.an('object');
    });
    it('"defaultConfig" has property "HOST"', () => {
        expect(defaultConfig, '"defaultConfig" must have property "HOST"').to.have.property('HOST');
    });
    it('"defaultConfig"\'s property "HOST" equals "localhost"', () => {
        expect(defaultConfig['HOST'], '"defaultConfig"\'s property HOST doesn\'t equal "localhost"').to.equal('localhost');
    });
    it('"defaultConfig" has property PORT', () => {
        expect(defaultConfig, '"defaultConfig" must have property "PORT"').to.have.property('PORT');
    });
    it('"defaultConfig"\'s property PORT equals localhost', () => {
        expect(defaultConfig['PORT'], 'config\'s property "PORT" doesn\'t equal localhost').to.equal('1337');
    });
});
