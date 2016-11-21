var latlng = [52.0, 20.0], //Warszawa
    capital = '';

function markPositionOnMap() {
    var pos = {lat: latlng[0], lng: latlng[1]};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: pos
    });
    var marker = new google.maps.Marker({
        position: pos,
        map: map
    });
    $('#messageBoard').text("Stolica " + $selectedCountry + ": " + capital)
}

function showAllCapitals(continent) {
    var Capital = function(name, coordinates) {
        this.name = name;
        this.coordinates = coordinates;
    };

    var capitals = [];
    dataReader.getCountries(function(countries){
        countries
            .filter(country => country.region === continent || continent === 'all')
            .map(country => {
                capitals.push( new Capital(country.capital, country.latlng) );
            });

        var pos = {lat: latlng[0], lng: latlng[1]};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: pos
        });
        for(var i = 0; i < capitals.length; i++ ) {
            var position = {lat: capitals[i].coordinates[0], lng: capitals[i].coordinates[1]};
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: capitals[i].name
            });
        }
    });

}
