CREATE DATABASE bbdd_joel;
USE bbdd_joel;

CREATE TABLE usuarios (
    dni VARCHAR(9) PRIMARY KEY,
    nombre VARCHAR(255),
    apellidos VARCHAR(255),
    fechaNacimiento VARCHAR(255),
    cp VARCHAR(10),
    email VARCHAR(255),
    telFijo VARCHAR(9),
    telMovil VARCHAR(9),
    tarjeta VARCHAR(255),
    iban VARCHAR(255),
    contrasena VARCHAR(255)
);


INSERT INTO usuarios (dni, nombre, apellidos, fechaNacimiento, cp, email, telFijo, telMovil, tarjeta, iban,contrasena) 
VALUE ('74586920K', 'Sebastian', 'Gallardo Romero', '12/05/1999', '35426', 'sebaga@gmail.com', '928566410', '677158942', 
'5105105105105100', 'ES76123456789012345678901234', 'Sebastian12345');

INSERT INTO usuarios (dni, nombre, apellidos, fechaNacimiento, cp, email, telFijo, telMovil, tarjeta, iban,contrasena) 
VALUE ('74578620E', 'Lia', 'Vallecas Florentina', '21/07/2002', '35532', 'lia29@gmail.com', '928556410', '675658542', 
'5103105125105150', 'ES76123456789012345675601234', 'Lia12345');

INSERT INTO usuarios (dni, nombre, apellidos, fechaNacimiento, cp, email, telFijo, telMovil, tarjeta, iban, contrasena) 
VALUE ('33456789B', 'Carlos', 'González Fernández', '25/08/1995', '28012', 'carlosgonzalez@gmail.com', '917654321', '633429879', 
'6011512345678901', 'ES2121000418450200056789', 'Carlos12345');

INSERT INTO usuarios (dni, nombre, apellidos, fechaNacimiento, cp, email, telFijo, telMovil, tarjeta, iban, contrasena) 
VALUE ('45567892X', 'Ana', 'López Martín', '03/11/1987', '08025', 'analopesmartin@gmail.com', '933875432', '678234911', 
'5105105105105100', 'ES7621000667760200015678', 'Ana2025!');
