app.controller('editAlbumController',function($scope,$routeParams,albumProvider,$location){

    var album_name=$routeParams.album_name;
    $scope.page_load_error="";
    $scope.edit_album_error="";
    $scope.editAlbum_before=[];
    $scope.temp=true;
    var found=false;

        albumProvider.getAlbums(function(err,album){
            if(err){
                $scope.temp=false;
                $scope.page_load_error="Can't fetch the album data.";
            }else{
                for(var i=0;i<album.length;i++){
                    if(album[i].name == album_name){
                        var found=true;
                        $scope.editAlbum_before=album[i];
                        console.log("Found data");
                    }
                }
                if(!found){
                    $scope.temp=false;
                    $scope.page_load_error="Can't fetch the album data.";
                }
            }
        });

    $scope.editAlbum=function(editdata){
        albumProvider.updateAlbum(editdata,function(e,album){
            if(e){
                if(e.code == "No such album"){
                    $scope.page_load_error = "Please fill in a valid date";
                }
                else if(e.code == "album_name_missing"){
                    $scope.edit_album_error = "Please fill in the album name.";
                }
                else if(e.code == "album_title_missing"){
                    $scope.edit_album_error = "Title is required.";
                }

                else if(e.code == "album_description_missing"){
                    $scope.edit_album_error = "Description is required.";
                }

                else if(e.code == "album_date_missing"){
                    $scope.edit_album_error = "Album date is required.";
                }
                else if(e.code == "Invalid_date"){
                    $scope.edit_album_error = "Please fill in a valid date";
                }

            }else{

                $location.path("/albums");
            }
        });

    };

});
