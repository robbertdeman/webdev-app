const GoogleMaps = require("./GoogleMapsAPI.es6");
const DarkSkyAPI = require("./DarkSkyAPI.es6");
const WeatherView = require("./WeatherView.es6");

class Controller {
    constructor() {
        // bind de watch functie aan deze class zodat "this." variabelen uit deze class toegankelijk blijven
        this.watch = this.watch.bind(this);

        this.googleMaps = new GoogleMaps();
        this.darkSkyAPI = new DarkSkyAPI(this.googleMaps.latLng, this.watch );
        this.weatherView = new WeatherView();
    }
    watch() {
        console.log(this);
        this.googleMaps.map.addListener('bounds_changed', () => {
            this.googleMaps.changeBounds();
        });
        this.googleMaps.searchBox.addListener('places_changed', () => {
            this.googleMaps.changeMarker();
            this.darkSkyAPI = new DarkSkyAPI(this.googleMaps.latLng);
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    new Controller();
});