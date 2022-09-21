var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

directionsDisplay.setMap(map);
const element = document.getElementById("map");
async function calcRoute() {
  document.querySelector(".loading-text").style.display = "block";
  const chargerData = await showAll();
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    provideRouteAlternatives: true,
  };
  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      const output = document.querySelector(".output-text");
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
        for (let j = 0; j < points.length; j += 10) {
          circle = new google.maps.Circle({
            center: new google.maps.LatLng(
              points[j].latitude,
              points[j].longitude
            ),
            strokeColor: "#FF0000",
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: "#FF0000",
            fillOpacity: 0,
            map,
            radius: 1000,
          });
          for (let index = 0; index < chargerData.length; index++) {
            const lat = chargerData[index].ChargeDeviceLatitude;
            const lng = chargerData[index].ChargeDeviceLongitude;
            const point = new google.maps.LatLng(lat, lng);
            if (
              google.maps.geometry.spherical.computeDistanceBetween(
                point,
                circle.getCenter()
              ) <= circle.getRadius()
            ) {
              const marker = new google.maps.Marker({
                position: point,
                map: map,
              });
              marker.addListener(
                "click",
                () => {
                  var map = document.getElementById("map");
                  map.style.margin = "60px 0";
                  map.style.width = "70%";
                  var text = document.querySelector(".text");
                  text.innerHTML = `ID: ${chargerData[index].ChargeDeviceId} <br\> Name: ${chargerData[index].ChargeDeviceName} <br\> Latitude: ${chargerData[index].ChargeDeviceLatitude} <br\> Longitude: ${chargerData[index].ChargeDeviceLongitude} <br\>`
                  var button = document.querySelector(".button3");
                  button.innerHTML = `<a href=https://www.google.co.uk/maps/dir/${document.getElementById("from").value}/${document.getElementById("from").to}/>Get directions</a>`
                  console.log(document.getElementById("from").value);
                    // <a class"button_slide slide_down" href="https://www.google.com/maps/dir/?api=1&destination=${chargerData[index].ChargeDeviceLatitude},${chargerData[index].ChargeDeviceLongitude}" target="_blank">Get Directions</a>
                  false
                });
            }
          }
        }
      }
      document.querySelector(".loading-text").style.display = "none";
      directionsDisplay.setDirections(result); 
    } else {
      output.innerHTML =
        "div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
    }
  });
}