app.directive('mainFooter', [
  function() {
    return {
      restrict: 'E',
      templateUrl: "/partial/footer",
      replace: true
    };
  }
]);
