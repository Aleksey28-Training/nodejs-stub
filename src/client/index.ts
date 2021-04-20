import api from './utils/api.js';

const allButtonsRerun = document.querySelectorAll('.table__button');

allButtonsRerun.forEach(item => {
    item.addEventListener('click', rerun);
});

interface CheckInterface {
    status?: string,
    conclusion?: string
}

async function checkRun (id: string): Promise<CheckInterface> {

    const result: CheckInterface = {};

    if (!id) return result;

    try {
        const res = await api.checkRun({ id });
        result.status = res?.status || '';
        result.conclusion = res?.conclusion || '';
    } catch (error) {
        console.log(error);
    }

    return result;
}

async function rerun (evt: Event): Promise<void> {

    if (!evt.target) return;

    const row = (<HTMLButtonElement>evt.target).closest('tr');
    const id = row?.querySelector('.table__column_name_id');
    const status = row?.querySelector('.table__column_name_status');
    const conclusion = row?.querySelector('.table__column_name_conclusion');

    if (!row || !id || !status || !conclusion) return;

    try {
        await api.rerun({ id: id?.innerHTML });

        if (status) {
            status.innerHTML = 'queued';
            conclusion.innerHTML = '';
        }

        const intervalSeconds = 5;
        const interval = setInterval(async () => {
            const result = await checkRun(id.innerHTML);

            status.innerHTML = result.status || '';
            conclusion.innerHTML = result.conclusion || '';

            if (result.status === 'completed') {
                clearInterval(interval);
            }
        }, intervalSeconds * 1000);

    } catch (error) {
        console.log(error);
    }
}


