app.controller('settings', ['$scope',
  function($scope) {

    var input = document.getElementById('searchTextField');
    var options = {
      types: [],
      componentRestrictions: {
        country: 'uk'
      }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      $scope.place = autocomplete.getPlace();
    });

    $scope.setLocation = function(where) {
      console.log('setting location', where);
    };
  }
]);
