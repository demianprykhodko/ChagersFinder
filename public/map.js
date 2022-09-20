var mapOptions = {
  zoom: 6,
  center: new google.maps.LatLng(53.400002, -2.983333),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var options = {
  types: ["(cities)"],
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
