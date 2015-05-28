app.controller('AlbumListController',function($scope,albumProvider,$location) {
    $scope.new_album = {};
    $scope.add_album_error = "";
    $scope.page_load_error="";
    $scope.loading_not_done="true";

    albumProvider.getAlbums(function(err,albums){
          if(err){
              $scope.page_load_error = "Oops,there is some problem in loading...!!";
          }else{

              $scope.loading_not_done="false";
              $scope.albums=albums;
          }
    });


   $scope.addAlbum = function(new_album){
       albumProvider.addNewAlbum(new_album,function (e,album) {
           if(e){
               if(e.statusCode == "503"){
                   $scope.add_album_error = "Oops,there is some problem in adding the album...!!";
               }

               if(e.code == "album_name_missing"){
                   $scope.add_album_error = "Please fill in the album name.";
               }

               else if(e.code == "duplicate_album_name"){
                   $scope.add_album_error = "An album of the same name already exists.";
               }

               else if(e.code == "album_title_missing"){
                   $scope.add_album_error = "Title is required.";
               }

               else if(e.code == "album_description_missing"){
                   $scope.add_album_error = "Description is required.";
               }

               else if(e.code == "album_date_missing"){
                   $scope.add_album_error = "Album date is required.";
               }


               else if(e.code == "Invalid_date"){
                   $scope.add_album_error = "Please fill in a valid date";
               }

           }else{

               $location.path("/albums/"+new_album.name);
           }

       });
   };

});

