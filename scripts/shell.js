var $militaryServiceBookLabel = $('<label for="warBook" class="col-xs-4"> Nr książeczki wojskowej </label>'),
    $militaryServiceBookInput = $('<input class="col-xs-7" type="text" name="warBook" id="militaryServiceBook" placeholder="Nr książeczki wojskowej">'),
    $selectedCountry = '',
    $textareaCounter = 0;

$(document).ready(function() {

    setTimeout(function() {
        if(!window.google || !window.google.maps) {
            errorLoadingGoogleMaps = true;
            showMessage();
        }
    }, 5000);

    $('#counter').text($textareaCounter + " / " + TEXTAREA_MAX_LENGTH).addClass('col-xs-offset-4 col-xs-8');

    $('#gender').click(function() {
        if ($('#male').is(':checked')) {
            $('.militaryServiceBook')
                .append($militaryServiceBookLabel)
                .append($militaryServiceBookInput);
        }
        else {
            $('.militaryServiceBook').empty();
        }
    });

    $('#country').change(function() {
        $selectedCountry = $('#country option:selected').text();
        app.getCountryInfo();
    });

    $('#extraInfo').keyup(function(){
        $textareaCounter = $('#extraInfo').val().length;
        $('#counter').text($textareaCounter + ' / ' + TEXTAREA_MAX_LENGTH);
        if ($textareaCounter > TEXTAREA_MAX_LENGTH) {
            $('#counter')
                .css({color: "red"})
                .text($textareaCounter + ' / ' + TEXTAREA_MAX_LENGTH + " Przekroczono max. limit");
        }
    });

    $('#showAllCapitals').click(function() {
        if ($(this).is(':checked')) {
            var continent = $('#capitals option:selected').val();
            showAllCapitals(continent)
        }
    });

    $('#capitals').change(function() {
        $('#showAllCapitals').prop("checked", true);
        var continent = $('#capitals option:selected').val();
        showAllCapitals(continent);
    })


});