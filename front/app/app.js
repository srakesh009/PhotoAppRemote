

var app = angular.module('firstapp', ['ngRoute','angularFileUpload' ]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/albums', {
            controller: 'AlbumListController',
            templateUrl: 'app/partials/album_list_partial.html'
        }).
        when('/albums/:album_name',
        {
            controller: 'AlbumViewController',
            templateUrl: 'app/partials/album_view_partial.html'
        }

    )
        .when("/album/:album_name/upload",
        {
            controller: "AlbumUploadController",
            templateUrl: "/app/partials/album_uploader.html"
        }
    )

        .when('/', {
            redirectTo: '/albums'
        })
        .when('/404Page', {

            templateUrl: 'app/partials/404_page_partial.html',
            controller: 'Controller404'
        })
        .when('/albums/:album_name/photos/:photo_name',{
            templateUrl: 'app/partials/photo_partial.html',
            controller: 'PhotoController'
        }).
        when('/albums/:album_name/edit',{
            templateUrl:"app/partials/editAlbum.html",
            controller:"editAlbumController"
        })
        .otherwise(
        {
            redirectTo: '/404Page'
        }
    )

});

app.filter('old_yellow',function(){
    return function(str){
        if(typeof str != 'string')
            return str;
        return str.toUpperCase();
    };
});


app.filter("pluralise", function () {
    return function (count, nouns) {
        if (count == 1) return count + " " + nouns+".";
        else return count + " " + nouns+"s.";
    }
});

app.filter('date_format',function(){
    return function(date){
        var d=new Date(date);
       var year=d.getYear();
        var month=d.getMonth();
        var day=d.getDay();

        return day+""+month+""+year;
    }
});

