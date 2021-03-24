import defaultConfig, { config, HOST, PORT } from '../src/config.js';
import { expect } from 'chai';

//Test HOST
expect(HOST, 'HOST is empty').to.be.not.empty;
console.log("HOST isn't empty");
expect(HOST, 'HOST doesn\'t equal localhost').to.equal('localhost');
console.log('HOST equals localhost');

//Test PORT
expect(String(PORT), 'PORT is empty').to.be.not.empty;
console.log("PORT isn't empty");
expect(PORT, 'PORT doesn\'t equal 1337').to.equal(1337);
console.log('PORT equals 1337');

//Test config
expect(config, 'config isn\'t object').to.be.an('object');
console.log('config is object');
expect(config, 'config must have property HOST').to.have.property('HOST');
console.log('config has property HOST');
expect(config['HOST'], 'config\'s property HOST is empty').to.be.not.empty;
console.log('config\'s property HOST isn\'t empty');
expect(config['HOST'], 'config\'s property HOST doesn\'t equal localhost').to.equal('localhost');
console.log('config\'s property HOST equals localhost');
expect(config, 'config must have property PORT').to.have.property('PORT');
console.log('config has property PORT');
expect(String(config['PORT']), 'config\'s property PORT is empty').to.be.not.empty;
console.log('config\'s property PORT isn\'t empty');
expect(config['PORT'], 'config\'s property PORT doesn\'t equal localhost').to.equal(1337);
console.log('config\'s property PORT equals localhost');

//Test defaultConfig
expect(defaultConfig, 'defaultConfig isn\'t object').to.be.an('object');
console.log('defaultConfig is object');
expect(defaultConfig, 'defaultConfig must have property HOST').to.have.property('HOST');
console.log('defaultConfig has property HOST');
expect(defaultConfig['HOST'], 'defaultConfig\'s property HOST is empty').to.be.not.empty;
console.log('defaultConfig\'s property HOST isn\'t empty');
expect(defaultConfig['HOST'], 'defaultConfig\'s property HOST doesn\'t equal localhost').to.equal('localhost');
console.log('defaultConfig\'s property HOST equals localhost');
expect(defaultConfig, 'defaultConfig must have property PORT').to.have.property('PORT');
console.log('defaultConfig has property PORT');
expect(String(defaultConfig['PORT']), 'defaultConfig\'s property PORT is empty').to.be.not.empty;
console.log('defaultConfig\'s property PORT isn\'t empty');
expect(defaultConfig['PORT'], 'defaultConfig\'s property PORT doesn\'t equal localhost').to.equal(1337);
console.log('defaultConfig\'s property PORT equals localhost');
