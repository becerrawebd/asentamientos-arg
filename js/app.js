const map = new Mapa();
const formulario = document.querySelector('#form');
const divMapa = document.querySelector('#map');


eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', cargarAsentamientos)
}

function cargarAsentamientos(evt) {
    evt.preventDefault();
    let idProvincia = evt.target.elements[0].options[evt.target.elements[0].selectedIndex].value
    if (idProvincia != 0) {
        solicitarAsentamientosDe(idProvincia)
    } else {
        alert('Debe seleccionar una provincia')
    }
}

function solicitarAsentamientosDe(idProvincia) {
    let query = `https://apis.datos.gob.ar/georef/api/asentamientos?provincia=${idProvincia}&max=1000`
    fetch(query)
        .then(res => res.json())
        .then(data => cargarMapa(data))
        .catch(error => alert(error))
}

function cargarMapa(data){
    data.asentamientos.forEach(asentamiento => {
        let latitud = asentamiento.centroide.lat
        let longitud = asentamiento.centroide.lon
        L.marker([`${latitud}`, `${longitud}`]).addTo(map.mapa)
            .bindPopup(`${asentamiento.nombre}`)
    });
    console.log(data.total)
}

