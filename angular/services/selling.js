services.factory('Items', ['$resource',
  function($resource) {
    return $resource('/api/1/items/:id');
  }
]);
