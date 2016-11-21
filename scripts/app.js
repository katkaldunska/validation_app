app = {

    start: function() {
        this.initCountries();
    },

    initCountries: function () {
        dataReader.getCountries(function(countries){
            countries.forEach(function(country) {
                $('#country').append(new Option(country.name))
            });
        })
    },

    getCountryInfo: function () {
        dataReader.getCountries(function(countries){
            countries
                .filter(country => country.name === $selectedCountry)
                .map(country => {
                    $('#prefix').attr({value: "+" + country.callingCodes[0], disabled: 'disabled' });
                    latlng = country.latlng;
                    capital = country.capital;
                    if($('#capital').prop('checked'))
                        markPositionOnMap();
                })
        })
    },

    sendForm: function() {
        var url = "https://sheltered-ocean-92578.herokuapp.com/api/forms";

        $.ajax({
            type: "POST",
            url: url,
            "Content-Type": "application/json",
            Accept: "application/json",
            data: {
                gender: $('input[name=gender]:checked', '#form1').val(),
                firstName: $('#firstName').val(),
                secondName: $('#secondName').val(),
                lastName: $('#lastName').val(),
                lastName: $('#lastName').val(),
                country: $('#country option:selected').val(),
                tel: $('#prefix').val() + $('#tel').val(),
                birthDate: $('#birthDate').val(),
                pesel: $('#pesel').val(),
                mail: $('#mail').val(),
                extraInfo: $('#extraInfo').val()
            },
            success: function(data) {
                sendFormWithSuccess = true;
            },
            error: function(error) {
                console.error(error);
                sendFormWithNoSuccess = true;
            }
        }).done(function() {
            showMessage();
        });
    }
};

app.start();