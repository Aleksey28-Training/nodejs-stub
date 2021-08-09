import { Config, debugApp } from './config';
import Server from './server.js';

async function runServer (): Promise<void> {
    await Server.create();

    //NOTE: You need to tap $env:DEBUG="node-stub:app" in terminal to turn on debug
    debugApp(`App is listening on port`);
}

if (require.main === module)
    runServer();


export { Server, Config, Server as default };
