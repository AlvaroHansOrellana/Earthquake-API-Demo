let resultados;
let titulo;
let fecha;
let ubicacion;
let codigo;
let magnitud;
let fechaConvertida;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);
        let datos = `<h1>Aquí estás!</h1>
        <p>Lat: ${position.coords.latitude.toFixed(4)}</p>
        <p>Long: ${position.coords.longitude.toFixed(4)}</p>`
        document.body.innerHTML = datos;
    });
} else {
    console.warn("Tu navegador no soporta Geolocalización!! ");
};

const mapa = async () => {
    let response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
    const data = await response.json();
    resultados = data.features;
    titulo = resultados.map(feature => feature.properties.title);
    fecha = resultados.map(feature => feature.properties.time);
    // fechaConvertida = fecha.Date.parse();????¿¿¿¿¿¿
    ubicacion = resultados.map(feature => feature.geometry.coordinates) 
    codigo = resultados.map(feature => feature.properties.code);
    magnitud = resultados.map(feature => feature.properties.mag);

    return { resultados, titulo, fecha, ubicacion, codigo, magnitud };

};

mapa();

// Clase para crear iconos
let LeafIcon = L.Icon.extend({
    options: {
        iconSize: [20, 20],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

// Creación de iconos
let icon0 = new LeafIcon({ iconUrl: '/assets/0.png' });
let icon1 = new LeafIcon({ iconUrl: '/assets/1.png' });
let icon2 = new LeafIcon({ iconUrl: '/assets/2.png' });
let icon3 = new LeafIcon({ iconUrl: '/assets/3.png' });
let icon4 = new LeafIcon({ iconUrl: '/assets/4.png' });
let icon5 = new LeafIcon({ iconUrl: '/assets/5.png' });
let icon6 = new LeafIcon({ iconUrl: '/assets/6.png' });
let icon7 = new LeafIcon({ iconUrl: '/assets/7.png' });

let varIcon;


// Pintar en el DOM
async function injectMap() {
    await mapa();
    for (let i = 0; i < ubicacion.length; i++) {

        magnitud[i] > 0 && magnitud[i] < 1 ? varIcon = icon0 : "";
        magnitud[i] > 1 && magnitud[i] < 2 ? varIcon = icon1 : "";
        magnitud[i] > 2 && magnitud[i] < 3 ? varIcon = icon2 : "";
        magnitud[i] > 3 && magnitud[i] < 4 ? varIcon = icon3 : "";
        magnitud[i] > 4 && magnitud[i] < 5 ? varIcon = icon4 : "";
        magnitud[i] > 5 && magnitud[i] < 6 ? varIcon = icon5 : "";
        magnitud[i] > 6 && magnitud[i] < 7 ? varIcon = icon6 : "";
        magnitud[i] > 7 && magnitud[i] < 8 ? varIcon = icon7 : "";
        const terremotos = L.marker([ubicacion[i][1], ubicacion[i][0]], {icon:varIcon}).addTo(map);
        let popupContent = `<p><strong>Título</strong><br/>${titulo[i]}</p>
                        <p><strong>Ubicación</strong><br/>${ubicacion[i]}</p>
                        <p><strong>Código</strong><br/>${codigo[i]}</p>
                        <p><strong>Magnitud en escala Richter</strong><br/>${magnitud[i]}</p>`
        terremotos.bindPopup(popupContent).openPopup();
    }
}

    injectMap();


    //Crear un mapa en el div con id "map"
    var map = L.map('map').setView([50.0343700, 19.2103700], 1);


    //Agregar capa de OpenStreetMap
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    //Para capa personalizada, se puede usar la libreria leaflet-providers, comentar antes la capa de OpenStreetMap
    L.tileLayer.provider('Esri.WorldImagery').addTo(map);


    //Agregar marcador
    // const marker = L.marker([51.5, -0.09]).addTo(map);

    // Agregar marcador v2
    // const marker = L.marker([51.5, -0.09])
    //     .bindPopup("<b>Hello world!</b><br>I am a popup.")
    //     .openPopup()
    //     .addTo(map);


    //Agregar popup
    // const popup = L.popup()
    //     .setLatLng([51.513, -0.09])
    //     .setContent("I am a standalone popup.")
    //     .openOn(map);
    

