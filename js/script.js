const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");
/*A função criaLi() apenas cria um novo item de lista vazio.
A função criaTarefa() pega esse item criado, insere o texto da tarefa nele e, 
em seguida, adiciona esse item à lista visível de tarefas (ul).
*/
function criaLi() { //cria um novo elemento de lista!
    const li = document.createElement("li");
    return li;
}

inputTarefa.addEventListener("keypress", function (evento) {
    if (evento.keyCode === 13) {
        if (!inputTarefa.value) {
            return;
        }
        criaTarefa(inputTarefa.value);
    }
});

function limparImput() {
    inputTarefa.value = "";
    inputTarefa.focus();
}

function criarBotaoApagar(li) {
    li.innerHTML += " ";
    const botaoApagar = document.createElement("button");
    botaoApagar.innerText = "apagar";
    botaoApagar.setAttribute("class", "apagar");
    botaoApagar.setAttribute("title", "apagar esta tarefa");
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limparImput(); //após  criar tarefa,eu limpo o imput!
    criarBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener("click", function (evento) {
    if (!inputTarefa.value) {
        return;
    }
    criaTarefa(inputTarefa.value);
})

document.addEventListener("click", function (evento) {
    const elemento = evento.target;
    if (elemento.classList.contains("apagar")) {
        elemento.parentElement.remove();
        salvarTarefas();

    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll("li");
    const listaDeTarefas = [];
    for (let i = 0; i < liTarefas.length; i++) {
        let tarefa = liTarefas[i];
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace("apagar", "").trim(); //remove espaço nas posta da string
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //string no formato JSON
    localStorage.setItem("tarefas", tarefasJSON)
}

function adicionaTarefaSalvas() {
    const tarefas = localStorage.getItem("tarefas");
    const listaDeTarefas = JSON.parse(tarefas); //de volta para um objeto para JS

    for (i = 0; i < listaDeTarefas.length; i++) {
        let tarefa = listaDeTarefas[i];
        criaTarefa(tarefa);
    }

}
adicionaTarefaSalvas();