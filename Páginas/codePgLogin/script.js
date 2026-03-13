const section = document.querySelector("section#login");
const btnCadastrar = document.querySelector("#btnCadastrar");
const btnLogar = document.querySelector("#btnLogar");

btnCadastrar.addEventListener("click", () => {
    section.classList.add("active");
});

btnLogar.addEventListener("click", () => {
    section.classList.remove("active");
});



document.getElementById("email").addEventListener("input", function () {

    document.getElementById("erro-email").textContent = ""

    this.classList.remove("input-erro")

})





//login

document.getElementById("loginForm").addEventListener("submit", async function (e){
    e.preventDefault()


    const email = document.getElementById("loginM").value
    const senha = document.getElementById("isenha").value

    const usuario = {
        email: email,
        senha: senha
    }

    const respostaLogin = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(usuario)

    })

    const mensagemLogin = await respostaLogin.text()

    if (respostaLogin.ok) {
        document.getElementById("loginForm").reset()

        window.location.href = "../principal/main.html"
    } else{
        alert(mensagemLogin)
    }
})




// para enviar os dados de cadastro

document.getElementById("formulario-cadastro").addEventListener("submit", async function (e) {
    e.preventDefault() // impedir recarregamento da pag ao env cadas

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    const erroEmail = document.getElementById("erro-email")

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos")
        return
    }

    if (!email.includes("@")) {
        alert("Digite um email válido")
        return
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    }

    try {
        const resposta = await fetch("http://localhost:8080/usuarios/cadastro", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(usuario)

            

        })

        const mensagem = await resposta.text()

        if (resposta.ok) {
            // alert("Usuário cadastrado")

            document.getElementById("formulario-cadastro").reset()

            window.location.href = "../principal/main.html"


        } else {
            erroEmail.textContent = mensagem

            document.getElementById("email").classList.add("input-erro")

        }
    } catch (erro) {
        console.error(erro)

        alert("Erro na api")
    }



    // const dados = await resposta.json()

})