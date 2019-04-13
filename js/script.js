$(document).ready(function(){

    // adding focus on "Name" field when page loads
    $('#name').focus();

    /****** ”Job Role” section ********/

    // hiding "other" job role selection
    const otherTitle = $('#other-title');
    otherTitle.hide();

    // if 'other' is selected textbox will slide down
    $('#title').change(function () {
        const value = $(this).val();
        if (value === 'other') {
            otherTitle.show();
        } else {
            otherTitle.hide();
        }
    });

    /***** ”T-Shirt Info” section *******/

    $('select #color').hide();

    $("#design").change(function() {
        const option =  $('#color').children('option');
        
        if($(this).val() === 'js puns') {
            option.hide();
            $('option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]').show();
        } else {
            option.hide();
            $('option[value="tomato"], option[value="steelblue"], option[value="dimgrey"]').show();
        } 
    });

    /**** ”Register for Activities” section *******/

    // there are 2 occasions when events happen at same time,
    // if one of those events is "checked" -> add "disabled" attribute to the other event that happens at same time
    const checkEvents = (event, eventSameTime) => {
        $('input[type="checkbox"][name="' + event + '"]').click(function(){
        if($(this).is(":checked")){
            $("label input[name="+ eventSameTime +"]").attr('disabled', true);
        } else if ($(this).is(":not(:checked)")){
            $("input[name=" + eventSameTime + "]").attr('disabled', false);

        }
        });
    };

    checkEvents('js-frameworks', 'express');
    checkEvents('js-libs', 'node');
    checkEvents('express', 'js-frameworks');
    checkEvents('node', 'js-libs');

    const createElement = $("<p></p>");
    let total = 0;

    $('input[type="checkbox"]').click(function () {

        let result = parseInt($(this).closest("label").text().replace(/.*[$]/, ''));

        if ($(this).is(":checked")) {
            total += result;
            createElement.text("Total Price: $" + total);
        } else if ($(this).is(":not(:checked)")) {
            total -= result;
            createElement.text("Total Price: $" + total);
        }

        $('.activities').append(createElement);

        if (total === 0) {
            createElement.remove();
        }
    });

    /****** "Payment Info" section ********/

    $('option[value="select_method"]').prop('disabled', 'disabled');
    $('option[value="credit card"]').prop('selected', 'selected');
    const creditCard = $('#credit-card');
    const payPal = $('#credit-card').next().hide();
    const bitcoin = $('#credit-card').next().next().hide();

    $("#payment").change(function() {
        if($(this).val() === 'paypal') {
            creditCard.hide();
            payPal.show();
            bitcoin.hide(); 
        } else if ($(this).val() === 'bitcoin') {
            creditCard.hide();
            payPal.hide();
            bitcoin.show(); 
        } else {
            creditCard.show();
            payPal.hide();
            bitcoin.hide(); 
        }
    });

    /******* Form validation section ********/

    // changing Name to inline-block
    $('label[for="name"]').css('display', 'inline-block');
    $('label[for="mail"]').css('display', 'inline-block');

    const createSpanName = $("<span></span>").attr('class', 'is-hidden');
    const createSpanMail = $("<span></span>").attr('class', 'is-hidden');
    const createSpanBox = $("<span></span>").attr('class', 'is-hidden');
    const createSpanError = $("<span></span>").attr('class', 'is-hidden');

    // name validation
    $('#name').on("input", function(event) {
        const text = event.target.value;
        const showText = text === '';
        if(showText) {
            $('label[for="name"]').append(createSpanName.text('Please enter your name'));
        } else {
            createSpanName.remove();
        }
    }); 

    // real time error messege if email is not correctly formatted
    $('#mail').on("input", function(event) {
        const text = event.target.value;
        const test = /^[^@]+@[^@.]+\.[a-z]+$/i.test(text);
        if(!test){
            $('label[for="mail"]').append(createSpanMail.text('Must be valid email'));
        } else {
            createSpanMail.remove();
        }
    });

    // check for errors, when submit button is clicked
    
    $('button').on('click', function(event) {
        
        let errors = 0;
        
        if(total === 0) {
            $('.activities').find('legend').append(createSpanBox.text('    Please select at least one activity'));
            errors++;
        } else {
            createSpanBox.remove();
        }

        if ($('#name').val() === '') {

            $('label[for="name"]').append(createSpanName.text('Please enter your name'));
            errors++;
        } else {
            createSpanName.remove();
        }

        if ($('#mail').val() === '') {

            $('label[for="mail"]').append(createSpanMail.text('Enter valid email'));
            errors++;
        } else {
            createSpanMail.remove();
        }

        if (errors > 0) {
            $('.activities').next().append(createSpanError.text('Check for errors'));
        } else {
            $('.activities').next().append(createSpanError.text('Great Success!'));
        }
        event.preventDefault();
    });
}); 


