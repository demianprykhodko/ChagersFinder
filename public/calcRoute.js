
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

directionsDisplay.setMap(map);

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
        // var markers = [];
        // for (let i = 0; i < result.routes[0].legs[0].steps.length; i++) {
        //   var points = decode(result.routes[0].legs[0].steps[i].polyline.points);
        //   markers = markers.concat(points);
        //   for (let j = 0; j < points.length; j++) {
        //     new google.maps.Marker({
        //       position: new google.maps.LatLng(
        //         points[j].latitude,
        //         points[j].longitude
        //       ),
        //       map: map,
        //     });
        //   }
        // }
        directionsDisplay.setDirections(result);
      } else {
        output.innerHTML =
          "div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
      }
    });
  }