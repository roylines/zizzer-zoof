app.controller('landing', ['$scope',
  function($scope) {
    if ($scope.me) {
      $scope.nearby = [{
          title: 'Double divan bed for sale with 4 integrated drawers.',
          image: 'http://ecx.images-amazon.com/images/I/71wnFFuhBOL._SL1500_.jpg',
          price: 10.00,
          status: 'available',
          expires: new Date().getTime() + 200000,
          location: 'Didcot',
          distance: '20 miles'
        }, {
          title: 'Pine coffee table.',
          image:'http://ecx.images-amazon.com/images/I/41xAa7NzeiL.jpg', 
          price: 10.00,
          status: 'available',
          expires: new Date().getTime() + 200000,
          location: 'Didcot',
          distance: '20 miles'
        }, {
          title: 'Oak effect dining room table and benches. Table 121x75cm. Benches 88x34x81height cm',
          image:'http://ecx.images-amazon.com/images/I/31O2LZoXZ0L.jpg', 
          price: 10.00,
          status: 'offers',
          expires: new Date().getTime() + 200000,
          location: 'Didcot',
          distance: '20 miles'
        }
      ];
    }
  }
]);
