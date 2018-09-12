$(document).ready(function () {
    $('.text-area').on('input', function (event) {
        var counter = 140 - $(this).val().length;
        var counterElement = $(this).siblings('.counter');
        counterElement.html(counter);
        //  console.log(counterElement.val());
        if (counter < 0) {
            counterElement.css('color', 'red');
        } else {
            counterElement.css('color', 'black');
        }
    });
});