$(document).ready(function(){
    $( "#datepicker" ).datepicker({
        dateFormat:"yyyy-mm-dd",
        inline:true
    });
});
$.idcode.setCode();
$("#btns").click(function (){
    var IsBy = $.idcode.validateCode();
    alert(IsBy);
    console.log(IsBy);
});