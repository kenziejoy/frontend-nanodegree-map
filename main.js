//**************Model***************

//categories and place list
var model = {
	categories: ['all', 'eat', 'drink', 'soak', 'create', 'see'],
	places: [{
		Id:0,
		name: 'Alberta Co-op',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5589522,
		long: -122.6517163,
		what: 'Yummy, fresh and good for the soul groceries'
	}, {
		id: 1,
		name: 'Alberta Rose Theatre',
		categories: ['all', 'see'],
		lat: 45.5588269,
		long: -122.6367732,
		what: 'Spectacular events'
	}, {
		id: 2,
		name: 'Bolt',
		categories: ['all', 'create'],
		lat: 45.5589988,
		long: -122.6430478,
		what: 'Fabrics, notions and patterns'
	}, {
		id: 3,
		name: 'Collage',
		categories: ['all', 'create'],
		lat: 45.559221,
		long: -122.6479731,
		what: 'All the crafts!'
	}, {
		id: 4,
		name: 'Common Ground',
		categories: ['all', 'soak'],
		lat: 45.5592984,
		long: -122.6304464,
		what: 'Naked outdoor hot tubs'
	}, {
		id: 5,
		name: 'Cruz Room',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5590117,
		long: -122.6412912,
		what: 'Tacos, drink and funky fresh'
	}, {
		id: 6,
		name: 'Just Bob',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5591934,
		long: -122.6409898,
		what: 'Handpies, music, drink and comfy chairs'
	}, {
		id: 7,
		name: 'Salt & Straw',
		categories: ['all', 'eat', 'drink'],
		lat: 45.5592398,
		long: -122.6442831,
		what: 'The most creative flavors of ice cream'
	}],
};

//************View*****************

//constructor
var albertaPlaces = model.places;
//declaring variables outside of functions
var marker;
var i;
var map;
var infowindow = null;
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

// create a map object and specify the DOM element for display.
function initMap() {
	//create map
	map = new google.maps.Map(mapElement,mapOptions);
	//markers

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
			});

			albertaInfo(marker, albertaPlaces[i]);
			//bounceSelect(marker, albertaPlaces[i]);
		};
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


//**************ViewModel***********

var ViewModel = function() {
	var self = this;

	self.albertaList = ko.observableArray(albertaPlaces);

	//Set variable to track which map marker is currently selected
	var markerBouncing = null;
	//Set variable to track which infowindow is currently open
	var openInfoWindow = null;

	/* Define observables here */

	//searchTerm - text input
	//updateMap - keyup, submit
	//clearSearch - click
};

var viewModel = new viewModel();
ko.applyBindings(viewModel);


/*extra bits
function bounceSelect() {
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
