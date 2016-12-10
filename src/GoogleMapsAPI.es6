class GoogleMapsAPI {
    constructor() {
        this.lat = 51.6085544;
        this.lng = 4.786510899999939;
        this.zoomLvl = 13;
        this.mapCanvas = document.getElementById('map_canvas');
        this.searchCanvas = document.getElementById('pac-input');
        this.searchBox = new google.maps.places.SearchBox(this.searchCanvas);
        this.createMap();
    }
    createMap() {
        this.map = new google.maps.Map(this.mapCanvas, {
            center: {lat: this.lat, lng: this.lng},
            zoom: this.zoomLvl,
            mapTypeId: 'roadmap'
        });
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchCanvas);
        this.markers = [];
    }

    changeBounds() {
        this.searchBox.setBounds(this.map.getBounds());
    }

    changeMarker() {
        this.places = this.searchBox.getPlaces();

        if (this.places.length == 0) {
            return;
        }

        // Clear out the old markers.
        this.markers.forEach(function(marker) {
            marker.setMap(null);
        });
        this.markers = [];

        // For each place, get the icon, name and location.
        this.bounds = new google.maps.LatLngBounds();
        this.places.forEach((place) => {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            let icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            this.markers.push(new google.maps.Marker({
                map: this.map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                this.bounds.union(place.geometry.viewport);
            } else {
                this.bounds.extend(place.geometry.location);
            }
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
        });

        this.map.fitBounds(this.bounds);
    }

    get latLng() {
        return { lat: this.lat, lng: this.lng }
    }
}
module.exports = GoogleMapsAPI;