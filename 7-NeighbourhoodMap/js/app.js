/*
 Foursquare API Constants.
 */
var CLIENT_ID = 'BNM2EI5GCEEP4YXDFB3WB1DPB0Z3EKWJX5TGFWTYR0BRQ4OR';
var CLIENT_SECRET = '4X3YWTBFBOUQW31LE1TTRE2INBI0JLBEYGSSEXJMZPW2IOSY';
var SEARCH_LIMIT = 15;
var FSQ_REQUEST_URL = 'https://api.foursquare.com/v2/venues/search?&client_id=' +
    CLIENT_ID + '&client_secret=' + CLIENT_SECRET +
    '&v=20170127&near=Dubai&limit=' + SEARCH_LIMIT;

/*
 GLOBAL Variables
 */

var map = null;
var infoWindow = null;
var viewModel = null;

/*
 Map Data Model.
 */

/*
 * @description Represent's a location in the neighbourhood.
 * @constructor
 * @param {dict} data - the information about the location.
 * */
var MapModel = function (data) {
    var self = this;

    this.name = data.name;
    this.lng = data.lng;
    this.lat = data.lat;
    this.loc = data.loc;
    this.state = data.state;
    this.phone = data.phone;
    this.country = data.country;
    this.url = data.url;

    this.address = ko.pureComputed(function () {
        if ((self.loc && self.state && self.country) !== undefined)
            return self.loc + ', ' + self.state + ', ' + self.country;
        else
            return 'No address found';
    });

    this.marker = data.marker;
    this.visibleMarker = ko.observable(true);
    this.infoWindowContent = data.infoWindowContent;
};


/*
 * @description The ViewModel for the application.
 * */

var AppViewModel = function () {
    var self = this;

    this.locations = ko.observableArray();
    this.filterText = ko.observable('');
    this.hamburgerMenuShown = ko.observable(false);
    this.showHamburgerMenu = function () {
        this.hamburgerMenuShown(!this.hamburgerMenuShown());
    };
    /*
     @description Event handler for LocationList Item Click event.
     */
    this.showItemInfo = function (e) {
        infoWindow.setContent(e.infoWindowContent);
        infoWindow.open(map, e.marker);
        toggleBounce(e.marker);

        map.panTo(e.marker.getPosition());
    };

    this.loadLocations = function (req_url) {
        $.getJSON(req_url, function (data) {
            var venues = data.response.venues;
            venues.forEach(function (venue) {
                var marker = new google.maps.Marker({
                    map: null,
                    animation: google.maps.Animation.DROP,
                    position: {lat: venue.location.lat, lng: venue.location.lng},
                    title: venue.name
                });
                var ModelVenue = new MapModel({
                    'name': venue.name,
                    'lat': venue.location.lat,
                    'lng': venue.location.lng,
                    'phone': venue.contact.phone,
                    'loc': venue.location.address,
                    'state': venue.location.state,
                    'country': venue.location.country,
                    'url': venue.url,
                    'marker': marker
                });
                ModelVenue.infoWindowContent = createInfoWindow(ModelVenue);

                self.locations.push(ModelVenue);
            });

            // Re-Load the markers on the map once the data arrives.
            setupMarkers();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alertify.error('An error occurred trying to fetch data. <br />' + errorThrown);
        });
    };

    this.filteredLocations = ko.computed(function () {
        var ans = [];
        for (var i = 0; i < self.locations().length; i++) {
            var currLoc = self.locations()[i];
            if (currLoc.name.toLowerCase().indexOf(self.filterText().toLowerCase()) !== -1) {
                currLoc.visibleMarker(true);
                ans.push(currLoc);
            } else {
                currLoc.visibleMarker(false);
            }
        }
        return ans;
    });
};


/*
 * @description Hides the markers for filtered-out locations.
 */

function editMap() {
    if (map === null)
        return;

    var bounds = new google.maps.LatLngBounds();
    viewModel.locations().forEach(function (location) {
        location.marker.setVisible(location.visibleMarker());
        bounds.extend(location.marker.position);
    });
    map.fitBounds(bounds);
}

function setupMarkers() {
    var bounds = new google.maps.LatLngBounds();
    viewModel.locations().forEach(function (currentLocation) {
        bounds.extend(currentLocation.marker.position);
        currentLocation.marker.setMap(map);
        currentLocation.marker.addListener('click', function (currentLocation) {
            return function () {
                infoWindow.setContent(currentLocation.infoWindowContent);
                infoWindow.open(map, currentLocation.marker);
                toggleBounce(currentLocation.marker);
            }
        }(currentLocation));

    });

    map.fitBounds(bounds);
}
/*
 * @description Error handler for loading of Google Maps APIs.
 * */
function mapLoadingError() {
    alertify.error('Failed to load Google Maps <br /> Please check your internet connection.');
}

/*
 *    HELPER FUNCTIONS
 */


/*
 * @description Adds a bounce animation to the marker when clicked,
 * stops after 1 sec.
 * */

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1400);
    }
}

/*
 * @description Creates HTML string to display in GMaps InfoWindow.
 * @returns {string} Formatted HTML string.
 * */

function createInfoWindow(location) {

    var url_href = '<a href="' + location.url + '"><i class="fa fa-home"></i> ' + location.url + '</a><br />';
    var url_html = location.url !== undefined ? url_href : '<i class="fa fa-home"></i> No website found.<br />';

    var phone_href = '<a href="tel:' + location.phone + '"><i class="fa fa-phone"></i>' + location.phone + '</a><br />';
    var phone_html = location.phone !== undefined ? phone_href : '<i class="fa fa-phone"></i> No phone number(s) found.<br />';

    return '<div id="info-window-content">' +
        '<h3 id="firstHeading" class="firstHeading">' + location.name + '</h3>' +
        '<i class="fa fa-location-arrow"></i> ' + location.address() + '<br />' +
        phone_html + url_html + '</div>';
}


/*
 * UI HELPERS
 */

$(document).ready(function () {
    // run test on initial page load
    checkSize();

    // run test on resize of the window
    $(window).resize(checkSize);
});

//Function to the css rule
function checkSize() {
    if ($('nav').css('display') === 'none') {
        $('.main-container').removeClass('sidebar_shown');
        $('.sidebar').removeClass('sidebar_shown');
    }
}

/*
 * @description The Starting Point
 */
function startApp() {
    viewModel = new AppViewModel();
    ko.applyBindings(viewModel);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 30
    });

    infoWindow = new google.maps.InfoWindow();
    viewModel.loadLocations(FSQ_REQUEST_URL);
    // Subscribe to filteredLocations, change Map Items when it's changed.
    viewModel.filteredLocations.subscribe(function () {
        editMap();
    });
}
