app.directive('googlePlacesAutocomplete', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        console.log('linking', scope, element, attrs);
        var options = {
          types: [],
          componentRestrictions: {
            country: 'uk'
          }
        };       

        var autocomplete = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          scope[attrs.place] = autocomplete.getPlace();
          scope.$apply();
        });
      }
    };
  }
]);
