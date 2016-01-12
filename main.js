/***********************MODEL***************************/
function Model() {

	var self = this;

	//Alberta places - hard coded as a function method
	self.places = [{
		Id:0,
		name: 'Alberta Co-op',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5589522,
		lng: -122.6517163,
		what: 'Yummy, fresh and good for the soul groceries'
	}, {
		id: 1,
		name: 'Alberta Rose Theatre',
		categories: ['all', 'see'],
		lat: 45.5588269,
		lng: -122.6367732,
		what: 'Spectacular events'
	}, {
		id: 2,
		name: 'Bolt',
		categories: ['all', 'create'],
		lat: 45.5589988,
		lng: -122.6430478,
		what: 'Fabrics, notions and patterns'
	}, {
		id: 3,
		name: 'Collage',
		categories: ['all', 'create'],
		lat: 45.559221,
		lng: -122.6479731,
		what: 'All the crafts!'
	}, {
		id: 4,
		name: 'Common Ground',
		categories: ['all', 'soak'],
		lat: 45.5592984,
		lng: -122.6304464,
		what: 'Naked outdoor hot tubs'
	}, {
		id: 5,
		name: 'Cruz Room',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5590117,
		lng: -122.6412912,
		what: 'Tacos, drink and funky fresh'
	}, {
		id: 6,
		name: 'Just Bob',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5591934,
		lng: -122.6409898,
		what: 'Handpies, music, drink and comfy chairs'
	}, {
		id: 7,
		name: 'Salt & Straw',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5592398,
		lng: -122.6442831,
		what: 'The most creative flavors of ice cream'
	}];

	//Set home
	self.home = [45.5590561,-122.6447018];
	//Array for Markers
	self.markers = [];
	//Array for infoWindows
	self.infoWindows = [];
}

var model = new Model();

/******************VIEW MODEL***************************/

function ViewModel() {

	var self = this;
	var markerBounce = null;
	var openWindow = null;

	//Foursquare
	var CLIENT_ID = "3SHNM1LPOMY3CXWGFPDTAH3WP31ZSIEMWIY3UTUYVDMUPSSD";
	var CLIENT_SECRET = "RBLLKYWKSTAUXJVKLSA42VX4LQ4ANYRCUBPRY1AQ1EOLY4C4";
	//Content strings from FourSquare data
	var HTMLcontentString = '';
	self.contentStrings = [];

	//Observables
	self.search = ko.observable("");
	self.showMessage = ko.observable("hidden");
	//locations data object into an array
	self.alberta = function(places) {
	    self.albertaList = [];
	    self.searchList = [];
	    for (i = 0; i < places.length; i++) {
	    	var item = places[i].name;
	    	self.albertaList.push(item);
	    	//Create lower case version for case insensitive search
	    	self.searchList.push(item.toLowerCase());
	    }
	    self.results = ko.observableArray(self.albertaList.slice(0));
	};
	//add the hard-coded locations
	self.alberta(model.places);

	//Checks search against places and filters
	self.updateMap = function() {
		self.results.removeAll();
		for (var i = 0; i < model.markers.length; i++) {
			model.markers[i].setVisible(false);
		}
		self.searchList.forEach(function (item, index, array) {
			if (item.indexOf(self.search().toLowerCase()) > -1) {
				self.results.push(self.albertaList[index]);
				model.markers[index].setVisible(true);
			}
		});
			if (self.search() === '') {
				self.results(self.albertaList.slice(0));
				model.markers.forEach(function (item, index, array) {
					if (!item.getVisible()) {
						item.setVisible(true);
					}
				});
			}
	}.bind(this);

	//reset
	self.clearSearch = function() {
		self.search('');
		if (openWindow) openWindow.close();
		if (markerBounce) markerBounce.setAnimation(null);
		self.updateMap();
		self.map.panTo(self.homelatlng);
		self.map.setZoom(15);
	};
	// create map
	function showMap(latlng) {
	  var googleLatLong = latlng;
	  var bounds = new google.maps.LatLngBounds();
	  var latLngBounds = bounds.extend(googleLatLong);

	  var mapOptions = {
	    zoom: 16,
	    center: googleLatLong,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    disableDefaultUI: true,
		scrollwheel: false,
		panControl:false,
		zoomControl:false,
		mapTypeControl:false,
		scaleControl:false,
		streetViewControl:true,
		overviewMapControl:false,
		rotateControl:false,
		styles: 	[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	  };

	  var mapDiv = document.getElementById("mapDiv");
	  var map = new google.maps.Map(mapDiv, mapOptions);
	  map.fitBounds(latLngBounds);

	  //Fix zoom after fitBounds
	  var listener = google.maps.event.addListener(map, "idle", function() {
			if (map.getZoom() > 15) map.setZoom(15);
			google.maps.event.removeListener(listener);
	  });

	  return map;
	}

	//Set the starting coordinates to the home location in the data model
	self.homelatlng = new google.maps.LatLng(model.home[0],model.home[1]);

	//Intialize the map using the home location Google maps latlan object
	self.map = showMap(self.homelatlng);

	//This function is used to create new map markers
	function addMarker(map, latlong, title, content, icon) {
	  var markerOptions = {
	    position: latlong,
	    map: map,
	    title: title,
	    animation: google.maps.Animation.DROP,
	    clickable: true,
	    icon: artsy.png
	  };

	  var marker = new google.maps.Marker(markerOptions);
	  marker.addListener('click', toggleBounce);

	  var infoWindowOptions = {
	    content: content,
	    position: latlong
	  };

	  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	  model.infoWindows.push(infoWindow);

	  google.maps.event.addListener(marker, "click", function() {
	    if (openWindow) openWindow.close();
	    openWindow = infoWindow;
	    infoWindow.open(map, marker);
	  });

	  google.maps.event.addListener(infoWindow, "closeclick", toggleBounce);

		 //Function to toggle the bounce anitmation of marker on click

		function toggleBounce() {
		  if (markerBounce) {
		    markerBounce.setAnimation(null);
		  }
		  if (markerBounce != marker) {
		  	marker.setAnimation(google.maps.Animation.BOUNCE);
		  	markerBounce = marker;
		  } else {
		    markerBounce = null;
		  }
		}

	  return marker;
	}

	//Find the marker that is currently selected in the model list of markers and toggles the infowindow
	self.selectMarkerFromList = function(currentlySelected) {
		for (var i = 0; i < model.markers.length; i++) {
			if (currentlySelected == model.markers[i].title) {
				toggleInfoWindow(i);
			}
		}
	}.bind(this);

	//Function to the toggle the infowindow of a specific marker
	function toggleInfoWindow(id) {
		google.maps.event.trigger(model.markers[id], 'click');
	}

	/* Create other functions to communicate with Model, Observables, and APIs */


	self.initMap = function(data) {
	  for (var i = 0; i < data.length; i++) {
	    var location = data[i];
	    var googleLatLong = new google.maps.LatLng(location.lat,location.lng);
	    var windowContent = location.name;
	    //Create and add markers to map
	    var marker = addMarker(self.map, googleLatLong, places.name, windowContent);
	    //Add marker to data model
	    model.markers.push(marker);
	  }
	};

	//Set timer to show error message
	self.timer = setTimeout(function() {
		self.showMessage("");
	}, 10000);

	//Make request to FourSquare API
	self.getLocationData = function(locations) {
	  for (var i=0; i<locations.length; i++) {
		  var url = "https://api.foursquare.com/v2/venues/"+
		  			locations[i].venue_id+
		  			"?client_id="+
		  			CLIENT_ID+
		  			"&client_secret="+
		  			CLIENT_SECRET+
		  			"&v=20150909&callback=ViewModel.callback";
		  var newScriptElement = document.createElement("script");
		  newScriptElement.setAttribute("src", url);
		  newScriptElement.setAttribute("id", "jsonp");
		  //Set onload attribute to check if resource loads. If onload fires, clear the timer
		  newScriptElement.setAttribute("onload", "clearTimeout(ViewModel.timer)");
		  var oldScriptElement = document.getElementById("jsonp");
		  var head = document.getElementsByTagName("head")[0];
		  if (oldScriptElement === null) {
		    head.appendChild(newScriptElement);
		  } else {
		    head.replaceChild(newScriptElement, oldScriptElement);
		  }
	  }
	};

	//Takes in the JSON response from the FourSquare API, constructs an HTML string, and sets it to the content of the relevant infoWindow
	self.callback = function(data) {
	  	model.infoWindows.forEach(function (item, index, array) {
	  		if (item.content == data.response.venue.name) {
	  			HTMLcontentString = "<p><strong><a class='place-name' href='"+
	  								data.response.venue.canonicalUrl+"'>"+
	  								data.response.venue.name+
	  								"</a></strong></p>"+
	  								"<p>"+data.response.venue.location.address+
	  								"</p><p><span class='place-rating'><strong>"+
	  								data.response.venue.rating+
	  								"</strong><sup> / 10</sup></span>"+
	  								"<span class='place-category'>"+
	  								data.response.venue.categories[0].name+
	  								"</p><p>"+data.response.venue.hereNow.count+
	  								" people checked-in now</p>"+
	  								"<img src='"+data.response.venue.photos.groups[0].items[0].prefix+
	  								"80x80"+
	  								data.response.venue.photos.groups[0].items[0].suffix+
	  								"'</img>";
	  			item.setContent(HTMLcontentString);
	  		}
	  	});
	};
	self.getLocationData(model.places);
	self.initMap(model.places);
}

var ViewModel = new ViewModel();
ko.applyBindings(ViewModel);
