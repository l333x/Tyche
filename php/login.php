<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    try {
        $sql = "SELECT * FROM usuarios WHERE correo = :correo";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':correo' => $correo]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($contrasena, $usuario['contraseña'])) {
            echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.', 'rol' => $usuario['rol']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al iniciar sesión: ' . $e->getMessage()]);
    }
}
?>
