import { Selector } from 'testcafe';
import nock = require('nock');
import { Config, debugFunctionalTest } from '../src/server/config';
import server from '../src/server';

fixture`Getting Started`
    .page`http://localhost:1337/`
    .before(async () => {
        await server.start();
    });

test('Rerun', async t => {

    const config = new Config({ host: 'localhost', port: 1337 });

    const { owner, repo, baseUrlGitHub = '' } = config.values;

    debugFunctionalTest(`URL: ${baseUrlGitHub}`);
    debugFunctionalTest(`request: ${new RegExp(`/repos/${owner}/${repo}/actions/runs/\\d*/rerun`)}`);

    nock(baseUrlGitHub)
        .post(new RegExp(`/repos/${owner}/${repo}/actions/runs/\\d*/rerun`))
        .reply(201, {});

    await t
        .click('.table__button');

    const row = await Selector('.table__button').parent('tr');
    const status = await row.find('.table__column_name_status');

    await t.expect(status.innerText).eql('queued');

    nock(baseUrlGitHub)
        .get(new RegExp(`/repos/${owner}/${repo}/actions/runs/\\d*`))
        .reply(200, {
            status:     'completed',
            conclusion: 'success',
        });

    await t.wait(10 * 1000);

    await t.expect(status.innerText).eql('completed');
});
