//************View*****************
function initMap() {
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('albertamap'), {
		center: {lat: 45.5590561, lng: -122.6447018},
		scrollwheel: false,
		zoom: 16
		});
		//setMarkers(map);
	}
function setMarkers(map) {
	// Adds markers to the map.
	for (var i = 0; i < self.albertaPlaces.length; i++) {
		var marker = new google.maps.Marker({
			position: {lat: albertaPlaces.latlng[0], lng: albertaPlaces.latlng[1]},
			map: map,
			icon: image
			});
		}
	}
//**************Model***************
var categories = ['all', 'eat', 'drink', 'soak', 'create', 'see'];


//**************ViewModel************
function ViewModel() {
	var self = this;
	self.albertaPlaces = ko.observableArray([
		{
			name: 'Alberta Co-op',
			latlng:['45.5589522','-122.6517163'],
			what: 'Yummy, fresh and good for the soul groceries',
		},{
			name: 'Alberta Rose Theatre  ',
			latlng:['45.5588269','-122.6367732'],
			what: 'Spectacular events',
		},{
			name: 'Bolt',
			latlng:['45.5588854','-122.6696039'],
			what: 'Fabrics, notions and patterns',
		},{
			name: 'Collage',
			latlng:['45.5591757','-122.6500247'],
			what: 'All the crafts!',
		},{
			name: 'Common Ground',
			latlng:['45.5592984','-122.6304464'],
			what: 'Naked outdoor hot tubs',
		},{
			name: 'Cruz Room',
			latlng:['45.5592015','-122.646342,17'],
			what: 'Tacos, drink and funky fresh',
		},{
			name: 'Just Bob',
			latlng:['45.5591434','-122.6430461'],
			what: 'Handpies, music, drink and comfy chairs',
		},{
			name: 'Pine State Biscuits',
			latlng:['45.5592015','-122.646342'],
			what: 'Great food',
		},{
			name: 'Salt & Straw',
			latlng:['45.5592015','-122.646342'],
			what: 'The most creative flavors of ice cream',
		}
	]);
};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
