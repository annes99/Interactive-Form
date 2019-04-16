$(document).ready(function () {

    let totalPrice = 0;
    const $createP = $("<p></p>");
    // creating span elements for validation fields + adding class="error" for CSS styling and error counting
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

    // at first hide Color column
    $('#colors-js-puns').hide();

    // based on selection, show correct options
    $("#design").change(function () {
        const $colorOption = $('#color').children('option');
        const $addOption = $("<option disabled selected></option>").text('Choose color');
        if ($(this).val() === 'js puns') {
            $('#color').prepend($addOption);
            $('#colors-js-puns').show();
            $colorOption.hide();
            $('option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]').show();
        } else if ($(this).val() === 'heart js') {
            $('#color').prepend($addOption);
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
            $('.activities').find('legend').append($boxSpan.text('Please select at least one activity').attr('class', 'error err'));
            $createP.remove();
        } else {
            $boxSpan.remove();
        }
    });

    /************* "Payment Info" section ****************/

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

    /***************  Validation section  ****************/

    // function to create error messages, appending error messages to correct label element
    const showElement = (name, span, text) => {
        let element = $('label[for="' + name + '"]').append((span).text(text));
        return element;
    };

    // function to check if name field is empty, if so show error message
    const checkName = (text) => {
        if (text === '') {
            showElement('name', $nameSpan, 'Enter your name');
        } else {
            $nameSpan.remove();
        }
    };
    // function to check if email field is empty or not formated correctly, if so show error message
    const checkEmail = (text) => {
        const inputText = text;
        const $test = /^[^@]+@[^@.]+\.[a-z]+$/i.test(inputText);
        if ($('#mail').val() === '') {
            showElement('mail', $mailSpan, 'Enter your email address');
        } else if (!$test) {
            showElement('mail', $mailSpan, 'Must be valid email');
        } else {
            $mailSpan.remove();
        }
    };
    // function to check if credit card field is empty or not formated correctly, if so show error message
    const checkCC = (text) => {
        let inputText = text;
        const $test = /^\d{13,16}$/.test(inputText);
        if ($('#cc-num').val() === '') {
            showElement('cc-num', $ccSpan, 'Enter your card number');
        } else if (!$test) {
            showElement('cc-num', $ccSpan, 'Must be valid number');
        } else {
            $ccSpan.remove();
        }

    };
    // function to check if ZIP or CVV field is formated correctly, if not show error message
    const checkZipAndCvv = (text, test, span, spanName) => {
        let inputText = text;
        const $test = test.test(inputText);
        if (!$test) {
            span;
        } else {
            spanName.remove();
        }
    };

    // real-time name validation
    $('#name').on("input", function (event) {
        checkName(event.target.value);
    });

    // real-time e-mail validation + conditional error message
    $('#mail').on("input", function (event) {
        checkEmail(event.target.value);
    });

    // real-time credit card number validation + conditional error message
    $('#cc-num').on("input", function (event) {
        checkCC(event.target.value);
    });

    // real-time zip number validation -- /^\d{5}$/ testing if field contains only 5 digits
    $('#zip').on("input", function (event) {
        checkZipAndCvv(event.target.value, /^\d{5}$/, showElement('zip', $zipSpan, '5 digits'), $zipSpan);
    });

    // real-time cvv card number validation -- /^\d{3}$/ testing if field contains only 3 digits
    $('#cvv').on("input", function (event) {
        checkZipAndCvv(event.target.value, /^\d{3}$/, showElement('cvv', $cvvSpan, '3 digits'), $cvvSpan);
    });

    /******** form submitting section  ***********************/

    // check for errors, when submit button is clicked
    $('button').on('click', function (event) {
        // if credit card IS NOT selected, check all name, email & activities fields for errors
        if ($('#payment').val() !== 'credit card') {

            // checking if name field is empty, if so show error 
            checkName($('#name').val());

            // checking if mail field is formated correctly, if not, so show error 
            checkEmail($('#mail').val());

            // checking if price for activities is 0, if true, show error "no activities selected"
            if (totalPrice === 0) {
                $('.activities').find('legend').append($boxSpan.text('Please select at least one activity').attr('class', 'error'));
            } else {
                $boxSpan.remove();
            }
            // checking if name, email & activities fields have a class="err", if so show error
            if ($("[for='name'], [for='mail'], .activities").find('.error').length > 0) {
                alert('Check errors!');
                event.preventDefault();
            } else {
                alert('We have received your registration. Thank you!');
                $('button').submit();
            }
        }
      
        // if credit card IS selected, check all fields for errors
        if ($('#payment').val() === 'credit card') {

            // checking if name field is empty, if so show error 
            checkName($('#name').val());
            // checking if mail field is formated correctly, if not, so show error 
            checkEmail($('#mail').val());

            // checking if price for activities is 0, if true, show error "no activities selected"
            if (totalPrice === 0) {
                $('.activities').find('legend').append($boxSpan.text('Please select at least one activity').attr('class', 'error err'));
            } else {
                $boxSpan.remove();
            }

            // check credit card
            checkCC($('#cc-num').val());
            // check ZIP
            checkZipAndCvv($('#zip').val(), /^\d{5}$/, showElement('zip', $zipSpan, '5 digits'), $zipSpan);
            // check CVV
            checkZipAndCvv($('#cvv').val(), /^\d{3}$/, showElement('cvv', $cvvSpan, '3 digits'), $cvvSpan);
            
            // checking if any field have a class="err", if so show error, if not registration is succsess
            if ($('form').find('.error').length > 0) {
                alert('Check errors!');
                event.preventDefault();
            } else {
                alert('We have received your registration. Thank you!');
                $('button').submit();
            }
        }
    });
});