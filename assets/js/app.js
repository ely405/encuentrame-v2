var inpOrigin = document.getElementById('inp-origin');
var inpDestiny = document.getElementById('inp-destiny');
function initMap(){
  var laboratoriaLima = {lat: -12.1191427, lng: 77.0349046};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: laboratoriaLima
  });

  var markLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    map: map
  });

  function successFunction(myPosition){
    var myLat = myPosition.coords.latitude;
    var myLon = myPosition.coords.longitude;
    var myLocation = new google.maps.Marker({
      position: {lat: myLat, lng: myLon},
      map: map
    });
    map.setZoom(18);
    map.setCenter({lat: myLat, lng: myLon});
  }
  function findMe(e){
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction);
    } else {
      x.innerHTML = "La geolocalización no es compatible con este navegador.";
    }
  }
  document.getElementById('btn-find-me').addEventListener('click', findMe);

  new google.maps.places.Autocomplete(inpOrigin);
  new google.maps.places.Autocomplete(inpDestiny);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  function calculateAndDisplayRoute(directionsService, directionsDisplay){
    directionsService.route({
      origin: inpOrigin.value,
      destination: inpDestiny.value,
      travelMode: 'DRIVING'
    }, function(response, status){
      var distOriginToDestiny;
      var price;
      var rate = document.getElementById('rate');
      var calculatePrice = function(){
        distOriginToDestiny = response.routes[0].legs[0].distance.text.replace('km', '').replace(',', '.');
        rate.classList.remove('hide');
        price = distOriginToDestiny*1.75;
        (price<4)?rate.innerHTML="s/. 4": rate.innerHTML = "s/. " + parseInt(price);
      }
      if(status === 'OK'){
        calculatePrice();
        directionsDisplay.setDirections(response);
        markLaboratoria.setMap(null);
      }else{
        window.alert("No encontramos una ruta.");
      }
    });
  }

  directionsDisplay.setMap(map);

  function traceRoute(e){
    e.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }
  document.getElementById('btn-trace-route').addEventListener('click', traceRoute);
}
