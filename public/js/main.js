document.getElementById('getAllButton').addEventListener('click', function () {
    fetch('/getAll', {
        method: 'POST',
    })
        .then(response => {
            console.log('clic')
        }
        )
        .then(data => console.log(data))
        .catch((err) => {
            console.log('Error al consultar elementos...', err.message)
        });
});