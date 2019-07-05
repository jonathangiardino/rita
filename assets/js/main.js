let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;



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
    zoom: 17
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
  let request = {
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
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });

    // Add click listener to each marker
    google.maps.event.addListener(marker, 'click', () => {
      let request = {
        placeId: place.place_id,
        fields: ['name', 'formatted_address', 'geometry', 'rating',
          'website', 'photos'
        ]
      };

      /* Only fetch the details of a place when the user clicks on a marker.
       * If we fetch the details for all place results as soon as we get
       * the search response, we will hit API rate limits. */
      service.getDetails(request, (placeResult, status) => {
        showDetails(placeResult, marker, status)
      });
    });
    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
  });
  /* Once all the markers have been placed, adjust the bounds of the map to
   * show all the markers within the visible area. */
  map.fitBounds(bounds);
}

// InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    let placeInfowindow = new google.maps.InfoWindow();
    let rating = "None";
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
  // Clear the previous details
  while (infoPane.lastChild) {
    infoPane.removeChild(infoPane.lastChild);
  }
  // Display a Place Photo with the Place Details if there is one
  if (placeResult.photos) {
    let firstPhoto = placeResult.photos[0];
    let photo = document.createElement('img');
    photo.classList.add('hero');
    photo.src = firstPhoto.getUrl();
    infoPane.appendChild(photo);
  }

  // Add place details with text formatting
  let name = document.createElement('h1');
  name.classList.add('place');
  name.textContent = placeResult.name;
  infoPane.appendChild(name);
  if (placeResult.rating) {
    let rating = document.createElement('h6');
    rating.classList.add('details');
    rating.textContent = `Rating: ${placeResult.rating} \u272e`;
    infoPane.appendChild(rating);
  }
  let address = document.createElement('h6');
  address.classList.add('details');
  address.textContent = placeResult.formatted_address;
  infoPane.appendChild(address);
  if (placeResult.website) {
    let websitePara = document.createElement('h6');
    let websiteLink = document.createElement("a");
    let websiteUrl = document.createTextNode(placeResult.website);
    let target = websiteLink.setAttribute('target', '_blank');
    websiteLink.appendChild(websiteUrl);
    websiteLink.title = placeResult.website;
    websiteLink.href = placeResult.website;
    websitePara.appendChild(websiteLink);
    infoPane.appendChild(websitePara);
  }

  // Open the infoPane
  infoPane.classList.add("open");
}

function toggle_visibility() {
  var p = document.getElementById("panel");
  if (p.style.display == 'block') {
    p.style.display = 'none';
  } else {
    p.style.display = 'block';
  }
}

function navigateSection() {
  window.scrollTo(0, document.getElementById('map').offsetTop)
}


function navigateSection2() {
  window.scrollTo(0, document.getElementById('howItWorks').offsetTop)
}
