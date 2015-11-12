$(function() {
    $( "#fechaContrato" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onClose: function( selectedDate ) {
            $("#fechaVncimiento").datepicker("option", "minDate", selectedDate);
        }
    });
    $( "#fechaVencimiento" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onClose: function( selectedDate ) {
            $( "#fechaContrato" ).datepicker ( "option", "maxDate", selectedDate );       
        }
    });
    
});

/*
$(function() {
    $( "#datepicker" ).datepicker();
});

$(function() {
    $( "#datepicker2" ).datepicker();
});
*/

