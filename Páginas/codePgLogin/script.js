const section = document.querySelector("section#login");
const btnCadastrar = document.querySelector("#btnCadastrar");
const btnLogar = document.querySelector("#btnLogar");

btnCadastrar.addEventListener("click", () => {
    section.classList.add("active");
});

btnLogar.addEventListener("click", () => {
    section.classList.remove("active");
});



// para enviar os dados de cadastro

document.getElementById("formulario-cadastro").addEventListener("submit", async function (e) {
    e.preventDefault() // impedir recarregamento da pag ao env cadas

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

      if(!nome || !email || !senha){
        alert("Preencha todos os campos")
        return
    }

    if(!email.includes("@")){
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

        if (resposta.ok){
           // alert("Usuário cadastrado")

            document.getElementById("formulario-cadastro").reset()

            window.location.href = "../principal/main.html"


        } else {
            alert("Erro ao cadastrar")
        }
    } catch(erro){
       console.error(erro)

        alert("Erro na api")
    }

   

   // const dados = await resposta.json()

})