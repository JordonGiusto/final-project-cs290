import start from './client.js';

function hideContainer() {

    let name = document.getElementById('name').value;
    if(name == ''){
        alert('enter name');
        return;
    }
    console.log(name);

    document.getElementById('container').classList.add('hidden');
    console.log('starting');
    start(name);
}

document.getElementById('startButton').addEventListener('click', hideContainer)