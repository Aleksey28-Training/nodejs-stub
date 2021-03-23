import defaultConfig, { config, HOST, PORT } from '../src/config.js';
import { expect } from 'chai';

expect(HOST, 'HOST equal localhost').to.equal('localhost');

console.log(config);
console.log(HOST, PORT);
console.log(defaultConfig);
