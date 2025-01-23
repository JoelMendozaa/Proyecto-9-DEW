<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type");

    session_start();

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Datos estáticos adicionales
        $datosEstaticos = [
            "nombre" => "Teresa",
            "apellido" => "Miraflores Gil", 
            "dni" => "75677256E", 
            "fechaNacimiento" => "27/05/2003", 
            "codigoPostal" => "35000", 
            "email"  => "lateregil@gmail.com",
            "telFijo" => "928564783",
            "telMovil" => "653687458",  
            "tarjetaCredito" => "8975321475865452", 
            "iban" => "ES7568741235698521456890", 
            "password" => "Tere1234567890*",
            "repeatPassword"  => "Tere1234567890*"
        ];

        // Respuesta con mensaje y datos
        $response = [
            "message" => "Datos recuperados correctamente",
            "data" => $datosEstaticos
        ];

        echo json_encode($response);
    } else {
        echo json_encode(["error" => "Método no permitido"]);
    }

