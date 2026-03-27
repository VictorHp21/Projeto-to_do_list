// token do usuário

// intervalo para carregar tarefas
 setInterval(carregarTarefas, 6000)


// carregar tarefas salvas

window.onload = () => {
    carregarTarefas()
    verificarAtrasos()
}





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

    let token = localStorage.getItem("token")

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
        dataPrazo: prazo
    }

    try {
        const resposta = await fetch("http://localhost:8080/tarefas", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
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


            voltaTarefa()



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

    let token = localStorage.getItem("token")

    try {

        const resposta = await fetch("http://localhost:8080/tarefas", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const tarefas = await resposta.json()

        const container = document.querySelector(".task-cards")
        container.innerHTML = ""

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

    card.dataset.prazo = tarefa.dataPrazo

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

            <button class="btn-custom-remove" onclick="removerTarefa(this)" data-id="${tarefa.id}">Excluir Tarefa</button>

        </div>
    `

    container.appendChild(card)

}


function formatarData(data) {

    const d = new Date(data)

    return d.toLocaleDateString("pt-BR")

}





async function removerTarefa(botao) {

    let token = localStorage.getItem("token")

    const id = botao.dataset.id;

    try {

        const resposta = await fetch(`http://localhost:8080/tarefas/${id}`, {
            method: "DELETE",

            headers: {
                "Authorization": "Bearer " + token
            }
        })

        if (resposta.ok) {

            botao.closest(".task-card").remove()

        }

    } catch (erro) {
        console.error("Erro ao remover tarefa", erro)
    }

}



function verificarAtrasos() {

    const cards = document.querySelectorAll(".task-card")

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    cards.forEach(card => {

        const prazo = new Date(card.dataset.prazo)

        if (prazo < hoje) {

            const button = card.querySelector(".btn-status")
            const text = card.querySelector(".task-status-text")

            button.classList.remove("pendente")
            button.classList.add("atraso")

            text.textContent = "Em atraso"
        }

    })

}