 const section = document.querySelector("section#login");
    const btnCadastrar = document.querySelector("#btnCadastrar");
    const btnLogar = document.querySelector("#btnLogar");

    btnCadastrar.addEventListener("click", () => {
        section.classList.add("active");
    });

    btnLogar.addEventListener("click", () => {
        section.classList.remove("active");
         });