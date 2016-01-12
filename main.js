//**************Model***************

function Model() {
	var self = this;
	//Hard coded list of places
	self.places = [
	{
		id: 1,
		name: 'Alberta Co-op',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5589522,
		long: -122.6517163,
		what: 'Yummy, fresh and good for the soul groceries'
	}, {
		id: 2,
		name: 'Alberta Rose Theatre',
		categories: ['all', 'see'],
		lat: 45.5588269,
		long: -122.6367732,
		what: 'Spectacular events'
	}, {
		id: 3,
		name: 'Bolt',
		categories: ['all', 'create'],
		lat: 45.5589988,
		long: -122.6430478,
		what: 'Fabrics, notions and patterns'
	}, {
		id: 4,
		name: 'Collage',
		categories: ['all', 'create'],
		lat: 45.559221,
		long: -122.6479731,
		what: 'All the crafts!'
	}, {
		id: 5,
		name: 'Common Ground',
		categories: ['all', 'soak'],
		lat: 45.5592984,
		long: -122.6304464,
		what: 'Naked outdoor hot tubs'
	}, {
		id: 6,
		name: 'Cruz Room',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5590117,
		long: -122.6412912,
		what: 'Tacos, drink and funky fresh'
	}, {
		id: 7,
		name: 'Just Bob',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5591934,
		long: -122.6409898,
		what: 'Handpies, music, drink and comfy chairs'
	}, {
		id: 8,
		name: 'Salt & Straw',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5592398,
		long: -122.6442831,
		what: 'The most creative flavors of ice cream'
	}
	];

	//set home location for map
	self.home = [45.5590561,-122.6447018];

	//create empty array to store list of map markers
	self.markers = [];

	self.infoWindows = [];
}

var model = new Model();

//**************ViewModel************
function viewModel() {
	var self = this;
	//Set variable to track if marker is open and/or selected
	var markerBounce = null;
	var openInfoWindow = null;

	//Define observables

	//search term
	self.searchTerm = ko.observable("");

	//error message
	self.showErrorMessage = ko.observable ("hidden");

	//places data into an array
	self.initResults = function(places) {
		self.initResultsList = [];
		self.searchList = [];
		for (i = 0; i< places.length; i++) {
			var item = places[i].name;
			self.initResultsList.push(item);
			//lower case version for search ease
			self.searchList.push(item.toLowerCase());
		}
		//create observable array
		self.results = ko.observableArray(self.initResultsList.slice(0));
	};

	self.initResults(model.places);

	//checks search against locations
	self.updateMarkers = function() {
		//clear results and add matches
		self.results.removeAll();
		//loop through markers, hide locations and show matches
		for (var i =0; i < model.markers.length; i++) {
			model.markers[i].setVisible(false);
		}
		self.searchList.forEach(function (item, index, array) {
			if (item.indexOf(self.searchTerm().toLowerCase()) > -1) {
				self.results.push(self.initResultsList[index]);

				model.markers[index].setVisible(true);
			}
		});
			//if filter is empty - all visible
			if (self.searchTerm()=== '') {
				self.results(self.initResultsList.slice(0));
				model.markers.forEach(function (item,index,array) {
					if (!item.getVisible()) {
						item.setVisible(true);
					}
				});
			}
	}
	.bind(this);

	//functions to reset input box and list view etc
	self.clearSearch = function() {
		self.searchTerm('');
		if (openInfoWindow) openInfoWindow.close();
		if (markerBounce) markerBounce.setAnimation(null);
		self.updateMarkers();
	};
//************View*****************
	//Define Google Maps objects
	function initMap(){
		//icon image
		var image = 'artsy.png';
		//setting map element
		var mapElement = document.getElementById('albertamap');

		//Map Options and style
		var mapOptions ={
		center: {
			lat: 45.5590561,
			lng: -122.6447018
		},
		zoom: 16,
		disableDefaultUI:true,
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

		//declaring map
		var map = new google.maps.Map(mapElement,mapOptions);

		return map;
	}

	function addMarker (map, latlng, title, content, icon) {
		var markerOptions ={
			position: {
				lat: albertaPlaces[i].lat,
				lng: albertaPlaces[i].long},
			map: map,
			icon: image,
			animation: google.maps.Animation.DROP,
			title: albertaPlaces[i].name,
			clickable: true,
			id: albertaPlaces[i].id,
			description: albertaPlaces[i].what
		};

		var marker = new google.maps.Marker(markerOptions);
		marker.addListener('click', toggleBounce);

		var infoWindowOptions = {
			content: content
		};

		var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
		model.infoWindows.push(infoWindow);

		google.maps.event.addListener(marker, 'click', function() {
			if (openInfoWindow) openInfoWindow.close();
			openInfoWindow = infoWindow;
			infoWindow.open (map,marker);
		});

		google.maps.event.addListener(infoWindow, 'closeclick', toggleBounce);

		//function to bounce on click

		function toggleBounce() {
			if (markerBounce) {
				markerBounce.setAnimation(null);
			}
			if (markerBounce !=marker) {
				maker.setAnimation(google.maps.Animation.BOUNCE);
				markerBounce = marker;
			} else {
				markerBounce = null;
			}
		}
		return marker;
	}

	//currently selected
	self.selectMarkerFromList = function(currentlySelected) {
		for (var i = 0; i < model.markers.length; i++) {
			if (currentlySelected == model.markers[i].title) {
				toggleInfoWindow[i];
			}
		}
	}.bind(this);

	//function to toggle window
	function toggleInfoWindow(id) {
		google.maps.event.trigger(model.markers[id], 'click');
	}
}

var viewModel = new viewModel();
ko.applyBindings(viewModel);



	/*var albertaPlaces = model.places;

	for (i = 0; i < albertaPlaces.length; i++) {
			marker = new google.maps.Marker({
				position: {
					lat: albertaPlaces[i].lat,
					lng: albertaPlaces[i].long},
				map: map,
				icon: image,
				animation: google.maps.Animation.DROP,
				title: albertaPlaces[i].name,
				id: albertaPlaces[i].id,
				description: albertaPlaces[i].what
			});*/
/* create a map object and specify the DOM element for display.
function initMap() {
	//create map

	//markers
	//function setMarkers(map) {


			albertaInfo(marker, albertaPlaces[i]);
			//bounceSelect(marker, albertaPlaces[i]);
		};
	//}
	// function set markers
	//setMarkers(map);
}

// Attaches an info window to a marker with the provided message.
function albertaInfo(marker, contentString) {
	var contentString = '<strong>' + marker.title + '</strong>' + '<p>' + marker.description + '</p>';

	var infowindow = new google.maps.InfoWindow({
	content: contentString
	});

	marker.addListener('click', function() {
	infowindow.open(map, marker);
		//marker.get('map')
	});
}

/*function bounceSelect() {
	marker.addListener('click', function(){
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
	}});
}*/

/*marker click and bounce functions
function bounceSelect(){
	google.maps.event.addListener(marker[i], 'click', function() {
	for( var i in marker ){
		marker[i].setAnimation(null);
		if( marker[i].id == item.id )
		marker[i].setAnimation(google.maps.Animation.BOUNCE);
	}
});
}*/




