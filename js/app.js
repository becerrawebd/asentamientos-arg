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

let markerList = []

function cargarMapa(data) {
    clearMarkerList()
    if (data.total != 0) {
        let { lat, lon } = data.asentamientos[0].centroide
        map.mapa.setView([lat, lon], 6)
        data.asentamientos.forEach(asentamiento => {
            let { lat, lon } = asentamiento.centroide
            let marker = L.marker([lat,lon]).addTo(map.mapa)
                .bindPopup(`${asentamiento.nombre}`)
            markerList.push(marker)
        });
    } else {
        alert('No hay datos de la provincia seleccionada')
    }    
}

function clearMarkerList(){
    markerList.forEach(marker => marker.remove())
    markerList = []
}

