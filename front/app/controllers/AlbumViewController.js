app.controller('AlbumViewController',function($scope,$routeParams,albumProvider){
    $scope.album_name=$routeParams.album_name;
    $scope.current_album="";
    $scope.page_loading_error="";
    $scope.temp=true;

    albumProvider.getAlbums(function(err,album){
        if(err){
            $scope.add_album_error="Can't fetch the album data.";
        }else{
            for(i=0;i<album.length;i++){
                if(album[i].name == $scope.album_name){
                    $scope.current_album=album[i];
                }
            }
        }
    });

    albumProvider.getPhotos($routeParams.album_name,function(err,photos){
        if(err){
            if(err.message == "No such album"){
                $scope.temp=false;
                console.log($scope.temp);
                $scope.page_loading_error = "I don't know about that album yet, sorry";
            }else{
                $scope.page_loading_error = "Unexpected error. Bug!";
            }
        }else{
            $scope.photos=photos;
            $scope.temp=true;
        }

    });

});
