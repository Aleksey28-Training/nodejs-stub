import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:1337/`;

test('Rerun', async t => {
    await t
        .click('.table__button');
});
