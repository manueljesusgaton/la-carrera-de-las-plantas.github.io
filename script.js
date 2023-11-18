function mostrarDivs() {

    var seleccion = document.getElementById("nplantas").value;
    var plantas = document.getElementsByClassName("plantainv");

    for (var i = 0; i < plantas.length; i++) {
        plantas[i].style.display = "none";
    }

    // Mostrar las primeras plantas según el número seleccionado
    for (var i = 1; i <= seleccion; i++) {
        var plantaSeleccionada = document.getElementById("planta" + i);
        if (plantaSeleccionada) {
            plantaSeleccionada.style.display = "block";
        }
    }
}

function iniciarCrecimiento() {

    var selector = document.getElementById("nplantas");
    if (selector.value !== "") { //con esto eliminamos posibles problemas durante la ejecución

        var plantas = document.getElementsByClassName("plantainv");
        var velocidades = [];

        var replantar = document.getElementById("replantar");
        replantar.disabled = true;
        replantar.style.backgroundColor = "rgb(22, 52, 23)";
        replantar.style.color = "rgb(255, 211, 172)";

        // Variable para realizar un seguimiento de cuántas animaciones han terminado
        var animacionesTerminadas = 0;

        function animacionTerminada() {
            animacionesTerminadas++;

            // Verificar si todas las animaciones han terminado
            if (animacionesTerminadas === plantas.length) {
                // Todas las animaciones han terminado
                replantar.disabled = false;
                replantar.style.backgroundColor = "rgb(255, 211, 172)";
                replantar.style.color = "rgb(22, 52, 23)";

                // Obtener la colección de divs existentes dentro de #podio
                const divs = document.querySelectorAll('#podio > div');

                // Asignar valores y contenido HTML a las plantas
                divs.forEach((div, index) => {
                    const imagenOriginal = div.querySelector('img');
                    div.innerHTML = ''; // Limpiar el contenido existente
                    div.appendChild(imagenOriginal); // Agregar la imagen original
                    div.setAttribute('data-valor', velocidades[index]);
                });

                // Ordenar los divs de mayor a menor según el valor asignado
                const divContainer = document.getElementById('podio');
                const divArray = Array.from(divs);
                divArray.sort((a, b) => {
                    const valorA = parseInt(a.getAttribute('data-valor'));
                    const valorB = parseInt(b.getAttribute('data-valor'));
                    return valorA - valorB;
                });

                // Limpiar el contenedor y agregar los divs ordenados
                divContainer.innerHTML = '';
                divArray.forEach(div => divContainer.appendChild(div));


                var seleccion = document.getElementById("nplantas").value;
                var plantaspodio = document.getElementsByClassName("plantapodio");

                for (var i = 0; i < plantas.length; i++) {
                    plantaspodio[i].style.display = "none";
                }
                // Mostrar las primeras plantas según el número seleccionado
                for (var i = 1; i <= seleccion; i++) {
                    var plantaSeleccionadapodio = document.getElementById("plantapodio" + i);
                    if (plantaSeleccionadapodio) {
                        plantaSeleccionadapodio.style.display = "block";
                    }
                }


            }
        }

        for (var i = 0; i < plantas.length; i++) {
            var velocidad = (Math.floor(Math.random() * 10) + 1) * 1000;
            velocidades.push(velocidad);

            // Utilizar la función de callback para llamar a animacionTerminada al finalizar la animación
            $(plantas[i]).animate({
                marginTop: 0 + 'px',
                height: 400 + 'px'
            }, velocidad, animacionTerminada);
        }


        bloquearSelect();  // Bloquear el select
        ocultarIniciar();  // Ocultar el botón
    }
}

function bloquearSelect() {
    var selector = document.getElementById("nplantas");
    selector.disabled = true;
}
function ocultarIniciar() {
    var iniciar = document.getElementById("iniciar");
    iniciar.style.display = 'none';
}


function replantar() {

    // Obtener todas las plantas visibles
    var plantas = document.getElementsByClassName("plantainv");
    var plantaspodio = document.getElementsByClassName("plantapodio");
    // Recorrer cada planta y establecer una altura margen y vivibilida
    for (var i = 0; i < plantas.length; i++) {

        plantas[i].style.marginTop = '300px';
        plantas[i].style.height = '100px';
        plantas[i].style.display = "none";
        plantaspodio[i].style.display = "none";

    }
    var selector = document.getElementById("nplantas");
    selector.disabled = false;
    selector.value = "";
    var iniciar = document.getElementById("iniciar");
    iniciar.style.display = 'block';

}
