const Skycons = require("./skycons.js");

class WeatherView {
    constructor() {
        this.view = document.getElementById('weerinfo');
        this.monthNames = ["jan", "feb", "maa", "apr", "mei", "jun",
            "jul", "aug", "sep", "okt", "nov", "dec"
        ];
    }
    divideData(data, location) {
        if (typeof location !== 'undefined') {
            this.locationData(location);
        }
        else {
            console.log("geen locatie");
        }

        if (typeof data !== 'undefined' && typeof data.weather !== 'undefined') {
            console.log(data.weather);
            if (typeof data.weather["minutely"] !== 'undefined') {
                this.minutelyData(data.weather["minutely"]);
            }
            else {
                console.log("er is geen minutly data");
            }

            if (typeof data.weather["hourly"] !== 'undefined') {
                this.hourlyData(data.weather["hourly"]);
            }
            else {
                console.log("er is geen hourly data");
            }

            if (typeof data.weather["daily"] !== 'undefined') {
                this.dailyData(data.weather["daily"]);
            }
            else {
                console.log("er is geen daily data");
            }
        }
        else {
            console.log("het bestaat niet");
        }
    }
    locationData(location) {
        this.locationTitle = document.createElement("h2");
        this.locationTitle.id = "locatie";
        this.locationTitle.innerHTML = location;
        this.view.appendChild(this.locationTitle);
    }
    minutelyData() {

    }
    hourlyData(twoDaysData) {
        this.allHourlyData = twoDaysData["data"];

        this.locationSummary = document.createElement("p");
        this.locationSummary.id = "locatie";
        this.locationSummary.innerHTML = twoDaysData["summary"];
        this.view.appendChild(this.locationSummary);

        this.allHourlyData.forEach((h) => {
            console.log(h);

            this.hourInfo = document.createElement("div");
            this.hourInfo.className = "uur";

            this.icon = document.createElement("canvas");
            this.icon.id = h["icon"];
            this.icon.style.width = 30;
            this.icon.style.heigth = 30;

            this.time = document.createElement("div");
            this.time.className = "tijd";
            this.time.innerHTML = "Tijd: "+this.convertToTime(h["time"]);

            this.sum = document.createElement("div");
            this.sum.className = "summary";
            this.sum.innerHTML = h["summary"];

            this.temp = document.createElement("div");
            this.temp.className = "temperatuur";
            this.temp.innerHTML = "Temperatuur: "+this.tempFahToCel(h["apparentTemperature"]);

            this.cloud = document.createElement("div");
            this.cloud.className = "bewolking";
            this.cloud.innerHTML = "Bewolking: "+h["cloudCover"];

            this.prob = document.createElement("div");
            this.prob.className = "kans";
            this.prob.innerHTML = "Kans op neerslag: "+h["precipProbability"];

            this.intens = document.createElement("div");
            this.intens.className = "intensiteit";
            this.intens.innerHTML = "Intensiteit neerslag: "+h["precipIntensity"];

            this.bearing = document.createElement("div");
            this.bearing.className = "richting";
            this.bearing.innerHTML = "windrichting: "+h["windBearing"];

            this.speed = document.createElement("div");
            this.speed.className = "kracht";
            this.speed.innerHTML = "Wind kracht: "+h["windSpeed"];

            // this.hourInfo.appendChild(this.icon);
            this.hourInfo.appendChild(this.time);
            this.hourInfo.appendChild(this.sum);
            this.hourInfo.appendChild(this.temp);
            this.hourInfo.appendChild(this.cloud);
            this.hourInfo.appendChild(this.intens);
            this.hourInfo.appendChild(this.bearing);
            this.hourInfo.appendChild(this.speed);

            this.view.appendChild(this.hourInfo);

        });
    }
    dailyData() {

    }
    tempFahToCel(f) {
        return ((5/9) * (f-32)).toFixed(1);
    }
    convertToTime(t) {
        this.datum = new Date(t*1000);

        this.day = this.datum.getDate();
        if (this.day.toString().length == 1) this.day = "0"+this.day;

        this.month = this.monthNames[this.datum.getMonth()];

        this.hour = this.datum.getHours();
        if (this.hour.toString().length == 1) this.hour = "0"+this.hour;
        this.hour = this.hour+":00";

        return this.day+" "+this.month+" "+this.hour;
    }
}
module.exports = WeatherView;

// this.icon1 = document.createElement('canvas');
// this.icon1.id = 'icon1';
//
// this.icon2 = document.createElement('canvas');
// this.icon2.id = 'icon2';
//
// var skycons = new Skycons({"color": "pink"});
// // on Android, a nasty hack is needed: {"resizeClear": true}
//
// // you can add a canvas by it's ID...
// skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
//
// // ...or by the canvas DOM element itself.
// skycons.add(document.getElementById("icon2"), Skycons.RAIN);
//
// // if you're using the Forecast API, you can also supply
// // strings: "partly-cloudy-day" or "rain".
//
// // start animation!
// skycons.play();
//
// // you can also halt animation with skycons.pause()
//
// // want to change the icon? no problem:
// skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
//
// // want to remove one altogether? no problem:
// skycons.remove("icon2");
//
// this.view.appendChild(this.icon1);
// this.view.appendChild(this.icon2);