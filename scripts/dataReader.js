dataReader = {

    getCountries: function(callback) {
        $.ajax({
            url: "https://restcountries.eu/rest/v1/all",
            dataType: 'json',
            type: 'GET',
            success: callback,
            error: function(error) {
                console.error(error);
                errorLoadingCountries = true;
            }
        })
    }

};