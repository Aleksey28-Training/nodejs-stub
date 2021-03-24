import Koa from 'koa';
import { PORT } from './src/config.js';
import esMain from 'es-main';


const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

if (esMain(import.meta)) {
    app.listen(PORT, async () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });
}

export default app;
