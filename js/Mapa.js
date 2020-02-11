class Mapa {
    constructor() {
        this.mapa = this.inicializarMapa();
    }

    inicializarMapa() {
        const map = L.map('map').setView([-38.4160957, -63.6166725], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        return map;
    }
}