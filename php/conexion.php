<?php
$host = 'localhost';
$dbname = 'tyche'; // Nombre de tu base de datos
$user = 'root'; // Usuario de XAMPP (por defecto es 'root')
$password = ''; // Contraseña de XAMPP (deja vacío si no configuraste una)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error al conectar con la base de datos: " . $e->getMessage());
}
?>
