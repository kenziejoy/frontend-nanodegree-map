/******************MODEL**********************/
var model = [
	{
		name: "Alberta Co-op",
		lat: 45.5589522,
		lng: -122.6517163,
		latLng: {lat: 45.5589522, lng: -122.6517163},
		id: "4abed3f9f964a5201e9020e3"
	},
	{
		name: "Alberta Rose Theatre",
		lat: 45.5588269,
		lng: -122.6367732,
		latLng: {lat: 45.5588269, lng: -122.6367732 },
		id: "4c0a6c73340720a1bf568693"
	},
	{
		name: "Bolt",
		lat: 45.5589988,
		lng: -122.6430478,
		latLng: {lat: 45.5589988, lng: -122.6430478 },
		id: "4a8b071cf964a520390b20e3"
	},
	{
		name: "Collage",
		lat: 45.559221,
		lng: -122.6479731,
		latLng: {lat: 45.559221, lng: -122.6479731},
		id: "4b22dccdf964a520014f24e3"
	},
	{
		name: "Common Ground",
		lat: 45.5592984,
		lng: -122.6304464,
		latLng: {lat: 45.5592984, lng: -122.6304464},
		id: "4adfd877f964a520bd7d21e3"
	},
	{
		name: "Cruz Room",
		lat: 45.5590117,
		lng: -122.6412912,
		latLng: {lat: 45.5590117, lng: -122.6412912},
		id: "cruzroompdx"
	},
	{
		name: "Just Bob",
		lat: 45.5591934,
		lng: -122.6409898,
		latLng: {lat: 45.5591934, lng: -122.6409898},
		id: "56745d56498e87c836b36813"
	},
	{
		name: "Salt & Straw",
		lat: 45.5592398,
		lng: -122.6442831,
		latLng: {lat: 45.5592398, lng: -122.6442831},
		id: "4ddf0d1cfa76b3b015f7a683"
	}
];

//This creates object Place with data
var Place = function(data) {
	this.model = data.name;
	this.latLng = data.latLng;
	this.lat = data.lat;
	this.lng = data.lng;
	this.marker = null;
}

//array to store data
var allPlaces = [];

// For each object in model.locations
model.forEach(function(place) {
		allPlaces.push(new Place(place));
});

/*******************MAP**********************/
// create map
function initMap() {
	var mapOptions = {
		zoom: 16,
		center: {lat: 45.5590561, lng: -122.6447018},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		scrollwheel: false,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: true,
		overviewMapControl: false,
		rotateControl: false,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	  };
	var mapDiv = document.getElementById("mapDiv");
	googleMap = new google.maps.Map(mapDiv, mapOptions);

	/*****************LOAD************************/
	//var viewModel = new ViewModel();
	ko.applyBindings(new ViewModel);
}

//error message
	function googleError() {
	"use strict";
	document.getElementById("mapDiv").innerHTML = "		<h2>Google Maps is not loading. Please try refreshing the page.</h2>";
}


/******************VIEW MODEL*****************/

var ViewModel = function () {

	//variables
	var self = this,
		contentWindow,
		content,
		//Place,
		lat,
		lng,
		image = 'artsy.png',
		latlng = '',
		client_id = '3SHNM1LPOMY3CXWGFPDTAH3WP31ZSIEMWIY3UTUYVDMUPSSD',
		client_secret = 'RBLLKYWKSTAUXJVKLSA42VX4LQ4ANYRCUBPRY1AQ1EOLY4C4',
		infowindow = new google.maps.InfoWindow();

	/**********FourSquare***************/
	// a variable to be used for the Foursuare api
	var fUrl = 'https://api.foursquare.com/v2/venues/search?ll='+ latlng +'&client_id='+ client_id +'&client_secret='+ client_secret +'&v=20151259&m=foursquare&links';

	// For each object in allPlaces create map markers and infowindows
	allPlaces.forEach(function(place, i) {
		lat = place.lat;
		lng = place.lng;
		var drop = google.maps.Animation.DROP;
		var markerOptions = {
			map: self.googleMap,
			position: place.latLng
		};
		var contentName = '<h3>'+model[i].name+'</h3>';

		// Sends a request to foursquare
		$.getJSON('https://api.foursquare.com/v2/venues/search?ll='+ lat+','+lng +'&limit=1&client_id='+ client_id +'&client_secret='+ client_secret +'&v=20151259&m=foursquare',

		// This function takes the foursquare data and processes it.
		function(data) {
			$.each(data.response.venues, function(i,venues){
				content = '<h2>' + contentName + '</h2>' +'<hr>' + '<p>'+ venues.location.formattedAddress[0] + ' ' + venues.location.formattedAddress[1] +'</p>';
				contentWindow = content;
			});
		}).fail(function(){
			content = 'There was an error loading foursquare';
			contentWindow = content;
			});

		place.marker = new google.maps.Marker(markerOptions);
		var marker = place.marker;

		// This adds an Listener for a click function to the marker.
		// It returns an infowindow with content
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
		}
		})(marker));

		// The click function triggers map markers.
		function clicky(){
			google.maps.event.trigger(this.marker, 'click');
			$('#menu-toggle').trigger('click');
		}

		// Toggle visibility of list view in mobile view
		self.Show = ko.observable(false);
		self.toggleVisibility = function() {
			self.Show(!self.Show());
		};
		self.Show = ko.observable(true);

		//This is where the visible markers will be stored
		self.visiblePlaces = ko.observableArray();

		// All markers will start out visible
		allPlaces.forEach(function(place) {
			self.visiblePlaces.push(place);
		});

		// bind userinput for the filter
		self.userInput = ko.observable('');

		// This is the filter function for the Markers.
		self.filterMarkers = function() {
			var searchInput = self.userInput().toLowerCase();
			self.visiblePlaces.removeAll();
			allPlaces.forEach(function(place) {
				place.marker.setVisible(false);
				if (place.name.toLowerCase().indexOf(searchInput) !== -1) {
					self.visiblePlaces.push(place);
				}
		});
		self.visiblePlaces().forEach(function(place) {
			place.marker.setVisible(true);
		});
		};

	});
}
