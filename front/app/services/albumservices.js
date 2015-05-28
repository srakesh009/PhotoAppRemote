
app.service('albumProvider',function($http,$fileUploader){


    this.getUploader = function (album_name, scope) {
        // create a uploader with options
        return $fileUploader.create({
            scope: scope,
            method: "PUT",
            url: "/v1/albums/" + album_name + "/photos.json"
        });
    };

   this.updateAlbum=function(edit_album,callback){
       var url="/v1/albums/"+edit_album.name+".json";

       if(!edit_album.name){
           return callback({code:"album_name_missing"});
       }


       if(!edit_album.title) {
           return callback({code:"album_title_missing"});
       }

       if(!edit_album.description) {
           return callback({code:"album_description_missing"});
       }

       if(!edit_album.date)  {
           return callback({code:"album_date_missing"});
       }

       if(!is_valid_date(edit_album.date)){
           return callback({code:"Invalid_date"});
       }

       $http.post(url,edit_album).
           success(function(data,status,header,conf){
               callback(null,data);
           }).
           error(function(data,status,header,conf){
               callback(data);
           });
   };

    this.getAlbums=function(callback){
        $http.get("v1/albums.json").
            success(function(data,status,header,conf){
                  callback(null,data);
            }).
            error(function(data,status,header,conf){
                  callback(data);
            });
    };

    this.getPhotos=function(name,callback){
        $http.get("/v1/albums/"+name+"/photos.json").
            success(function(data,status,header,conf){
                callback(null,data);
            }).
            error(function(data,status,header,conf){
                callback(data);
            });
    };


   this.addNewAlbum=function(new_album,callback){

       if(!new_album.name){
           return callback({code:"album_name_missing"});
       }


        if(!new_album.title) {
            return callback({code:"album_title_missing"});
        }

        if(!new_album.description) {
            return callback({code:"album_description_missing"});
        }

        if(!new_album.date)  {
            return callback({code:"album_date_missing"});
        }

        if(!is_valid_date(new_album.date)){
            return callback({code:"Invalid_date"});
        }

       $http.put("/v1/albums.json",new_album).
           success(function(data,status,header,conf){
               callback(null,data);
           }).
           error(function(data,status,header,conf){
               callback(data);
           });
    };


    function is_valid_date(date){
        if(date.match(/^[0-9]{2,4}[\-\/\.,][0-9]{1,2}[\-\/\.,][0-9]{1,2}$/)){
            var d = new Date(date);
            return !isNaN(d.getTime());
        }else return false;
    };

});
