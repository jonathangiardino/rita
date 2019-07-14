/*jshint esversion: 6 */


var pos;
var map;
var bounds;
var infoWindow;
var currentInfoWindow;
var service;
var infoPane;
var searchBox;
var markers = [];



// Initializing Map

function initMap() {
  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow;
  infoPane = document.getElementById('panel');
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.8518,
      lng: 14.2681
    },
    zoom: 13
  });


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    var pos = places[0].geometry.location;

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    var zoom = map.getZoom();
    map.setZoom(zoom > 7 ? 14 : zoom);
    map.setCenter(pos);
    getNearbyPlaces(pos);
  });
}




// Geolocating User on Click

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      bounds.extend(pos);

      infoWindow.setPosition(pos);
      infoWindow.setContent('<h2 style="color: #f25f38;">There you are!</h2>');
      infoWindow.open(map);
      map.setCenter(pos);

      // Call Places Nearby Search on user's location
      getNearbyPlaces(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);

  // Call Places Nearby Search on the default location
  getNearbyPlaces(pos);
}


// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
  var request = {
    location: position,
    rankBy: google.maps.places.RankBy.DISTANCE,
    keyword: 'pizza'
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}

// Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}


// Set markers at the location of each place result
function createMarkers(places) {
  places.forEach(place => {
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
    });

    google.maps.event.addListener(marker, 'click', () => {
      var request = {
        placeId: place.place_id,
        fields: ['name', 'formatted_address', 'geometry', 'rating',
          'website', 'photos'
        ]
      };

      service.getDetails(request, (placeResult, status) => {
        showDetails(placeResult, marker, status)
      });
    });
    bounds.extend(place.geometry.location);
  });
}


// InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var placeInfowindow = new google.maps.InfoWindow();
    var rating = "None";
    if (placeResult.rating) rating = placeResult.rating;
    placeInfowindow.setContent('<div><strong>' + placeResult.name +
      '</strong><br>' + 'Rating: ' + rating + '</div>');
    placeInfowindow.open(marker.map, marker);
    currentInfoWindow = placeInfowindow;
    setTimeout(function() {
      placeInfowindow.close();
    }, 3000);
    showPanel(placeResult);
  }
}




// Displays place details in a sidebar
function showPanel(placeResult) {
  // If infoPane is already open, close it
  if (infoPane.classList.contains("open")) {
    infoPane.classList.remove("open");
  }

  while (infoPane.lastChild) {
    infoPane.removeChild(infoPane.lastChild);
  }

  if (placeResult.photos) {
    var firstPhoto = placeResult.photos[0];
    var photo = document.createElement('img');
    photo.classList.add('hero');
    photo.src = firstPhoto.getUrl();
    infoPane.appendChild(photo);
  }


  var name = document.createElement('h1');
  name.classList.add('place');
  name.textContent = placeResult.name;
  infoPane.appendChild(name);
  if (placeResult.rating) {
    var rating = document.createElement('h6');
    rating.classList.add('details');
    rating.textContent = `Rating: ${placeResult.rating} \u272e`;
    infoPane.appendChild(rating);
  }
  var address = document.createElement('h6');
  address.classList.add('details');
  address.textContent = placeResult.formatted_address;
  infoPane.appendChild(address);
  if (placeResult.website) {
    var websitePara = document.createElement('h6');
    var websiteLink = document.createElement("a");
    var websiteUrl = document.createTextNode(placeResult.website);
    var target = websiteLink.setAttribute('target', '_blank');
    websiteLink.appendChild(websiteUrl);
    websiteLink.title = placeResult.website;
    websiteLink.href = placeResult.website;
    websitePara.appendChild(websiteLink);
    infoPane.appendChild(websitePara);
  }
  infoPane.classList.add("open");
}

// Hide show button
function toggle_visibility() {
  var p = document.getElementById("panel");
  if (p.style.display == 'block') {
    p.style.display = 'none';
  } else {
    p.style.display = 'block';
  }
}
