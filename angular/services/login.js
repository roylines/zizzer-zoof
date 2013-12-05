services.factory('Login', ['$resource',
  function($resource) {
    return $resource('/api/1/login');
  }
]);
