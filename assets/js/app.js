var inpOrigin = document.getElementById('inp-origin');
var inpDestiny = document.getElementById('inp-destiny');
function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });

  var infoWindow = new google.maps.InfoWindow({map: map});
  function successFunction(position){
    var myPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(myPosition);
    infoWindow.setContent('Ubicaión Encontrada');
    map.setCenter(myPosition);
    map.setZoom(18);
    // var myLocation = new google.maps.Marker({
    //   position: {lat: myLat, lng: myLon},
    //   map: map
    // });
    // map.setCenter({lat: myLat, lng: myLon});
  }

  function findMe(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction);
    } else {
      x.innerHTML = "La geolocalización no es compatible con este navegador.";
    }
  }
  document.getElementById('btn-find-me').addEventListener("click", findMe);

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
