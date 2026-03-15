// Array que guarda as tarefas
let tarefas = []

function adicionarTarefa(){ 

let input = document.getElementById("tarefa")
let texto = input.value

if(texto === ""){
alert("Digite uma tarefa")
return 
}

// adiciona no array
tarefas.push(texto)

input.value = ""

mostrarTarefas()

}


function mostrarTarefas(){

let lista = document.getElementById("listaTarefas")

lista.innerHTML = ""

for(let i = 0; i < tarefas.length; i++){

let li = document.createElement("li")

li.innerHTML = `
${tarefas[i]}
<button class="remover" onclick="removerTarefa(${i})">
X
</button>
`

lista.appendChild(li)

}

}


function removerTarefa(indice){

tarefas.splice(indice,1)

mostrarTarefas()

}
