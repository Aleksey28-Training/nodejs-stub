import api from './utils/api.js';

const allButtonsRerun = document.querySelectorAll('.table__button');

allButtonsRerun.forEach(item => {
    item.addEventListener('click', rerun);
});

async function rerun (evt: Event): Promise<void> {

    if (!evt.target) return;

    const row = (<HTMLButtonElement>evt.target).closest('tr');
    const id = row?.querySelector('.table__column_name_id');
    const status = row?.querySelector('.table__column_name_status');

    if (!id || !status) return;

    try {
        await api.rerun({ id: id?.innerHTML });
        if (status) {
            status.innerHTML = 'queued';
        }
    } catch (error) {
        console.log(error);
    }
}
