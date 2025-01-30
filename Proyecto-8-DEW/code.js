$(document).ready(function() {
    const patterns = {
        nombre: /^[A-Z][a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/i, 
        apellido: /^[A-Z][a-záéíóúÁÉÍÓÚÑñ]+$/i,
        dni: /^[A-Z0-9]{1,8}[A-Z]$/i,
        anioPublicacion: /^(19|20)\d{2}$/, // Año de publicación válido (1900-2099)
        codigoPostal: /^\d{5}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        telFijo: /^\d{9}$/,
        telMovil: /^(\+34|34)?\d{9}$/,
        isbn: /^(97(8|9))?\d{9}(\d|X)$/, // ISBN válido
        password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{12,}$/,
        confirmarPassword: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{12,}$/
    };

    // Manejo de eventos de botones
    $('#cargarJson').click(obtenerDatosJson);
    $('#pubPhp').click(publicarPhp);
    $('#cargarPhp').click(obtenerDatosPhp);
    $('#pubBbdd').click(publicarBbdd);
    $('#cargarBbdd').click(obtenerBbdd);

    // Validación de campos en tiempo real
    $('.form input').on('input', function() {
        const fieldName = $(this).attr('name');
        const regex = patterns[fieldName];

        if (regex) {
            validar($(this), regex);
        }

        if (fieldName === "confirmarPassword" || fieldName === "password") {
            validarContrasenaRepetida();
        }
    });

    function validar(field, regex) {
        if (regex.test(field.val())) {
            field.removeClass('invalid').addClass('valid');
        } else {
            field.removeClass('valid').addClass('invalid');
        }
    }

    function validarContrasenaRepetida() {
        const password = $('input[name="password"]');
        const repeatedPassword = $('input[name="confirmarPassword"]');

        if (password.val() === repeatedPassword.val() && patterns.password.test(password.val())) {
            repeatedPassword.removeClass('invalid').addClass('valid');
        } else {
            repeatedPassword.removeClass('valid').addClass('invalid');
        }
    }

    function rellenarFormulario(data) {
        $('input').each(function() {
            const fieldName = $(this).attr('name');
            if (data[fieldName]) {
                $(this).val(data[fieldName]);
            }
        });
    }

    function obtenerDatosJson() {
        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/datos.json',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                const fields = {
                    nombre: data.nombre,
                    apellido: data.apellido,
                    dni: data.dni,
                    anioPublicacion: data.anioPublicacion,
                    codigoPostal: data.cp,
                    email: data.correo,
                    telFijo: data.fijo,
                    telMovil: data.movil,
                    isbn: data.isbn,
                    password: data.contrasena,
                    confirmarPassword: data.contrasena
                };

                $.each(fields, function(key, value) {
                    $('#' + key).val(value);
                    validar($('#' + key), patterns[key]);
                });
            },
            error: function(error) {
                console.error('Error al cargar datos JSON: ', error);
            }
        });
    }

    function publicarPhp() {
        const formData = new FormData($('.form')[0]);

        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/publicar_php.php',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                if (data.message === "Datos guardados correctamente") {
                    $('.form input').val('');
                    setTimeout(function() {
                        obtenerDatosPhp();
                    }, 2000);
                }
            },
            error: function(error) {
                console.error('Error al publicar PHP: ', error);
            }
        });
    }

    function obtenerDatosPhp() {
        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/get_php.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.message === "Datos recuperados correctamente") {
                    rellenarFormulario(data.data);
                } else {
                    console.error('No se encontraron datos');
                }
            },
            error: function(error) {
                console.error('Error al cargar datos PHP: ', error);
            }
        });
    }

    function publicarBbdd() {
        const formData = new FormData($('.form')[0]);

        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/publicar_mysql.php',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                try {
                    const data = JSON.parse(response);
                    if (data.mensaje === "Los datos se han guardado correctamente en la base de datos") {
                        $('.form input').val('');
                    } else {
                        alert("Hubo un error al guardar los datos: " + data.error);
                    }
                } catch (e) {
                    console.error('Error al procesar la respuesta MySQL: ', e);
                }
            },
            error: function(error) {
                console.error('Error al publicar MySQL: ', error);
            }
        });
    }

    function obtenerBbdd() {
        const dni = $('#dni').val();
        if (!dni) {
            alert("Por favor, ingresa un DNI para recuperar los datos.");
            return;
        }

        $.ajax({
            url: `http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/obtener_mysql.php?dni=${dni}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.success === false) {
                    alert("No se encontraron datos para el DNI proporcionado.");
                } else {
                    rellenarFormulario(data.data);
                }
            },
            error: function(error) {
                console.error('Error al cargar datos desde la base de datos: ', error);
                alert("Hubo un error al cargar los datos.");
            }
        });
    }
});
