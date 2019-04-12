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



    


}); 


