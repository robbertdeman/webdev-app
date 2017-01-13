class DarkSkyAPI {
    constructor(position, callback) {
        this.lat = position.lat;
        this.lng = position.lng;
        this.callback = callback;
        this.callAPI();
    }
    callAPI() {
        this.darkSkyURL = "/weerapp/proxy.php/?url=" + this.lat + ","+ this.lng;
        this.xhttp = new XMLHttpRequest();
        this.xhttp.onreadystatechange = ()=> {
            if (this.xhttp.readyState == 4 && this.xhttp.status == 200) {
                this.response(JSON.parse(this.xhttp.responseText));
            }
        };
        this.xhttp.open("GET", this.darkSkyURL, true);
        this.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xhttp.send();
    }
    response(data) {
        this.jsonData = data;
        // de callback alleen uitvoeren als er één is meegegeven
        if (this.callback) this.callback();
    }
    get weatherData() {
        return {weather: this.jsonData};
    }
}
module.exports = DarkSkyAPI;