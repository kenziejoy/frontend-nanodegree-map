/*******************MAP**********************/
// create map
var map;

function initMap() {
	"use strict";
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
	map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

	/*****************LOAD************************/
	//so it doesn't initialize before Maps load
	//var viewModel = new ViewModel();
	ko.applyBindings(new ViewModel());
}

//error message
function googleError() {
"use strict";
document.getElementById("mapDiv").innerHTML = "		<h2>Google Maps is not loading. Please try refreshing the page.</h2>";
}

/******************MODEL**********************/
var locations = [
	{
		name: "Alberta Co-op",
		lat: 45.5589522,
		lng: -122.6517163,
		latLng: {lat: 45.5589522, lng: -122.6517163},
		id: "4abed3f9f964a5201e9020e3"
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

/******************CONSTRUCTOR***************/
var Place = function(data) {
	"use strict";
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.id = ko.observable(data.id);
	this.marker = ko.observable();
	this.phone = ko.observable('');
	this.description = ko.observable('');
	this.address = ko.observable('');
	this.rating = ko.observable('');
	this.url = ko.observable('');
	this.canonicalUrl = ko.observable('');
	this.photoPrefix = ko.observable('');
	this.photoSuffix = ko.observable('');
	this.contentString = ko.observable('');
};

/******************VIEW MODEL*****************/

var ViewModel = function () {
	"use strict";
	//variables
	var self = this;

	var	CLIENT_ID = '3SHNM1LPOMY3CXWGFPDTAH3WP31ZSIEMWIY3UTUYVDMUPSSD',
		CLIENT_SECRET = 'RBLLKYWKSTAUXJVKLSA42VX4LQ4ANYRCUBPRY1AQ1EOLY4C4',
		image = 'artsy.png',
		infowindow = new google.maps.InfoWindow({maxWidth:200}),
		marker;

	//array of places
	this.places = ko.observableArray([]);
	
	//call the constructor!
	locations.forEach(function(placeItem) {
		self.places.push(new Place(placeItem));
	});

	//set markers, request foursquare data and set listeners
	self.places().forEach(function (placeItem) {
		
		//define markers
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(placeItem.lat(), placeItem.lng()),
			map: map,
			icon: image,
			animation: google.maps.Animation.DROP
		});
		placeItem.marker = marker;

		/**********FourSquare***************/
		$.ajax({
			url:'https://api.foursquare.com/v2/venues/',
			dataType: 'json',
			data: 'search?ll='+ placeItem.lat() +','+ placeItem.lng() +'&?client_id='+ CLIENT_ID +'&client_secret='+ CLIENT_SECRET +'&v=20140806&m=foursquare',
			//

			success: function (data) {
				var result = data.response.venue;
				var contact = result.hasOwnProperty('contact') ? result.contact : '';
				if (contact.hasOwnProperty('formattedPhone')) {
					placeItem.phone(contact.formattedPhone || '');
				}

				var location = result.hasOwnProperty('location') ? result.location : '';
				if (location.hasOwnProperty('address')) {
					placeItem.address(location.address || '');
				}

				var bestPhoto = result.hasOwnProperty('bestPhoto') ? result.bestPhoto : '';
				if (bestPhoto.hasOwnProperty('prefix')) {
					placeItem.photoPrefix(bestPhoto.prefix || '');
				}

				if (bestPhoto.hasOwnProperty('suffix')) {
					placeItem.photoSuffix(bestPhoto.suffix || '');
				}

				var description = result.hasOwnProperty('description') ? result.description : '';
				placeItem.description(description || '');

				var rating = result.hasOwnProperty('rating') ? result.rating : '';
				placeItem.rating(rating || 'none');

				var url = result.hasOwnProperty('url') ? result.url : '';
				placeItem.url(url || '');

				placeItem.canonicalUrl(result.canonicalUrl);

				// Infowindow code is in the success function so that the error message

				// Content of the infowindow
				var contentString = '<div id="iWindow"><h4>' + placeItem.name() + '</h4><div id="pic"><img src="' +
						placeItem.photoPrefix() + '110x110' + placeItem.photoSuffix() +
						'" alt="Image Location"></div><p>Information from Foursquare:</p><p>' +
						placeItem.phone() + '</p><p>' + placeItem.address() + '</p><p>' +
						placeItem.description() + '</p><p>Rating: ' + placeItem.rating() +
						'</p><p><a href=' + placeItem.url() + '>' + placeItem.url() +
						'</a></p><p><a target="_blank" href=' + placeItem.canonicalUrl() +
						'>Foursquare Page</a></p><p><a target="_blank" href=https://www.google.com/maps/dir/Current+Location/' +
						placeItem.lat() + ',' + placeItem.lng() + '>Directions</a></p></div>';

				// Add infowindows
					google.maps.event.addListener(placeItem.marker, 'click', function () {
					infowindow.open(map, this);
					// Bounce animation
					placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
					setTimeout(function () {
						placeItem.marker.setAnimation(null);
					}, 800);
					infowindow.setContent(contentString);
				});
		},

			// Alert the user on error.
			error: function (e) {
				infowindow.setContent('<h5>Foursquare data is unavailable.</h5>');
				document.getElementById("error").innerHTML = "<h4>Foursquare data is unavailable. Please try refreshing.</h4>";
		}
		});
		
		//event listener for error
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, this);
			placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function () {
				placeItem.marker.setAnimation(null);
			}, 800);
		});
	});

	// Activate the right marker when the user clicks the list
	self.showInfo = function (placeItem) {
		google.maps.event.trigger(placeItem.marker, 'click');
	};

	// Array containing markers based on search
	self.visible = ko.observableArray();

	// All markers are visible by default
	self.places().forEach(function (place) {
		self.visible.push(place);
	});

	// Track input
	self.userInput = ko.observable('');
	
	//if input matches leave marker
	self.filterMarkers = function () {
		// Set all markers and places to not visible.
		var searchInput = self.userInput().toLowerCase();
		self.visible.removeAll();
		
		self.places().forEach(function (place) {
			place.marker.setVisible(false);
				// If user input is included in the name, set marker as visible
				if (place.name().toLowerCase().indexOf(searchInput) !== -1) {
				self.visible.push(place);
			}
		});
		
		self.visible().forEach(function (place) {
			place.marker.setVisible(true);
		});
	};
};









