app.directive('map', [
  function() {
    return {
      restrict: "EA",
      template: "<div class='map'></div>",
      replace: true,
      link: function(scope, element, attrs) {

        var map;
        var centerChanged = function() {
          if (scope.center === undefined) {
            return;
          }

          var center = new google.maps.LatLng(scope.center.lat, scope.center.lng);

          if (map) {
            map.setCenter(center);
          } else {
            var options = {
              zoom: 15,
              center: center
            };
            map = new google.maps.Map(element[0], options);
          }
        };

        scope.$watch('center', centerChanged, true);
      }
    };
  }
]);
