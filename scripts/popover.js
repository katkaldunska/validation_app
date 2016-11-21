var errorLoadingCountries = false,
    errorLoadingGoogleMaps = false,
    sendFormWithSuccess = false,
    sendFormWithNoSuccess = false,
    validateUnsuccessful = false;

function showMessage() {

    if(errorLoadingCountries) {
        $( "#dialog" )
            .dialog()
            .text("Przepraszamy, nie udało się załadować państw, odśwież stronę i spróbuj ponownie");
    }

    if(errorLoadingGoogleMaps) {
        $( "#dialog" )
            .dialog()
            .text("Nie udało się załadować map Google, spróbuj ponownie");
    }

    if(sendFormWithNoSuccess) {
        $( "#dialog" )
            .dialog()
            .text("Przepraszamy, nie udało się wysłać formularza, spróbuj ponownie");
    }

    if(sendFormWithSuccess) {
        $( "#dialog" )
            .dialog()
            .text("Formularz wysłano poprawnie");
    }

    if(validateUnsuccessful) {
        $( "#dialog" )
            .dialog()
            .text("Prosimy o poprawne uzupełnienie formularza");
    }
}


