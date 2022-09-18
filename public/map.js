var mapOptions = {
  zoom: 6,
  center: new google.maps.LatLng(53.400002, -2.983333),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

async function getLocation() {
  const chargerData = await showAll();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
      map.setZoom(12);
      locationCirlce = new google.maps.Circle({
        center: pos,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        radius: 1000,
      });
      var radius = locationCirlce.getRadius();
      var center = locationCirlce.getCenter();
      for (let index = 0; index < chargerData.length; index++) {
        const lat = chargerData[index].ChargeDeviceLatitude;
        const lng = chargerData[index].ChargeDeviceLongitude;
        const point = new google.maps.LatLng(lat, lng);
        if (
          google.maps.geometry.spherical.computeDistanceBetween(
            point,
            center
          ) <= radius
        ) {
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }
    });
  }
}
var options = {
  types: ["(cities)"],
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
