
function mostrarTarefa(){

    document.getElementById('title').classList.remove('hide')

     document.getElementById('taskArea').classList.remove('hide')
    document.getElementById('dataArea').classList.remove('hide')

    document.getElementById('btn-add').style.display = 'none'
   
}

function voltaTarefa(){
    document.getElementById('taskArea').classList.add('hide')
    document.getElementById('dataArea').classList.add('hide')
    document.getElementById('title').classList.add('hide')

    document.getElementById('btn-add').style.display = 'flex'
}