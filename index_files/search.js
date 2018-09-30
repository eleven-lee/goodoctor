var z1 = 1;

function DoctorItemSelected(){
    
   
    x=document.getElementById("doctor-select") // 找到元素
    m= document.getElementById("selected-item")
    
    // alert("ddd");
  
    if (z1%2 == 1) {
        x.style.background = "#48ccc5 url(images/icon/border_doctor_icon.png) no-repeat center";
        check1= document.getElementById("doctor-checkbox").checked = true;
        // document.getElementById("selected-item").style.display.none;
        m.style.display = "block";

        z1 = z1 + 1;
    }
     else if (z1%2 == 0) {
        x.style.background = "lightgray url(images/icon/border_doctor_icon.png) no-repeat center";
        check1= document.getElementById("doctor-checkbox").checked = false;
        m.style.display = "none";
        z1 = z1 - 1;
     }
  
    y= document.getElementById("doctor-select-text");
    if ( y.style.color == "gray") {
        y.style.color = "#48ccc5";
    } else {
        y.style.color = "gray";
    }

}


var z2 = 1;
function SpecialistItemSelected(){
    
   
    x=document.getElementById("specialist-select") // 找到元素
    m= document.getElementById("specialist-selected-item")
    
    // alert("ddd");
  
    if (z2%2 == 1) {

        $("#specialist-select").removeClass("specialist-select");
        $("#specialist-select").addClass("specialist-selected");

        // x.style.background = "#48ccc5 url(images/icon/border_specialist_center_icon.png) no-repeat center ";
       
        
        check1= document.getElementById("specialist-checkbox").checked = true;
        // document.getElementById("selected-item").style.display.none;
        m.style.display = "block";

        z2 = z2 + 1;
    }
     else if (z2%2 == 0) {

        $("#specialist-select").removeClass("specialist-selected");
        $("#specialist-select").addClass("specialist-select");

        // x.style.background = "lightgray url(images/icon/border_doctor_icon.png) no-repeat center";


        check1= document.getElementById("specialist-checkbox").checked = false;
        m.style.display = "none";
        z2 = z2 - 1;
     }
  
    y= document.getElementById("specialist-select-text");
    if ( y.style.color == "gray") {
        y.style.color = "#48ccc5";
    } else {
        y.style.color = "gray";
    }

}


var z3 = 1;

function SexMaleItemSelected(){
    
   
    x=document.getElementById("sex-male-select") // 找到元素
    m= document.getElementById("sex-male-selected-item")
    
    // alert("ddd");
  
    if (z1%2 == 1) {
        x.style.background = "#48ccc5 url(images/icon/border_doctor_icon.png) no-repeat center";
        check1= document.getElementById("sex-male-checkbox").checked = true;
        // document.getElementById("selected-item").style.display.none;
        m.style.display = "block";
        z1 = z1 + 1;
    }
     else if (z1%2 == 0) {
        x.style.background = "lightgray url(images/icon/border_doctor_icon.png) no-repeat center";
        check1= document.getElementById("sex-male-checkbox").checked = false;
        m.style.display = "none";
        z1 = z1 - 1;
     }
}
var z4 = 1;

function SexFemaleItemSelected(){
    
   
    x=document.getElementById("sex-female-select") // 找到元素
    m= document.getElementById("sex-female-selected-item")
    
    // alert("ddd");
  
    if (z1%2 == 1) {
        x.style.background = "#48ccc5 url(images/icon/472798835695761199.png) no-repeat center";
        check1= document.getElementById("sex-female-checkbox").checked = true;
        // document.getElementById("selected-item").style.display.none;
        m.style.display = "block";

        z1 = z1 + 1;
    }
     else if (z1%2 == 0) {
        x.style.background = "lightgray url(images/icon/472798835695761199.png) no-repeat center";
        check1= document.getElementById("sex-female-checkbox").checked = false;
        m.style.display = "none";
        z1 = z1 - 1;
     }
  
}


var z4 = 1;

function MedicalQuanItemSelected(){
    
   
    x=document.getElementById("medical-quan-select") // 找到元素
    m= document.getElementById("medical-quan-selected-item")
    
    // alert("ddd");
  
    if (z1%2 == 1) {
        x.style.background = "#48ccc5 url(images/icon/border_doctor_icon.png) no-repeat center";
        check1= document.getElementById("medical-quan-checkbox").checked = true;
        // document.getElementById("selected-item").style.display.none;
        m.style.display = "block";

        z1 = z1 + 1;
    }
     else if (z1%2 == 0) {
        x.style.background = "lightgray url(images/icon/border_doctor_icon.png) no-repeat center";
        check1= document.getElementById("medical-quan-checkbox").checked = false;
        m.style.display = "none";
        z1 = z1 - 1;
     }
  
}

$(document).ready(function(){
    $( "#slider" ).slider();
  });

  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 5000,
      values: [ 0, 5000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "HKD $" + ui.values[ 0 ] + " - HKD $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );


//   var labelactive1 = 1;


// $(document).ready(function(){
  

//   $( function() {
//     $("label>input").checked("ture").$( "label>span" ).addClass("active");
        
//     });


    // $("#heart").click(function(){
    //     $("#heart").toggleClass("labelactive");



        // alert("2");
        // if(labelactive1%2==1) {
        //     $("#heart").addClass("labelactive");
        //     labelactive1 = labelactive1 + 1;
        //     // break;
        //     alert("3");
        // }
        // alert("4");

        // elseif (labelactive1%2==0) {
        //     alert("5");
        //     $("#heart").removeClass("labelactive");
        //     labelactive1 = labelactive1 - 1;
        //     alert("6");
        //     // break;
        // }

      
// })
   
// } );






