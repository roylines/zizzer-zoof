app.directive('map', [
  function() {
    return {
      restrict: "EA",
      template: "<div class='map'></div>",
      replace: true,
      link: function(scope, element, attrs) {
        var zoom = function() {
          return scope[attrs.zoom || 'zoom'] || 10;
        };

        var center = function() {
          var c = scope[attrs.center || 'center'];
          return new google.maps.LatLng(c.lat, c.lng);
        };

        var options = {
          zoom: zoom(),
          center: center()
        };

        var map = new google.maps.Map(element[0], options);
        scope.$watch(attrs.center || 'center', function() {
          map.setCenter(center());
        }, true);
      }
    };
  }
]);
