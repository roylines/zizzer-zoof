services.factory('Users', ['$resource',
  function($resource) {
    return $resource('/api/1/users/:name');
  }
]);
