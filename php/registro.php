<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cedula = $_POST['cedula'];
    $correo = $_POST['correo'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_BCRYPT); // Encriptar contraseña
    $rol = $_POST['rol'];

    try {
        $sql = "INSERT INTO usuarios (id_usuario, nombre, correo, contraseña, rol) VALUES (:cedula, :cedula, :correo, :contrasena, :rol)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':cedula' => $cedula,
            ':correo' => $correo,
            ':contrasena' => $contrasena,
            ':rol' => $rol,
        ]);
        echo json_encode(['success' => true, 'message' => 'Cuenta creada exitosamente.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al registrar usuario: ' . $e->getMessage()]);
    }
}
?>
