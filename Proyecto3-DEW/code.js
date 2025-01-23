function Avion(name, rows, columns, priceBase) {
    this.name = name;
    this.rows = rows;
    this.columns = columns;
    this.priceBase = priceBase;
    this.asientosOcupados = [];
}

// Aviones definidos
const binter = new Avion("Binter", 20, 6, 120);
const iberiaExpress = new Avion("Iberia", 25, 6, 100);
const vueling = new Avion("Vueling", 15, 4, 140);

// LocalStorage para guardar aviones
function storageLocal() {
    if (!localStorage.getItem("aviones")) {
        const aviones = [binter, iberiaExpress, vueling];
        localStorage.setItem("aviones", JSON.stringify(aviones));
    }
}

// Cargar los asientos ocupados desde sessionStorage
function cargarAsientosOcupados(avion) {
    const asientosGuardados = sessionStorage.getItem(avion.name);
    if (asientosGuardados) {
        avion.asientosOcupados = asientosGuardados.split(',');
    }
}

// Guardar los asientos seleccionados en sessionStorage
function storageSession(avion, asientoId) {
    avion.asientosOcupados.push(asientoId);
    sessionStorage.setItem(avion.name, avion.asientosOcupados.join(','));
}

function asientos(avion) {
    const $container = $('#seat-container');
    $container.empty();

    const $table = $('<table></table>');

    for (let fila = 0; fila < avion.rows; fila++) {
        const $row = $('<tr></tr>');
        $row.addClass(fila <= 3 ? 'fila-naranja' : 'fila-azul');
        
        for (let columna = 0; columna < avion.columns; columna++) {
            const asientoId = `asiento-${fila + 1}-${columna + 1}`;
            const $button = $('<button></button>');
            $button.attr('id', asientoId)
                .addClass('seat')
                .text(`${fila + 1}-${columna + 1}`);

            $button.css('background-color', Math.random() < 0.5 ? 'green' : 'red');

            $button.on('click', function () {
                if ($button.css('background-color') === 'rgb(0, 128, 0)') {
                    $button.css('background-color', 'red');
                    storageSession(avion, asientoId);
                } else {
                    console.log("No se puede, ya está ocupado");
                }
                actualizarPrecio(avion);
            });

            const $cell = $('<td></td>').append($button);
            $row.append($cell);
        }

        $table.append($row);
    }

    $container.append($table);

    cargarAsientosOcupados(avion);
    marcarAsientosOcupados(avion);
    actualizarPrecio(avion);
}

// Marcar asientos ocupados visualmente en el DOM
function marcarAsientosOcupados(avion) {
    avion.asientosOcupados.forEach(asientoId => {
        const $asiento = $(`#${asientoId}`);
        if ($asiento.length) {
            $asiento.css('background-color', 'red');
        }
    });
}

// Calcular el precio total basado en los asientos ocupados
function actualizarPrecio(avion) {
    const precioTotal = avion.asientosOcupados.length * avion.priceBase;
    $('#precioTotal').text(`Precio Total: €${precioTotal}`);
}

// Inicialización
$(document).ready(function() {
    storageLocal();
});