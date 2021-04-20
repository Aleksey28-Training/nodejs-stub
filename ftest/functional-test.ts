import { Selector } from 'testcafe';
import nock = require('nock');
import { Config } from '../src/server/config';

fixture`Getting Started`
    .page`http://localhost:1337/`;

test('Rerun', async t => {

    const config = new Config({ host: 'localhost', port: 1337 });

    const { owner, repo, baseUrlGitHub = '' } = config.values;

    const request = new RegExp(`/repos/${owner}/${repo}/actions/runs/\\d*/rerun`);

    nock(baseUrlGitHub)
        .post(request)
        .reply(201, {});

    await t
        .click('.table__button');

    const status = await Selector('.table__button').parent('tr').find('.table__column_name_status').innerText;

    await t.expect(status).eql('queued');
});
