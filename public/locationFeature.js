
async function getLocation() {
    document.querySelector('.loading-text').style.display = 'block';
    const chargerData = await showAll();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        map.setZoom(13);
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
            document.querySelector('.loading-text').style.display = 'none';
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
        }
      });
    }
}