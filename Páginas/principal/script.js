


// FUnções do botao de mostrar tarefa

function mostrarTarefa() {

    document.getElementById('title').classList.remove('hide')

    document.getElementById('taskArea').classList.remove('hide')
    document.getElementById('dataArea').classList.remove('hide')

    document.getElementById('btn-add').style.display = 'none'

}

function voltaTarefa() {
    document.getElementById('taskArea').classList.add('hide')
    document.getElementById('dataArea').classList.add('hide')
    document.getElementById('title').classList.add('hide')

    document.getElementById('btn-add').style.display = 'flex'
}


// Funções do bt status

function mostrarMenuStatus(botao) {



    const container = botao.closest('.task-status')

    const menu = container.querySelector('.status-menu')

    menu.classList.toggle('hide')
}

function setStatus(element, status){

    const container = element.closest('.task-status')

    const button = container.querySelector('.btn-status')

    const text = container.querySelector('.task-status-text')

    button.classList.remove('pendente','feito','atraso')

    button.classList.add(status)

       if(status === 'feito'){
        text.innerHTML = 'Finalizado'
    }

    if(status === 'pendente'){
        text.innerHTML = 'Pendente'
    }

    if(status === 'atraso'){
        text.innerHTML = 'Em atraso'
    }

    container.querySelector('.status-menu').classList.add('hide')

    

    

}