import Koa from 'koa';
import { PORT } from './src/config.js';

const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(PORT);
