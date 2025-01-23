<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger los datos del formulario (por ejemplo, 'nombre', 'apellido', etc.)
    $_SESSION['datos'] = [
        $nombre = $_POST['nombre'] ?? '',
        $apellido = $_POST['apellidos'] ?? '',
        $dni = $_POST['dni'] ?? '',
        $fechaNacimiento = $_POST['fechaNacimiento'] ?? '',
        $codigoPostal = $_POST['codigoPostal'] ?? '',
        $email = $_POST['email'] ?? '',
        $telFijo = $_POST['telFijo'] ?? '',
        $telMovil = $_POST['telMovil'] ?? '',
        $iban = $_POST['iban'] ?? '',
        $tarjetaCredito = $_POST['tarjetaCredito'] ?? '',
        $password = $_POST['password'] ?? '',
        $confirmar = $_POST['password'] ??'',
    ];
    // Convertir el array PHP a JSON y devolverlo como respuesta
    echo json_encode(["message" => "Datos guardos correctamente"]);
} elseif($_SERVER['REQUEST_METHOD'] == 'GET') {
    $datos = $_SESSION['datos'] ?? [];
    echo json_encode(['message'=> 'datos']);
}
