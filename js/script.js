$(document).ready(function(){

    // adding focus on "Name" field when page loads
    $('#name').focus();

    // add placeholder for name and email
    $("#name").attr('placeholder', "What's your name?");
    $("#mail").attr('placeholder', "you@example.com");

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

    $('#colors-js-puns').hide();

    $("#design").change(function() {
        const option =  $('#color').children('option');
        const addOption = $("<option disabled selected></option>").text('Choose color');
        if($(this).val() === 'js puns') {
            $('#color').prepend(addOption);
            $('#colors-js-puns').show();
            option.hide();
            $('option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]').show();
        } else if ($(this).val() === 'heart js' ){
            $('#color').prepend(addOption);
            $('#colors-js-puns').show();
            option.hide();
            $('option[value="tomato"], option[value="steelblue"], option[value="dimgrey"]').show();
        } else {
            $('#colors-js-puns').hide();
        }
    });

    /**** ”Register for Activities” section *******/

    // there are 2 occasions when events happen at same time,
    // if one of those events is "checked" -> add "disabled" attribute to the other event that happens at same time
    const checkEvents = (event, eventSameTime) => {
        $('input[type="checkbox"][name="' + event + '"]').click(function(){
        if($(this).is(":checked")){
            $("label input[name="+ eventSameTime +"]").attr('disabled', true);
            $("label input[name="+ eventSameTime +"]").parent().attr('class', 'line-through');
        } else if ($(this).is(":not(:checked)")){
            $("input[name=" + eventSameTime + "]").attr('disabled', false);
            $("label input[name="+ eventSameTime +"]").parent().removeAttr('class', 'line-through');
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
            createElement.text("Total Price: $" + total).attr('class', 'total');
        } else if ($(this).is(":not(:checked)")) {
            total -= result;
            createElement.text("Total Price: $" + total).attr('class', 'total');
        }

        $('.activities').append(createElement);

        if (total === 0) {
            $('.activities').find('legend').append(createSpanBox.text('Please select at least one activity'));
            createElement.remove();
        } else {
            createSpanBox.remove();
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
    const createSpanName = $("<span></span>").attr('class', 'is-hidden');
    const createSpanMail = $("<span></span>").attr('class', 'is-hidden');
    const createSpanBox = $("<span></span>").attr('class', 'is-hidden');
    const createSpanError = $("<span></span>").attr('class', 'is-hidden');
    const createSpanCC = $("<span></span>").attr('class', 'is-hidden');
    const createSpanZip = $("<span></span>").attr('class', 'is-hidden');
    const createSpanCvv = $("<span></span>").attr('class', 'is-hidden');

    // name validation
    $('#name').on("input", function(event) {
        const text = event.target.value;
        const showText = text === '';
        if(showText) {
            $('label[for="name"]').append(createSpanName.text('Enter your name'));
        } else {
            createSpanName.remove();
        }
    }); 

    // real time error messege if email is not correctly formatted
    $('#mail').on("input", function(event) {
        const text = event.target.value;
        const test = /^[^@]+@[^@.]+\.[a-z]+$/i.test(text);
        if($('#mail').val() === ''){
            $('label[for="mail"]').append(createSpanMail.text('Enter your email address'));
        } else  if (!test){
            $('label[for="mail"]').append(createSpanMail.text('Must be valid email'));
        } else {
            createSpanMail.remove();
        }
    });

    // credit card validation
    $('#cc-num').on("input", function(event) {
        let text = event.target.value.replace(/[^0-9]/, '');
        console.log(text);
        const test = /^\d{13,16}$/.test(text);
        console.log(test);
        if($('#cc-num').val() === ''){
            $('label[for="cc-num"]').append(createSpanCC.text('Enter your card number'));
        } else if(!test){
            $('label[for="cc-num"]').append(createSpanCC.text('Must be valid number'));
        } else {
            createSpanCC.remove();
        }
    });

    $('#zip').on("input", function(event) {
        let text = event.target.value.replace(/[ -]+/, '');
        const test = /^\d{5}$/.test(text);
        if(!test){
            $('label[for="zip"]').append(createSpanZip.text('5 digits'));
        } else {
            createSpanZip.remove();
        }
    });

    $('#cvv').on("input", function(event) {
        let text = event.target.value.replace(/[ -]+/, '');
        const test = /^\d{3}$/.test(text);
        if(!test){
            $('label[for="cvv"]').append(createSpanCvv.text('3 digits'));
        } else {
            createSpanCvv.remove();
        }
    });

    // check for errors, when submit button is clicked

    $('button').on('click', function(event) {
        let errors = 0;
        
        if(total === 0) {
            $('.activities').find('legend').append(createSpanBox.text('Please select at least one activity'));
            errors++;
        } else {
            createSpanBox.remove();
        }

        if ($('#name').val() === '') {

            $('label[for="name"]').append(createSpanName.text('Enter your name'));
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
        // checking credit card 
        $('option[value="credit card"]').each(function() {
            if(this.selected){
                if ($('#cc-num').val() === '') {
                    $('label[for="cc-num"]').append(createSpanCC.text('Enter valid number 13-16'));
                    errors++;
                } else {
                    createSpanCC.remove();
                }
                // zip
                if ($('#zip').val() === '') {

                    $('label[for="zip"]').append(createSpanZip.text('5 digits'));
                    errors++;
                } else {
                    createSpanZip.remove();
                }
                //cvv
                if ($('#cvv').val() === '') {

                    $('label[for="cvv"]').append(createSpanCvv.text('3 digits'));
                    errors++;
                } else {
                    createSpanCvv.remove();
                }
            }
        });
        if (errors > 0) {
          alert('Check errors!');
          event.preventDefault();
       } else {
        createSpanError.remove();
        alert('We have received your registration. Thank you!');
            $('button').submit();
       }
    });
}); 