$(document).ready(function () {

    let totalPrice = 0;
    const $createP = $("<p></p>");
    const $nameSpan = $("<span></span>").attr('class', 'error');
    const $mailSpan = $("<span></span>").attr('class', 'error');
    const $ccSpan = $("<span></span>").attr('class', 'error');
    const $zipSpan = $("<span></span>").attr('class', 'error');
    const $cvvSpan = $("<span></span>").attr('class', 'error');
    const $boxSpan = $("<span></span>").attr('class', 'error');

    // adding focus on "Name" field when page loads
    $('#name').focus();

    // add placeholder for name and email
    $("#name").attr('placeholder', "What's your name?");
    $("#mail").attr('placeholder', "you@example.com");

    /****** ”Job Role” section ********/

    // hiding "other" job role selection
    const $otherTitle = $('#other-title');
    $otherTitle.hide();

    // if 'other' is selected textbox will show
    $('#title').change(function () {
        const $jobTitle = $(this).val();
        if ($jobTitle === 'other') {
            $otherTitle.show();
        } else {
            $otherTitle.hide();
        }
    });

    /***** ”T-Shirt Info” section *******/
    // at first hiding Color column
    $('#colors-js-puns').hide();

    // based on selection, show correct options
    $("#design").change(function () {
        const $colorOption = $('#color').children('option');
        const addOption = $("<option disabled selected></option>").text('Choose color');
        if ($(this).val() === 'js puns') {
            $('#color').prepend(addOption);
            $('#colors-js-puns').show();
            $colorOption.hide();
            $('option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]').show();
        } else if ($(this).val() === 'heart js') {
            $('#color').prepend(addOption);
            $('#colors-js-puns').show();
            $colorOption.hide();
            $('option[value="tomato"], option[value="steelblue"], option[value="dimgrey"]').show();
        } else {
            $('#colors-js-puns').hide();
        }
    });

    /**** ”Register for Activities” section *******/

    // there are 2 occasions when events happen at same time,
    // if one of those events is "checked" -> add "disabled" attribute to the other event that happens at same time
    const checkEvents = (event, eventSameTime) => {
        $('input[type="checkbox"][name="' + event + '"]').click(function () {
            const getSameTimeEvent = $("input[name=" + eventSameTime + "]");
            if ($(this).is(":checked")) {
                getSameTimeEvent.attr('disabled', true);
                getSameTimeEvent.parent().attr('class', 'no-activities');
            } else if ($(this).is(":not(:checked)")) {
                getSameTimeEvent.attr('disabled', false);
                getSameTimeEvent.parent().removeAttr('class', 'no-activities');
            }
        });
    };

    checkEvents('js-frameworks', 'express');
    checkEvents('js-libs', 'node');
    checkEvents('express', 'js-frameworks');
    checkEvents('node', 'js-libs');

    // Calculating total price for selected activities, getting the price from text
    // adding a error if no boxes are checked
    $('input[type="checkbox"]').click(function () {
        let $getPrice = parseInt($(this).closest("label").text().replace(/.*[$]/, ''));
        //const $boxSpan = createSpan;
        if ($(this).is(":checked")) {
            totalPrice += $getPrice;
            $createP.text("Total Price: $" + totalPrice).attr('class', 'total');
        } else if ($(this).is(":not(:checked)")) {
            totalPrice -= $getPrice;
            $createP.text("Total Price: $" + totalPrice).attr('class', 'total');
        }
        $('.activities').append($createP);
        if (totalPrice === 0) {
            $('.activities').find('legend').append($boxSpan.text('Please select at least one activity'));
            $createP.remove();
        } else {
            $boxSpan.remove();
        }
    });

    /****** "Payment Info" section ********/

    // at first credit card is selected, based on selection proper <div> is showing
    $('option[value="select_method"]').prop('disabled', 'disabled');
    $('option[value="credit card"]').prop('selected', 'selected');
    const $creditCard = $('#credit-card');
    const $payPal = $('#credit-card').next().hide();
    const $bitcoin = $('#credit-card').next().next().hide();

    $("#payment").change(function () {
        if ($(this).val() === 'paypal') {
            $creditCard.hide();
            $payPal.show();
            $bitcoin.hide();
        } else if ($(this).val() === 'bitcoin') {
            $creditCard.hide();
            $payPal.hide();
            $bitcoin.show();
        } else {
            $creditCard.show();
            $payPal.hide();
            $bitcoin.hide();
        }
    });

    /***** Validation section  *******/

    // real-time name validation
    $('#name').on("input", function (event) {
        const text = event.target.value;
        const showText = text === '';
        if (showText) {
            $('label[for="name"]').append($nameSpan.text('Enter your name'));
        } else {
            $nameSpan.remove();
        }
    });

    // real-time error messege if email is not correctly formatted + conditional error message
    $('#mail').on("input", function (event) {
        const text = event.target.value;
        const $test = /^[^@]+@[^@.]+\.[a-z]+$/i.test(text);
        if ($('#mail').val() === '') {
            $('label[for="mail"]').append($mailSpan.text('Enter your email address'));
        } else if (!$test) {
            $('label[for="mail"]').append($mailSpan.text('Must be valid email'));
        } else {
            $mailSpan.remove();
        }
    });

    // real-time credit card number validation + conditional error message
    $('#cc-num').on("input", function (event) {
        let text = event.target.value.replace(/[^0-9]/, '');
        const $test = /^\d{13,16}$/.test(text);
        if ($('#cc-num').val() === '') {
            $('label[for="cc-num"]').append($ccSpan.text('Enter your card number'));
        } else if (!$test) {
            $('label[for="cc-num"]').append($ccSpan.text('Must be valid number'));
        } else {
            $ccSpan.remove();
        }
    });
    // real-time zip number validation
    $('#zip').on("input", function (event) {
        let text = event.target.value.replace(/[ -]+/, '');
        const $test = /^\d{5}$/.test(text);
        if (!$test) {
            $('label[for="zip"]').append($zipSpan.text('5 digits'));
        } else {
            $zipSpan.remove();
        }
    });
    // real-time cvv card number validation
    $('#cvv').on("input", function (event) {
        let text = event.target.value.replace(/[ -]+/, '');
        const $test = /^\d{3}$/.test(text);
        if (!$test) {
            $('label[for="cvv"]').append($cvvSpan.text('3 digits'));
        } else {
            $cvvSpan.remove();
        }
    });

    /******** form submitting section  *******/

    // check for errors, when submit button is clicked
    $('button').on('click', function (event) {
        // keeping score of errors
        let errors = 0;

        // checking if name field is empty, if so show error
        if ($('#name').val() === '') {
            $('label[for="name"]').append($nameSpan.text('Enter your name'));
            errors++;
        } else {
            $nameSpan.remove();
        }
        // checking if mail field is empty, if so show error
        if ($('#mail').val() === '') {
            $('label[for="mail"]').append($mailSpan.text('Enter valid email'));
            errors++;
        } else {
            $mailSpan.remove();
        }
        // checking if price for activities is 0, if so show error "no activities selected"
        if (totalPrice === 0) {
            $('.activities').find('legend').append($boxSpan.text('Please select at least one activity'));
            errors++;
        } else {
            $boxSpan.remove();
        }
        // checking credit card, if either card, zip or cvv field is empty, so show error
        $('option[value="credit card"]').each(function () {
            if (this.selected) {
                if ($('#cc-num').val() === '') {
                    $('label[for="cc-num"]').append($ccSpan.text('Enter valid number 13-16'));
                    errors++;
                } else {
                    $ccSpan.remove();
                }
                // zip
                if ($('#zip').val() === '') {
                    $('label[for="zip"]').append($zipSpan.text('5 digits'));
                    errors++;
                } else {
                    $zipSpan.remove();
                }
                //cvv
                if ($('#cvv').val() === '') {
                    $('label[for="cvv"]').append($cvvSpan.text('3 digits'));
                    errors++;
                } else {
                    $cvvSpan.remove();
                }
            }
        });
        // if theres errors alert shows, if no errors registration is succsessful 
        if (errors > 0) {
            alert('Check errors!');
            event.preventDefault();
        } else {
            alert('We have received your registration. Thank you!');
            $('button').submit();
        }
    });
});