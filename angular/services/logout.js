services.factory('Logout', ['$resource',
  function($resource) {
    return $resource('/api/1/logout');
  }
]);
