<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recibir los datos como JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Almacenar los datos en la sesión
    $_SESSION['datos'] = [
        'nombre' => $data['nombre'] ?? '',
        'apellidos' => $data['apellidos'] ?? '',
        'dni' => $data['dni'] ?? '',
        'fechaNacimiento' => $data['fechaNacimiento'] ?? '',
        'codigoPostal' => $data['codigoPostal'] ?? '',
        'email' => $data['email'] ?? '',
        'telFijo' => $data['telFijo'] ?? '',
        'telMovil' => $data['telMovil'] ?? '',
        'iban' => $data['iban'] ?? '',
        'tarjetaCredito' => $data['tarjetaCredito'] ?? '',
        'password' => $data['password'] ?? '',
        'confirmarPassword' => $data['confirmarPassword'] ?? ''
    ];

    // Respuesta de éxito
    echo json_encode(["message" => "Datos guardados correctamente"]);
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Devolver los datos almacenados en la sesión
    $datos = $_SESSION['datos'] ?? [];
    echo json_encode(['message' => 'Datos recuperados correctamente', 'data' => $datos]);
}