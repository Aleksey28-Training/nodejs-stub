const allButtonsRerun = document.querySelectorAll('.table__button');

allButtonsRerun.forEach(item => {
    item.addEventListener('click', rerun);
});

async function rerun (evt: Event): Promise<void> {

    // const row = evt.target?.closest('tr')
    if (!evt.target) {
        return;
    }

    const row = (<HTMLButtonElement>evt.target).closest('tr');
    const id = row?.querySelector('.table__column_name_id');
    const status = row?.querySelector('.table__column_name_status');

    const options = {
        method:  'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:    JSON.stringify({ id: id?.innerHTML })
    };

    try {
        await fetch('http://localhost:1337/rerun', options);
        if (status) {
            status.innerHTML = 'queued';
        }
    } catch (error) {
        console.log(error);
    }
}
