class GeoLocation {
    constructor(location) {
        this.lat = location.lat;
        this.lng = location.lng;
        this.callAPI();
    }
    callAPI() {
        this.googleMapsURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+this.lat+","+this.lng+"&sensor=true"
        this.xhttp = new XMLHttpRequest();
        this.xhttp.onreadystatechange = ()=> {
            if (this.xhttp.readyState == 4 && this.xhttp.status == 200) {
                console.log(this.xhttp.responseText);
                this.response(JSON.parse(this.xhttp.responseText));
            }
        };
        this.xhttp.open("GET", this.googleMapsURL, true);
        this.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xhttp.send();
    }
    response(data) {
        this.place = data["results"][0]["formatted_address"];
    }
    get location() {
        return this.place;
    }
}
module.exports = GeoLocation;