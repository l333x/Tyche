<?php
$host = 'localhost';
$dbname = 'tyche'; // Nombre de tu base de datos
$user = 'root'; // Usuario de MySQL (cambiar si no usas 'root')
$password = ''; // Contraseña de MySQL (cambiar si tienes una configurada)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa.";
} catch (PDOException $e) {
    die("Error al conectar con la base de datos: " . $e->getMessage());
}
?>
