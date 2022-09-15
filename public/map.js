var myLatlng = new google.maps.LatLng(52.408054, -1.510556);

var mapOptions = {
  zoom: 12,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var directionsDisplay = new google.maps.DirectionsRenderer();

var directionsService = new google.maps.DirectionsService();

directionsDisplay.setMap(map);

//Show the path between two points on the map
function calcRoute() {
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    provideRouteAlternatives: true,
  };
  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      const output = document.querySelector("#output");
      console.log(JSON.stringify(result));
      output.innerHTML =
        "<div class='alert-info'>From: " +
        document.getElementById("from").value +
        ".<br />To: " +
        document.getElementById("to").value +
        ".<br /> Driving distance <i class='fas fa-road'></i>: " +
        result.routes[0].legs[0].distance.text +
        ".<br />Duration <i class='fas fa-hourglass-start'></i>: " +
        result.routes[0].legs[0].duration.text +
        ".</div>";
      var markers = [];
      for (let i = 0; i < result.routes[0].legs[0].steps.length; i++) {
        var points = decode(result.routes[0].legs[0].steps[i].polyline.points);
        markers = markers.concat(points);
        for (let j = 0; j < points.length; j++) {
          new google.maps.Marker({
            position: new google.maps.LatLng(
              points[j].latitude,
              points[j].longitude
            ),
            map: map,
          });
        }
      }
      console.log(markers);
      directionsDisplay.setDirections(result);
    } else {
      directionsDisplay.setDirections({ routes: [] });
      map.setCenter(myLatlng);
      output.innerHTML =
        "div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
    }
  });
}

//Show the chargers in the given radius
// const circle = async () => {
//   Circle = new google.maps.Circle({
//     center: map.getCenter(),
//     strokeColor: "#3B82F6",
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: "#3B82F6",
//     fillOpacity: 0.35,
//     radius: 1000,
//     map: map,
//     editable: true
//   })
//   console.log(Circle.getRadius());
//   console.log(Circle.getCenter());
//   const chargersData = await showAll();
//   for (let index = 0; index < chargersData.length; index++) {
//     const element = chargersData[index];
//     const latLng = new google.maps.LatLng(element.ChargeDeviceLatitude, element.ChargeDeviceLongitude);
//     console.log("check");
//     if (Circle.getBounds().contains(latLng)) {
//       console.log("check");
//       console.log(element);
//     }

//   }
// }
// circle();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

var options = {
  types: ["(cities)"],
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
