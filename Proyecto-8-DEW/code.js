$(document).ready(function () {
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

    // Eventos para los botones
    $('#cargarJson').on('click', obtenerDatosJson);
    $('#pubPhp').on('click', publicarPhp);
    $('#cargarPhp').on('click', obtenerDatosPhp);
    $('#pubBbdd').on('click', publicarBbdd);
    $('#cargarBbdd').on('click', obtenerBbdd);

    // Validación de campos en tiempo real
    $('.form input').on('input', function () {
        const pattern = patterns[$(this).attr('name')];
        if (pattern && pattern.test($(this).val())) {
            $(this).removeClass('invalid').addClass('valid');
        } else {
            $(this).removeClass('valid').addClass('invalid');
        }
    });

    function validate(field, regex) {
        if (regex.test($(field).val())) {
            $(field).removeClass('invalid').addClass('valid');
        } else {
            $(field).removeClass('valid').addClass('invalid');
        }
    }

    // Función para rellenar el formulario con los datos
    function rellenarFormulario(data) {
        $('.form input').each(function () {
            const fieldName = $(this).attr('name');
            if (data[fieldName]) {
                $(this).val(data[fieldName]);
                const pattern = patterns[fieldName];
                if (pattern) validate(this, pattern);
            }
        });
    }

    function obtenerDatosJson() {
        $.getJSON('usuario.json')
            .done(function (data) {
                rellenarFormulario(data);
            })
            .fail(function (error) {
                console.error('Error: ', error);
            });
    }

    function publicarPhp() {
        const formData = $('.form').serialize();

        $.post('http://zonzamas.lan/publicar_php.php', formData)
            .done(function (response) {
                console.log('Respuesta servidor: ', response);
                if (response.message === "Datos guardados correctamente") {
                    $('.form input').val('');
                    $('.form').hide();

                    setTimeout(() => {
                        obtenerDatosPhp();
                    }, 2000);
                }
            })
            .fail(function (error) {
                console.error('Error: ', error);
            });
    }

    function obtenerDatosPhp() {
        $.get('http://zonzamas.lan/get_php.php')
            .done(function (data) {
                if (data.message === "Datos recuperados correctamente") {
                    rellenarFormulario(data.data);
                } else {
                    console.error('No se encontraron datos guardados');
                }
            })
            .fail(function (error) {
                console.error('Error: ', error);
            });
    }

    function publicarBbdd() {
        const formData = $('.form').serialize();

        $.post('http://zonzamas.lan/publicar_mysql.php', formData)
            .done(function (response) {
                console.log('Respuesta del servidor: ', response);
                try {
                    const data = JSON.parse(response);
                    if (data.mensaje === "Los datos se han guardado correctamente en la base de datos") {
                        $('.form input').val('');
                    } else {
                        alert("Hubo un error al guardar los datos: " + data.error);
                    }
                } catch (e) {
                    throw new Error('La respuesta no es un JSON válido');
                }
            })
            .fail(function (error) {
                console.error('Error: ', error);
            });
    }

    function obtenerBbdd() {
        const dni = $('#dni').val();
        if (!dni) {
            alert("Por favor, ingresa un DNI para recuperar los datos.");
            return;
        }

        $.get(`http://zonzamas.lan/obtener_mysql.php?dni=${dni}`)
            .done(function (data) {
                if (data.success === false) {
                    alert("No se encontraron datos para el DNI proporcionado.");
                } else {
                    rellenarFormulario(data.data);
                }
            })
            .fail(function (error) {
                console.error('Error: ', error);
                alert("Hubo un error al cargar los datos desde la base de datos.");
            });
    }
});
