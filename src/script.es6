const GoogleMaps = require("./GoogleMapsAPI.es6");
const DarkSkyAPI = require("./DarkSkyAPI.es6");
const WeatherView = require("./WeatherView.es6");
const GeoLocation = require("./GeoLocation.es6");
// const Skycons = require("./skycons.js");

class Controller {
    constructor() {
        // bind de watch functie aan deze class zodat "this." variabelen uit deze class toegankelijk blijven
        this.update = this.update.bind(this);

        this.googleMaps = new GoogleMaps();
        this.weatherView = new WeatherView();
        this.geoLocation = new GeoLocation(this.googleMaps.latLng);
        this.darkSkyAPI = new DarkSkyAPI(this.googleMaps.latLng, this.update);
        this.watch();
    }
    watch() {
        this.googleMaps.map.addListener('bounds_changed', () => {
            this.googleMaps.changeBounds();
        });
        this.googleMaps.searchBox.addListener('places_changed', () => {
            this.googleMaps.changeMarker();
            this.geoLocation = new GeoLocation(this.googleMaps.latLng);
            this.darkSkyAPI = new DarkSkyAPI(this.googleMaps.latLng, this.update);
        });
    }
    update() {
        this.weatherView.divideData(this.darkSkyAPI.weatherData, this.geoLocation.location);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    new Controller();
});