class SkyconsView {
    constructor() {
        // on Android, a nasty hack is needed: {"resizeClear": true}
        this.skycons = new Skycons({"color": "#eeeeee"});
        this.icons = Skycons;
        this.allSkycons = [
            {"className": ".clear-day", "skyconName": "CLEAR_DAY"},
            {"className": ".clear-night", "skyconName": "CLEAR_NIGHT"},
            {"className": ".partly-cloudy-day", "skyconName": "PARTLY_CLOUDY_DAY"},
            {"className": ".partly-cloudy-night", "skyconName": "PARTLY_CLOUDY_NIGHT"},
            {"className": ".cloudy", "skyconName": "CLOUDY"},
            {"className": ".rain", "skyconName": "RAIN"},
            {"className": ".sleet", "skyconName": "SLEET"},
            {"className": ".snow", "skyconName": "SNOW"},
            {"className": ".wind", "skyconName": "WIND"},
            {"className": ".fog", "skyconName": "FOG"}
        ];
    }
    createSkycons() {
        //loop door de mogelijkheden van skycons
        this.allSkycons.forEach((s) => {
            let skycon = document.querySelectorAll(s.className);

            //geef de juiste skyconName mee
            skycon.forEach((c) => {
                this.skycons.add(c, this.icons[s.skyconName]);
            });
        });

        // start animation!
        this.skycons.play();
    }
}
module.exports = SkyconsView;