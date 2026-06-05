<?php
// 1. Conexão com o banco (Servidor, Usuário, Senha, Banco)
$conexao = mysqli_connect("localhost", "root", "1234", "sistema_usuarios");

// Verificando se a conexão falhou
if (!$conexao) {
    die("Falha na conexão: " . mysqli_connect_error());
}

// 2. Recebendo os dados do formulário
$nome   = $_POST["nome"];
$cpf    = $_POST["cpf"];
$cidade = $_POST["cidade"];

// 3. Criando o comando SQL (Substitua 'funcionarios' pelo nome real da sua tabela)
$sql = "INSERT INTO cadastro_funcionario (nome, cpf, cidade) VALUES ('$nome', '$cpf', '$cidade')";
// 4. Executando o comando no banco de dados
$result = mysqli_query($conexao, $sql);

// 5. Feedback para o usuário
if ($result) {
    echo "Dados inseridos com sucesso!";
} else {
    echo "Erro ao inserir: " . mysqli_error($conexao);
}

// 6. Fechando a conexão
mysqli_close($conexao);
?>