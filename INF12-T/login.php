<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Validação de Acesso</title>
</head>
<body>

<?php

$conexao = mysqli_connect("localhost", "root", "1234", "cadastro");

$email = $_POST["email"];
$cpf = $_POST["cpf"];
 
// Consulta no banco
$sql = "SELECT * FROM clientes 
        WHERE email = '$email' 
        AND cpf = '$cpf'";

$resultado = mysqli_query($conexao, $sql);

// Verifica se encontrou algum registro
if(mysqli_num_rows($resultado) > 0){

    echo "<h2>Acesso Liberado ✅</h2>";
    echo "Bem-vindo ao sistema de compras!";

} else {

    echo "<h2>Acesso Restrito ❌</h2>";
    echo "E-mail ou CPF incorretos.";

}

mysqli_close($conexao);

?>

</body>
</html>
