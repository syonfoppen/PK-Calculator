var vermogen;
var gewicht;
var kenteken;
var make;
var model;
var bouwjaar;

function GetData(){
  kenteken = $('.kentekenplaat').val().replaceAll('-', '').toUpperCase();


  $(".form-part-1").hide();
  $(".loader").show();

    $.when(ajax1(kenteken), ajax2(kenteken)).done(function(a1, a2){
      
      $(".loader").hide();
      if(a2[0].length != 0){
        gewicht = a2[0][0].massa_ledig_voertuig;
        make = a2[0][0].merk;
        model = a2[0][0].handelsbenaming;
        bouwjaar = a2[0][0].datum_eerste_toelating.substring(0,4);
        console.log(parseInt(gewicht));

        if(a1[0][0].nettomaximumvermogen){
          vermogen = Math.round(a1[0][0].nettomaximumvermogen * 1.362);
          console.log(vermogen);
          Calculate();
        }
        else{
          $(".form-part-1").hide();
          $(".form-part-2").show();
        }

      }
      else{
        Error("Helaas hebben we je auto niet kunnen vinden");
      }
    }); 
}


function SetVermogen(){
  $(".form-part-2").hide();
  vermogen = $(".vermogen").val();
  Calculate();

}

function Calculate(){
  $(".kenteken").append(kenteken);
  $(".merk").append(make);
  $(".model").append(model);
  $(".bouwjaar").append(bouwjaar);
  $(".result").append((vermogen / gewicht).toFixed(3));
  $(".results").show();

}

function Error(message){
  $(".form-part-1").hide();
  $(".error").show();
  $(".error").append(message);
}



function ajax1(kenteken){
  var settings = {
    "url": "https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=" + kenteken,
    "method": "GET",
    "timeout": 0,
  };

  return $.ajax(settings);
}

function ajax2(kenteken){
  var settings = {
    "url": "https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=" + kenteken,
    "method": "GET",
    "timeout": 0,
  };

  return $.ajax(settings);
}


