app.directive('mainNavigation', [
  function() {
    return {
      restrict: 'E',
      templateUrl: "/partial/nav",
      replace: true
    };
  }
]);
