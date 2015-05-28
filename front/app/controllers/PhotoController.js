app.controller('PhotoController',function($scope,$routeParams){
        $scope.photo_name=$routeParams.photo_name;
        $scope.album_name=$routeParams.album_name;

    }
);
