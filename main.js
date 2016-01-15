/***********************MODEL***************************/
var model = [
	{
		name: 'Alberta Co-op',
		lat: 45.5589522,
		lng: -122.6517163,
		latLng: {lat: 45.5589522, lng: -122.6517163},
	}, {
		name: 'Alberta Rose Theatre',
		lat: 45.5588269,
		lng: -122.6367732,
		latLng: {lat:45.5588269 , lng:-122.6367732 },
	}, {
		name: 'Bolt',
		lat: 45.5589988,
		lng: -122.6430478,
		latLng: {lat:45.5589988 , lng:-122.6430478 },
	}, {
		name: 'Collage',
		lat: 45.559221,
		lng: -122.6479731,
		latLng: {lat:45.559221 , lng:-122.6479731 },
	}, {
		name: 'Common Ground',
		lat: 45.5592984,
		lng: -122.6304464,
		latLng: {lat:45.5592984, lng:-122.6304464 },
	}, {
		name: 'Cruz Room',
		lat: 45.5590117,
		lng: -122.6412912,
		latLng: {lat:45.5590117 , lng:-122.6412912},
	}, {
		name: 'Just Bob',
		lat: 45.5591934,
		lng: -122.6409898,
		latLng: {lat:45.5591934 , lng:-122.6409898 },
	}, {
		name: 'Salt & Straw',
		lat: 45.5592398,
		lng: -122.6442831,
		latLng: {lat:45.5592398, lng:-122.6442831 },
	}];

	//Set home
	//self.home = [45.5590561,-122.6447018];
	//Array for Markers
	//self.markers = [];
	//Array for infoWindows
	//self.infoWindows = [];
//}

//var model = new Model();

/*********************MAP********************************/
// create map
var mapOptions = {
	    zoom: 16,
	    center: {lat:45.5590561, lng:-122.6447018},
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
var map;
function initMap() {
	map = new google.maps.Map(mapDiv, mapOptions);
}
/******************VIEW MODEL***************************/

var ViewModel = function vm () {

	var self = this;
	self.googleMap = map;
	self.allPlaces=[];
	//var markerBounce = null;
	//var openInfoWindow = null;
	//var prevInfoWindow
	var image = 'artsy.png';

	// For each object in model.locations
		model.forEach(function(place) {
		self.allPlaces.push(new Place(place));
		});

	/**********FourSquare***************/
	// Some variables to be used for the Foursuare api
		var latlng = '',
	client_id = '3SHNM1LPOMY3CXWGFPDTAH3WP31ZSIEMWIY3UTUYVDMUPSSD',
	client_secret = 'RBLLKYWKSTAUXJVKLSA42VX4LQ4ANYRCUBPRY1AQ1EOLY4C4',
	fUrl = 'https://api.foursquare.com/v2/venues/search?ll='+ latlng +'&client_id='+ client_id +'&client_secret='+ client_secret +'&v=20151259&m=foursquare&links',
	//fquery = 'coffee',
	infowindow = new google.maps.InfoWindow();

	// For each object in allPlaces create map markers and infowindows
	self.allPlaces.forEach(function(place, i) {
	  var drop = google.maps.Animation.DROP,
		markerOptions = {
			map: self.googleMap,
			position: place.latLng
		},
		lat = place.lat,
		lng = place.lng,
		var contentWindow = '';

		// Sends a request to foursquare api
		$.getJSON('https://api.foursquare.com/v2/venues/search?ll='+ lat+','+lng +'&query='+ fquery +'&limit=1&client_id='+ client_id +'&client_secret='+ client_secret +'&v=20151259&m=foursquare',

	// This function takes the foursquare data and processes it.
	function(data) {
		$.each(data.response.venues, function(i,venues){
			content = '<hr></h5><p><sup>nearest coffee spot</sup></p>' +
			'<h5>'+ venues.name + '</h5>' +
			'<p>'+ venues.location.formattedAddress[0] +'<br>' +
			venues.location.formattedAddress[1] +'</p>';
			contentWindow = content;
		});
	}).fail(function(){
		content = 'There was an error loading foursquare';
		contentWindow = content;
	});

	var contentName = '<h4>'+model[i].name+'</h4>';
	place.marker = new google.maps.Marker(markerOptions);
	var marker = place.marker;
	//var poweredBy = '<img class="powered" src="img/powered.png">';

	// This adds an Listener for a click function to the marker.
	// It returns an infowindow with content we create for each marker,
	// and the marker will bounce when clicked
	google.maps.event.addListener(marker, 'click', (function(marker) {
		return function() {
		infowindow.setContent(contentName + contentWindow);
		infowindow.open(self.googleMap, marker);
		// Animation
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
			} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
			}
			setTimeout(function(){ marker.setAnimation(null); }, 800);
		};
	})(marker));
	});

	// The click function triggers map markers
	// and clicks the toggle that shows the
	// list itemsd.
	clicker = function(){
	google.maps.event.trigger(this.marker, 'click');
	$('#menu-toggle').trigger('click');
	};

	// Toggle visibility of list view in mobile view
	self.Show = ko.observable(false);
	self.toggleVisibility = function() {
	self.Show(!self.Show());
	};
	self.Show = ko.observable(true);

	//This is where the visible markers will be stored
	self.visiblePlaces = ko.observableArray();

	// All markers will start out visible
	self.allPlaces.forEach(function(place) {
	self.visiblePlaces.push(place);
	});

	// This binds to the userInput and keeps track of its contents
	// and is accessed by the filter.
	self.userInput = ko.observable('');

	// This is the filter function for the Markers.
	// It takes the user input and if it matches
	// part of any name, then that name's content will be visible,
	// Otherwise it will be hidden.
	self.filterMarkers = function() {
	var searchInput = self.userInput().toLowerCase();
	self.visiblePlaces.removeAll();

	self.allPlaces.forEach(function(place) {

		place.marker.setVisible(false);
		if (place.model.toLowerCase().indexOf(searchInput) !== -1) {
		self.visiblePlaces.push(place);
		}
	});

	self.visiblePlaces().forEach(function(place) {
		place.marker.setVisible(true);
	});
	};

	//This creates object Place with data
	function Place(data) {
	this.model = data.name;
	this.latLng = data.latLng;
	this.lat = data.lat;
	this.lng = data.lng;
	this.marker = null;
	}
};

function loadAll(){
	initMap();
	ko.applyBindings(new ViewModel());
}




	/****There are suggestions for improvement here but I don't quite understand so on back burner
	self.alberta = function(locations) {
	    self.albertaList = [];
	    self.searchList = [];
	    for (i = 0; i < locations.length; i++) {
	    	var item = locations[i].name;
	    	self.albertaList.push(item);
	    	//Create lower case version for case insensitive search
	    	self.searchList.push(item.toLowerCase());
	    }
	    self.results = ko.observableArray(self.albertaList.slice(0));
	};
	//add the hard-coded locations
	self.alberta(model.locations);

	//Checks search against places and filters
	self.updateMap = function () {
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
	}

	/*******map********/

	  //var bounds = new google.maps.LatLngBounds();
	  //var latLngBounds = bounds.extend(googleLatLong);
	  //map.fitBounds(latLngBounds);
	  //Fix zoom after fitBounds
	  //var listener = google.maps.event.addListener(map, "idle", function() {
			if (map.getZoom() > 15) map.setZoom(15);
			google.maps.event.removeListener(listener);
	  });

	  //return map;
/***

	  for (var i = 0; i < x.length; i++) {
	    var location = x[i];
	    var googleLatLong = new google.maps.LatLng(location.lat,location.lng);
		var windowContent = '<h2>' + location.name + '</h2><p>' + location.what + '</p>';
	    //Create and add markers to map
	    var marker = addMarker(self.map, googleLatLong, location.name, windowContent);
	    //Add marker to data model
	    model.markers.push(marker);
	  }

	  //This function is used to create new map markers
		function addMarker(map, latlong, title, content, icon) {
	  		var markerOptions = {
	    		position: latlong,
	    		map: map,
	    		title: title,
	    		animation: google.maps.Animation.DROP,
	    		clickable: true,
				content: windowContent,
	    		icon: image
	  		};

	    	var marker = new google.maps.Marker(markerOptions);
	  		marker.addListener('click', toggleBounce);

			//Adding InfoWindows and bouncing
	  		var infoWindowOptions = {
	    		content: marker.content,
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

	  //Set the starting coordinates to the home location
	  self.homelatlng = new google.maps.LatLng(model.home[0],model.home[1]);
	  self.map = createMap(self.homelatlng);

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
	}

	initMap(model.locations);

}

var ViewModel = new ViewModel();
ko.applyBindings(ViewModel); ****/
