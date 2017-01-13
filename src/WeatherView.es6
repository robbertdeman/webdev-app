class WeatherView {
    constructor() {
        this.view = document.getElementById('weerinfo');
        this.monthNames = ["jan", "feb", "maa", "apr", "mei", "jun",
            "jul", "aug", "sep", "okt", "nov", "dec"
        ];
    }
    divideData(data, location) {
        // verwijder alle oude data
        this.view.innerHTML = "";

        //checken of de data klopt
        typeof location !== 'undefined' ? this.locationData(location) : console.log("geen locatie");

        if (typeof data !== 'undefined' && typeof data.weather !== 'undefined') {
            console.log(data.weather);

            //welke data is er?
            typeof data.weather["minutely"] !== 'undefined' ? this.minutelyData(data.weather["minutely"]) : console.log("er is geen minutly data");
            typeof data.weather["hourly"] !== 'undefined' ? this.hourlyData(data.weather["hourly"]) : console.log("er is geen hourly data");
            typeof data.weather["daily"] !== 'undefined' ? this.dailyData(data.weather["daily"]) : console.log("er is geen daily data");
        }
        else {
            console.log("er is geen weerdata");
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

        this.icon = document.createElement("canvas");
        this.icon.className = "clear-day";
        this.icon.width = 100;
        this.icon.height = 100;
        this.view.appendChild(this.icon);

        this.locationSummary = document.createElement("p");
        this.locationSummary.id = "summary";
        this.locationSummary.innerHTML = twoDaysData["summary"];
        this.view.appendChild(this.locationSummary);

        this.allHourlyData.forEach((h) => {
            this.hourInfo = document.createElement("div");
            this.hourInfo.className = "uur";

            this.middle = document.createElement("div");
            this.middle.className = "middle group";

            this.bottom = document.createElement("div");
            this.bottom.className = "bottom group";

            this.icon = document.createElement("canvas");
            this.icon.className = "icon " + h["icon"];
            this.icon.width = 80;
            this.icon.height = 80;

            this.time = document.createElement("div");
            this.time.className = "tijd";
            this.time.innerHTML = this.convertToTime(h["time"]);

            this.temp = document.createElement("div");
            this.temp.className = "temperatuur";
            this.temp.innerHTML = this.tempFahToCel(h["apparentTemperature"]);

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

            this.hourInfo.appendChild(this.time);
            this.middle.appendChild(this.icon);
            this.middle.appendChild(this.temp);
            this.hourInfo.appendChild(this.middle);
            // this.hourInfo.appendChild(this.prob);
            // this.hourInfo.appendChild(this.intens);
            // this.hourInfo.appendChild(this.bearing);
            // this.hourInfo.appendChild(this.speed);

            this.view.appendChild(this.hourInfo);
        });
    }
    dailyData() {

    }
    tempFahToCel(f) {
        //convert fahrenheid naar celsius met een decimaal
        return ((5/9) * (f-32)).toFixed(0)+"°C";
    }
    convertToTime(t) {
        //maak datum
        this.datum = new Date(t*1000);

        //pakt maand en zet hem om naar text
        this.month = this.monthNames[this.datum.getMonth()];

        //pak uur en maak er uu:mm van
        this.hour = this.datum.getHours();
        if (this.hour.toString().length == 1) this.hour = "0"+this.hour;
        this.hour = this.hour+":00";

        // kijken of deze datums gelijk zijn
        if (this.datum.getDate() != this.day) {
            if (typeof this.day != 'undefined') {
                this.clear = document.createElement("div");
                this.clear.className = "clear";
                this.view.appendChild(this.clear);
            }
            this.day = this.datum.getDate();
            if (this.day.toString().length == 1) this.day = "0"+this.day;

            this.dagMaand = document.createElement("div");
            this.dagMaand.className = "dag";
            this.dagMaand.innerHTML = this.day+" "+this.month;
            this.view.appendChild(this.dagMaand);
        }
        else {
            this.day = this.datum.getDate();
            if (this.day.toString().length == 1) this.day = "0"+this.day;
        }
        return this.hour;
    }
}
module.exports = WeatherView;