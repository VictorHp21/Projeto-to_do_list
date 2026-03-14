
// carregar tarefas salvas

window.onload = carregarTarefas



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

function setStatus(element, status) {

    const container = element.closest('.task-status')

    const button = container.querySelector('.btn-status')

    const text = container.querySelector('.task-status-text')

    button.classList.remove('pendente', 'feito', 'atraso')

    button.classList.add(status)

    if (status === 'feito') {
        text.innerHTML = 'Finalizado'
    }

    if (status === 'pendente') {
        text.innerHTML = 'Pendente'
    }

    if (status === 'atraso') {
        text.innerHTML = 'Em atraso'
    }

    container.querySelector('.status-menu').classList.add('hide')





}

let listaTarefas = []



// Adc tarefa

async function adicionarTarefa() {

    const titulo = document.getElementById("titulo").value
    const descricao = document.getElementById("taskArea").value
    const dataPrazo = document.getElementById("date-input").value

    if (!titulo || !descricao || !dataPrazo) {
        alert("Preencha todos os campos")
        return
    }

    const dataAtual = new Date()

    const prazo = new Date(dataPrazo)

    if (prazo < dataAtual) {
        alert("Escolha um prazo futuro")
        return
    }



    const Tarefa = {
        titulo: titulo,
        descricao: descricao,
        dataPrazo: dataPrazo
    }

    try {
        const resposta = await fetch("http://localhost:8080/tarefas", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(Tarefa)

        }

        )

        const mensagem = await resposta.text()

        if (resposta.ok) {


            const inputs = document.querySelectorAll("#area-tarefa input");

            inputs.forEach(input => {
                input.value = "";
            });

            document.getElementById("taskArea").value = ""


            criarCardTarefa()




        } else {
            erroTarefa.textContent = mensagem

            console.log(erroTarefa)

        }


    } catch (erro) {
        console.error(erro)

        alert("Erro na api/ salvar tarefa")
    }


}


// f carregar tarefas do bd

async function carregarTarefas() {

    try {

        const resposta = await fetch("http://localhost:8080/tarefas")

        const tarefas = await resposta.json()

        tarefas.forEach(tarefa => {
            criarCardTarefa(tarefa)
        })

    } catch (error) {
        console.log("Erro ao carregar tarefas", error)
    }

}

function criarCardTarefa(tarefa) {

    const container = document.querySelector(".task-cards")

    const dataAtual = new Date()

    const prazo = new Date(tarefa.dataPrazo)

    let status = "pendente"

    if (prazo <= dataAtual) {
        status = "atraso"
    }

    const card = document.createElement("div")
    card.classList.add("task-card")

    card.innerHTML = `
         <div class="task-content">

            <h1 class="task-title">${tarefa.titulo}</h1>

            <p class="task-text">
                ${tarefa.descricao}
            </p>

        </div>

        <div class="task-footer">

            <span class="task-date">
                📅 ${formatarData(tarefa.dataPrazo)}
            </span>

            <span class="task-status">
                <button class="btn-status ${status}" onclick="mostrarMenuStatus(this)"></button>
                <span class="task-status-text">${status}</span>
            </span>

            <button class="btn-custom-remove">Excluir Tarefa</button>

        </div>
    `

    container.appendChild(card)

}


function formatarData(data){

    const d = new Date(data)

    return d.toLocaleDateString("pt-BR")

}

