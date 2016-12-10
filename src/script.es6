const GoogleMaps = require("./GoogleMapsAPI.es6");
const DarkSkyAPI = require("./DarkSkyAPI.es6");
const WeatherView = require("./WeatherView.es6");

class Controller {
    constructor() {
        this.googleMaps = new GoogleMaps();
        this.darkSkyAPI = new DarkSkyAPI(this.googleMaps.latLng, this.watch());
        this.weatherView = new WeatherView();
    }
    watch() {
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