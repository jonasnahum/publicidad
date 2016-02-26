/*$(function() {
    $( "#fechaContrato" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onClose: function( selectedDate ) {
            $("#fechaVencimiento").datepicker("option", "minDate", selectedDate);
        },
        dateFormat: "yy-mm-dd"
    });
    $( "#fechaVencimiento" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onClose: function( selectedDate ) {
            $( "#fechaContrato" ).datepicker ( "option", "maxDate", selectedDate );       
        },
        dateFormat: "yy-mm-dd"
    });
    
});
*/

$(function() {
    $( "#fechaContrato" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        //onClose: function( selectedDate ) {
          //  $("#fechaVencimiento").datepicker("option", "minDate", selectedDate);
        //},
        //dateFormat: "yy-mm-dd"
    }); 
});

$(function() {
   $( "#fechaVencimiento" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        //onClose: function( selectedDate ) {
          //  $( "#fechaContrato" ).datepicker ( "option", "maxDate", selectedDate );       
        //},
        //dateFormat: "yy-mm-dd"
    });
});