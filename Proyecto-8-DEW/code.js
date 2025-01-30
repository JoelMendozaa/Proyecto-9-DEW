const patterns = {
    nombre: /^[A-Z][a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/i, 
    apellidos: /^[A-Z][a-záéíóúÁÉÍÓÚÑñ]+$/i,
    dni: /^[A-Z0-9]{1,8}[A-Z]$/i,
    fechaNacimiento: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    codigoPostal: /^\d{5}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telFijo: /^\d{9}$/,
    telMovil: /^(\+34|34)?\d{9}$/,
    iban: /^[A-Z]{2}\d{2}[A-Z0-9]{4,24}$/,
    tarjetaCredito: /^(?:\d{4}[- ]?){3}\d{4}$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{12,}$/,
    confirmarPassword: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{12,}$/
};

$(document).ready(function() {
    const form = $('.form');

    // Eventos para los botones
    $('#cargarJson').on('click', obtenerDatosJson);
    $('#pubPhp').on('click', publicarPhp);
    $('#cargarPhp').on('click', obtenerDatosPhp);
    $('#pubBbdd').on('click', publicarBbdd);
    $('#cargarBbdd').on('click', obtenerBbdd);

    // Validación de campos en tiempo real
    form.find('input').on('input', function() {
        if (this.checkValidity()) {
            $(this).removeClass('invalid').addClass('valid');
        } else {
            $(this).removeClass('valid').addClass('invalid');
        }
    });
});

function validate(field, regex) {
    if (regex.test(field.value)) {
        $(field).removeClass('invalid').addClass('valid');
    } else {
        $(field).removeClass('valid').addClass('invalid');
    }
}

// Función para rellenar el formulario con los datos
function rellenarFormulario(data) {
    $('input').each(function() {
        const fieldName = $(this).attr('name');
        if (data[fieldName]) {
            $(this).val(data[fieldName]);
        }
    });
}

function obtenerDatosJson() {
    $.getJSON('http://192.168.1.117/proyecto9dew/Proyecto-8-DEW/usuario.json', function(data) {
        // Asignar valores dinámicamente y validar
        $('#nombre').val(data.nombre || '');
        $('#apellido').val(data.apellidos || '');
        $('#dni').val(data.dni || '');
        $('#nacimiento').val(data.fecha || '');
        $('#cp').val(data.cp || '');
        $('#email').val(data.correo || '');
        $('#fijo').val(data.fijo || '');
        $('#movil').val(data.movil || '');
        $('#iban').val(data.iban || '');
        $('#tarjeta').val(data.tarjeta || '');
        $('#passwd').val(data.contrasena || '');
        $('#confirmar').val(data.contrasena || '');

        // Validar campos
        validate($('#nombre')[0], patterns.nombre);
        validate($('#apellido')[0], patterns.apellidos);
        validate($('#dni')[0], patterns.dni);
        validate($('#nacimiento')[0], patterns.fechaNacimiento);
        validate($('#cp')[0], patterns.codigoPostal);
        validate($('#email')[0], patterns.email);
        validate($('#fijo')[0], patterns.telFijo);
        validate($('#movil')[0], patterns.telMovil);
        validate($('#iban')[0], patterns.iban);
        validate($('#tarjeta')[0], patterns.tarjetaCredito);
        validate($('#passwd')[0], patterns.password);
        validate($('#confirmar')[0], patterns.confirmarPassword);
    }).fail(function(error) {
        console.error('Error al cargar el JSON: ', error);
        alert("Hubo un error al cargar los datos desde el archivo JSON.");
    });
}

// Función para publicar los datos (POST)
function publicarPhp() {
    const formData = {};
    $('.form').find('input').each(function() {
        formData[$(this).attr('name')] = $(this).val();
    });

    $.ajax({
        url: 'http://192.168.1.117/proyecto9dew.com/Proyecto-8-DEW/publicar_php.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(data) {
            console.log('Respuesta servidor: ', data);
            if (data.message === "Datos guardados correctamente") {
                // Limpiar y ocultar el formulario
                $('.form').find('input').val('');
                $('.form').hide();

                // Esperar 2 segundos antes de recargar los datos
                setTimeout(() => {
                    obtenerDatosPhp();
                }, 2000);
            } else {
                alert("Error al guardar los datos: " + data.error);
            }
        },
        error: function(error) {
            console.error('Error: ', error);
            alert("Hubo un error al enviar los datos.");
        }
    });
}

// Función para obtener los datos guardados (GET)
function obtenerDatosPhp() {
    $.ajax({
        url: 'http://192.168.1.117/proyecto9dew.com/Proyecto-8-DEW/get_php.php',
        method: 'GET',
        success: function(data) {
            if (data.message === "Datos recuperados correctamente") {
                const userData = data.data;
                $('#nombre').val(userData.nombre || '');
                $('#apellido').val(userData.apellido || '');
                $('#dni').val(userData.dni || '');
                $('#nacimiento').val(userData.fechaNacimiento || '');
                $('#cp').val(userData.codigoPostal || '');
                $('#email').val(userData.email || '');
                $('#fijo').val(userData.telFijo || '');
                $('#movil').val(userData.telMovil || '');
                $('#iban').val(userData.iban || '');
                $('#tarjeta').val(userData.tarjetaCredito || '');
                $('#passwd').val(userData.password || '');
                $('#confirmar').val(userData.password || '');

                // Validar campos
                validate($('#nombre')[0], patterns.nombre);
                validate($('#apellido')[0], patterns.apellidos);
                validate($('#dni')[0], patterns.dni);
                validate($('#nacimiento')[0], patterns.fechaNacimiento);
                validate($('#cp')[0], patterns.codigoPostal);
                validate($('#email')[0], patterns.email);
                validate($('#fijo')[0], patterns.telFijo);
                validate($('#movil')[0], patterns.telMovil);
                validate($('#iban')[0], patterns.iban);
                validate($('#tarjeta')[0], patterns.tarjetaCredito);
                validate($('#passwd')[0], patterns.password);
                validate($('#confirmar')[0], patterns.confirmarPassword);
            } else {
                console.error('No se encontraron datos guardados');
                alert("No se encontraron datos guardados en PHP.");
            }
        },
        error: function(error) {
            console.error('Error al cargar datos desde PHP: ', error);
            alert("Hubo un error al cargar los datos desde PHP.");
        }
    });
}

function publicarBbdd() {
    const formData = {};
    $('.form').find('input').each(function() {
        formData[$(this).attr('name')] = $(this).val();
    });

    $.ajax({
        url: 'http://192.168.1.117/proyecto9dew.com/Proyecto-8-DEW/publicar_mysql.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(data) {
            console.log('Respuesta del servidor: ', data);
            if (data.mensaje === "Los datos se han guardado correctamente en la base de datos") {
                $('.form').find('input').val('');
            } else {
                alert("Hubo un error al guardar los datos: " + data.error);
            }
        },
        error: function(error) {
            console.error('Error: ', error);
            alert("Hubo un error al enviar los datos.");
        }
    });
}

// Función para obtener los datos desde la base de datos (GET)
function obtenerBbdd() {
    const dni = $('#dni').val();
    if (!dni) {
        alert("Por favor, ingresa un DNI para recuperar los datos.");
        return;
    }

    $.ajax({
        url: `http://192.168.1.117/proyecto9dew.com/Proyecto-8-DEW/obtener_mysql.php?dni=${dni}`,
        method: 'GET',
        success: function(data) {
            console.log('Datos recibidos:', data);
            if (data.success === false) {
                alert("No se encontraron datos para el DNI proporcionado.");
            } else {
                const userData = data.data;
                $('#nombre').val(userData.nombre || '');
                $('#apellido').val(userData.apellidos || '');
                $('#dni').val(userData.dni || '');
                $('#nacimiento').val(userData.fechaNacimiento || '');
                $('#cp').val(userData.cp || '');
                $('#email').val(userData.email || '');
                $('#fijo').val(userData.telFijo || '');
                $('#movil').val(userData.telMovil || '');
                $('#iban').val(userData.iban || '');
                $('#tarjeta').val(userData.tarjeta || '');
                $('#passwd').val(userData.contrasena || '');
                $('#confirmar').val(userData.contrasena || '');

                // Validar campos
                validate($('#nombre')[0], patterns.nombre);
                validate($('#apellido')[0], patterns.apellidos);
                validate($('#dni')[0], patterns.dni);
                validate($('#nacimiento')[0], patterns.fechaNacimiento);
                validate($('#cp')[0], patterns.codigoPostal);
                validate($('#email')[0], patterns.email);
                validate($('#fijo')[0], patterns.telFijo);
                validate($('#movil')[0], patterns.telMovil);
                validate($('#iban')[0], patterns.iban);
                validate($('#tarjeta')[0], patterns.tarjetaCredito);
                validate($('#passwd')[0], patterns.password);
                validate($('#confirmar')[0], patterns.confirmarPassword);
            }
        },
        error: function(error) {
            console.error('Error al cargar datos desde la base de datos: ', error);
            alert("Hubo un error al cargar los datos desde la base de datos.");
        }
    });
}