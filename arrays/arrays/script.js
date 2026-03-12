// Criando um Array vazio
let alunos = []


// Função para adicionar aluno
function adicionarAluno(){

let nome = document.getElementById("nomeAluno").value

if(nome === ""){
alert("Digite um nome")
return
}

// adiciona no array
alunos.push(nome)

document.getElementById("nomeAluno").value = ""

alert("Aluno adicionado com sucesso!")

}


// função para listar alunos
function listarAlunos(){

let lista = document.getElementById("lista")

lista.innerHTML = ""

for(let i = 0; i < alunos.length; i++){

let item = document.createElement("li")

item.textContent = alunos[i]

lista.appendChild(item)

}

}