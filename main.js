function app(){
	/***********************MODEL***************************/
	var model = [
		{
			name: 'Alberta Co-op',
			lat: 45.5589522,
			lng: -122.6517163,
			latLng: {lat: 45.5589522, lng: -122.6517163}
		},
		{
			name: 'Alberta Rose Theatre',
			lat: 45.5588269,
			lng: -122.6367732,
			latLng: {lat: 45.5588269, lng: -122.6367732 }
		},
		{
			name: 'Bolt',
			lat: 45.5589988,
			lng: -122.6430478,
			latLng: {lat: 45.5589988, lng: -122.6430478 }
		},
		{
			name: 'Collage',
			lat: 45.559221,
			lng: -122.6479731,
			latLng: {lat: 45.559221, lng: -122.6479731}
		},
		{
			name: 'Common Ground',
			lat: 45.5592984,
			lng: -122.6304464,
			latLng: {lat: 45.5592984, lng: -122.6304464}
		},
		{
			name: 'Cruz Room',
			lat: 45.5590117,
			lng: -122.6412912,
			latLng: {lat: 45.5590117, lng: -122.6412912}
		},
		{
			name: 'Just Bob',
			lat: 45.5591934,
			lng: -122.6409898,
			latLng: {lat: 45.5591934, lng: -122.6409898}
		},
		{
			name: 'Salt & Straw',
			lat: 45.5592398,
			lng: -122.6442831,
			latLng: {lat: 45.5592398, lng: -122.6442831}
		}];

	/******************VIEW MODEL***************************/

	var ViewModel = function () {

		var self = this;

		//variables
		var contentWindow, content, Place;
		var image = 'artsy.png';

		//array to store data
		self.allPlaces = [];

		// For each object in model.locations
			model.forEach(function(place) {
				self.allPlaces.push(new Place(place));
			});

		/****************MAP**********************/
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

	// create map
	function initMap() {
		googleMap = new google.maps.Map(mapDiv, mapOptions);
	}
		/**********FourSquare***************/
		// Some variables to be used for the Foursuare api
		var latlng = '';
		var client_id = '3SHNM1LPOMY3CXWGFPDTAH3WP31ZSIEMWIY3UTUYVDMUPSSD';
		var client_secret = 'RBLLKYWKSTAUXJVKLSA42VX4LQ4ANYRCUBPRY1AQ1EOLY4C4';
		var fUrl = 'https://api.foursquare.com/v2/venues/search?ll='+ latlng +'&client_id='+ client_id +'&client_secret='+ client_secret +'&v=20151259&m=foursquare&links';
		var lat, lng;
		infowindow = new google.maps.InfoWindow();

		// For each object in allPlaces create map markers and infowindows
		self.allPlaces.forEach(function(place, i) {
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
			self.allPlaces.forEach(function(place) {
				self.visiblePlaces.push(place);
			});

			// bind userinput for the filter
			self.userInput = ko.observable('');

			// This is the filter function for the Markers.
			self.filterMarkers = function() {
				var searchInput = self.userInput().toLowerCase();
				self.visiblePlaces.removeAll();
				self.allPlaces.forEach(function(place) {
					place.marker.setVisible(false);
					if (place.name.toLowerCase().indexOf(searchInput) !== -1) {
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
		});
	}

	/*****************LOAD*********************************/
		var viewModel = new ViewModel();
		ko.applyBindings(viewModel);
}
