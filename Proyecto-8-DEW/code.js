$(document).ready(function() {
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

    function validate(field, regex) {
        if (regex.test(field.value)) {
            $(field).addClass('valid').removeClass('invalid');
        } else {
            $(field).addClass('invalid').removeClass('valid');
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
        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/usuario.json',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                const fields = {
                    nombre: $('#nombre').val(data.nombre),
                    apellidos: $('#apellido').val(data.apellidos),
                    dni: $('#dni').val(data.dni),
                    fechaNacimiento: $('#nacimiento').val(data.fecha),
                    codigoPostal: $('#cp').val(data.cp),
                    email: $('#email').val(data.correo),
                    telFijo: $('#fijo').val(data.fijo),
                    telMovil: $('#movil').val(data.movil),
                    iban: $('#iban').val(data.iban),
                    tarjetaCredito: $('#tarjeta').val(data.tarjeta),
                    password: $('#passwd').val(data.contrasena),
                    confirmarPassword: $('#confirmar').val(data.contrasena),
                };

                // Asignar valores dinámicamente y validar
                $.each(fields, function(key, field) {
                    if (patterns.hasOwnProperty(key)) {
                        field.val(data[key] || ''); // Asignar valor desde JSON o vacío si no existe
                        validate(field[0], patterns[key]); // Validar campo con su expresión regular
                    }
                });
            },
            error: function(error) {
                console.error('error: ', error);
            }
        });
    }

    // Función para publicar los datos (POST)
    function publicarPhp() {
        const formData = form.serialize();

        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/publicar_php.php',
            method: 'POST',
            data: formData,
            success: function(data) {
                console.log('Respuesta servidor: ', data);

                if (data.message === "Datos guardados correctamente") {
                    // Limpiar y ocultar el formulario
                    form.find('input').val('');
                    form.hide();

                    // Esperar 2 segundos antes de recargar los datos
                    setTimeout(function() {
                        // Solicitar datos al servidor
                        $.ajax({
                            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/get_php.php',
                            method: 'GET',
                            dataType: 'json',
                            success: function(data) {
                                if (data.message === "Datos recuperados correctamente") {
                                    const userData = data.data;

                                    // Poblar el formulario con los datos recibidos
                                    $('#nombre').val(userData.nombre || '');
                                    $('#apellido').val(userData.apellido || '');
                                    $('#dni').val(userData.dni || '');
                                    $('#nacimiento').val(userData.fechaNacimiento || '');
                                    $('#cp').val(userData.codigoPostal || '');
                                    $('#email').val(userData.email || '');
                                    $('#fijo').val(userData.telefonoFijo || '');
                                    $('#movil').val(userData.telefonoMovil || '');
                                    $('#iban').val(userData.iban || '');
                                    $('#tarjeta').val(userData.tarjetaCredito || '');
                                    $('#passwd').val(userData.password || '');
                                    $('#confirmar').val(userData.password || '');
                                } else {
                                    console.error('No se encontraron datos guardados');
                                }
                            },
                            error: function(error) {
                                console.error('Error al cargar datos: ', error);
                            }
                        });
                    }, 2000); // Esperar 2 segundos
                }
            },
            error: function(error) {
                console.error('Error: ', error);
            }
        });
    }

    // Función para obtener los datos guardados (GET)
    function obtenerDatosPhp() {
        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/get_php.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.message === "Datos recuperados correctamente") {
                    // Poblar el formulario con los datos recibidos
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
                } else {
                    console.error('No se encontraron datos guardados');
                }
            },
            error: function(error) {
                console.error('Error al cargar datos: ', error);
            }
        });
    }

    function publicarBbdd() {
        const formData = form.serialize();

        $.ajax({
            url: 'http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/publicar_mysql.php',
            method: 'POST',
            data: formData,
            success: function(text) {
                console.log('Respuesta del servidor: ', text);
                try {
                    const data = JSON.parse(text);
                    console.log('Datos procesados: ', data);
                    if (data.mensaje === "Los datos se han guardado correctamente en la base de datos") {
                        form.find('input').val('');
                    } else {
                        alert("Hubo un error al guardar los datos: " + data.error);
                    }
                } catch (e) {
                    console.error('La respuesta no es un JSON válido');
                }
            },
            error: function(error) {
                console.error('Error: ', error);
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
            url: `http://192.168.216.110/proyecto9dew/Proyecto-8-DEW/obtener_mysql.php?dni=${dni}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log('Datos recibidos:', data); // LOG
                if (data.success === false) {
                    alert("No se encontraron datos para el DNI proporcionado.");
                } else {
                    console.log('Datos del usuario:', data.data);
                    $('#nombre').val(data.data.nombre || '');
                    $('#apellido').val(data.data.apellidos || '');
                    $('#dni').val(data.data.dni || '');
                    $('#nacimiento').val(data.data.fechaNacimiento || '');
                    $('#cp').val(data.data.cp || '');
                    $('#email').val(data.data.email || '');
                    $('#fijo').val(data.data.telFijo || '');
                    $('#movil').val(data.data.telMovil || '');
                    $('#iban').val(data.data.iban || '');
                    $('#tarjeta').val(data.data.tarjeta || ''); 
                    $('#passwd').val(data.data.contrasena || ''); 
                    $('#confirmar').val(data.data.contrasena || '');
                }
            },
            error: function(error) {
                console.error('Error al cargar datos: ', error);
                alert("Hubo un error al cargar los datos desde la base de datos.");
            }
        });
    }
});