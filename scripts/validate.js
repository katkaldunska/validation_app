var TEXTAREA_MAX_LENGTH = 150,
    doNotSend = false;

$(document).ready(function() {

    $('#form1').on('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

});

function validateForm() {
    $('.error').remove();
    var rules = {
        militaryServiceBook: /^[A-Z]{2}\ [0-9]{6}$/,
        firstName: /^[A-ZŁŻ][a-ząęóżźćńłś]{3,}$/,
        secondName: /^[A-ZŁŻ][a-ząęóżźćńłś]{3,}$|^$/,
        lastName: /^([A-ZŁŻ][a-ząęóżźćńłś]{3,})(\-[A-ZŁŻ][a-ząęóżźćńłś]{2,})?$/,
        tel: /^[0-9]{9}$/,
        birthDate: /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/,
        pesel: /^[0-9]{11}$/,
        mail: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/
    },
        validationErrors = [];

    if(! $('#agreement').prop('checked'))
        validationErrors.push('agreement');

    if(! $('#female').prop('checked') && ! $('#male').prop('checked'))
        validationErrors.push('gender');
    else if($('#female').prop('checked'))
        delete rules.militaryServiceBook;

    if($('#extraInfo').length > TEXTAREA_MAX_LENGTH)
        doNotSend = true;

    if($('#country').val() == '' )
        validationErrors.push('country');

    for (var rule in rules) {
        var $elementToTest = $('#' + rule).val();
        if ( !rules[rule].test($elementToTest)) {
            validationErrors.push(rule)
        }
    }

    if(!($.inArray("pesel", validationErrors) > 0) && !validatePesel($('#pesel').val())) {
        validationErrors.push("pesel")
    }

    if (validationErrors.length === 0 && !doNotSend) {
        validateUnsuccessful = false;
        app.sendForm();
    }
    else {
        validateUnsuccessful = true;
        var neededTooltips = [];
        validationErrors.forEach(function(error) {
            errorMessages
                .filter((message) => message.name === error)
                .map((message) => neededTooltips.push(message));
        });
        neededTooltips.forEach(function(tooltip) {
            $('<div class="error col-xs-offset-4 col-xs-7"></div>')
                .insertAfter($('#' + tooltip.name))
                .text(tooltip.content)
                .css({color: 'red'});
        });
    }
    showMessage();
}

function validatePesel(pesel) {
    var dig = ("" + pesel).split("");
    var controlSum = (1*parseInt(dig[0]) + 3*parseInt(dig[1]) + 7*parseInt(dig[2]) + 9*parseInt(dig[3]) + 1*parseInt(dig[4]) + 3*parseInt(dig[5]) + 7*parseInt(dig[6]) + 9*parseInt(dig[7]) + 1*parseInt(dig[8]) + 3*parseInt(dig[9])) % 10;
    if(controlSum === 0)
        controlSum = 10;
    controlSum = 10 - controlSum;
    if (parseInt(dig[10]) == controlSum)
        return true;
    else
        return false;
}
