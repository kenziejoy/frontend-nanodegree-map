//**************Model***************
var Model = {
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

var albertaPlaces = Model.places;
var marker;
var i;
var map;

function initMap() {
	// Create a map object and specify the DOM element for display.

	map = new google.maps.Map(document.getElementById('albertamap'), {
		center: {
			lat: 45.5590561,
			lng: -122.6447018
		},
		scrollwheel: false,
		zoom: 16
		});

	setMarkers(map);
}
	function setMarkers(map) {
		for (i =0; i < albertaPlaces.length; i++) {
			marker = new google.maps.Marker({
				position: {lat: albertaPlaces[i].lat, lng: albertaPlaces[i].long},
				map: map,
				title: albertaPlaces[i].name,
				description: albertaPlaces[i].what
			});
		}
	}


	//**************ViewModel************

function ViewModel() {
	var self = this;
	self.albertaPlaces = ko.observableArray(Model.places);
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
