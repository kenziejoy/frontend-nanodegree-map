//**************Model***************

//categories and place list
var model = {
	categories: ['all', 'eat', 'drink', 'soak', 'create', 'see'],
	places: [{
		name: 'Alberta Co-op',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5589522,
		long: -122.6517163,
		what: 'Yummy, fresh and good for the soul groceries'
	}, {
		name: 'Alberta Rose Theatre  ',
		categories: ['all', 'see'],
		lat: 45.5588269,
		long: -122.6367732,
		what: 'Spectacular events'
	}, {
		name: 'Bolt',
		categories: ['all', 'create'],
		lat: 45.5588854,
		long: -122.6696039,
		what: 'Fabrics, notions and patterns'
	}, {
		name: 'Collage',
		categories: ['all', 'create'],
		lat: 45.5591757,
		long: -122.6500247,
		what: 'All the crafts!'
	}, {
		name: 'Common Ground',
		categories: ['all', 'soak'],
		lat: 45.5592984,
		long: -122.6304464,
		what: 'Naked outdoor hot tubs'
	}, {
		name: 'Cruz Room',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5592015,
		long: -122.646342,
		what: 'Tacos, drink and funky fresh'
	}, {
		name: 'Just Bob',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5591434,
		long: -122.6430461,
		what: 'Handpies, music, drink and comfy chairs'
	}, {
		name: 'Pine State Biscuits',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5592015,
		long: -122.646342,
		what: 'Great food'
	}, {
		name: 'Salt & Straw',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5592015,
		long: -122.646342,
		what: 'The most creative flavors of ice cream'
	}]
};

//************View*****************

//declaring variables outside of functions
var albertaPlaces = model.places;
var marker;
var i;
var map;
var infowindow;
//icon image
var image = 'artsy.png';
//info content
var contentString = '<div> marker.title </div>';
//setting map element
var mapElement = document.getElementById('albertamap');
//Map Options
var mapOptions ={
		center: {
			lat: 45.5590561,
			lng: -122.6447018
		},
		scrollwheel: false,
		zoom: 16,
		styles: 	[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
		};

// create a map object and specify the DOM element for display.
function initMap() {
	//create map
	map = new google.maps.Map(mapElement,mapOptions);

	// function set markers
	setMarkers(map);

	//infowindow content
	infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 280
		});

	//markers
	function setMarkers(map) {
	for (i =0; i < albertaPlaces.length; i++) {
		marker = new google.maps.Marker({
			position: {lat: albertaPlaces[i].lat, lng: albertaPlaces[i].long},
			map: map,
			icon: image,
			title: albertaPlaces[i].name,
			description: albertaPlaces[i].what
			});
		}
	}
	//click listener
	marker.addListener('click', function() {
	infowindow.open(map, marker);
	});
}
//**************ViewModel************

function viewModel() {
	var self = this;
	self.albertaList = ko.observableArray(model.places);
}

var viewModel = new viewModel();
ko.applyBindings(viewModel);
