

var app = angular.module('firstapp', ['ngRoute','angularFileUpload','ngCookies' ]);

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

app.filter('my_uppercase',function(){
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


app.filter("my_filter", function () {
    return function (obj, params) {
        if (!Array.isArray(obj)) return obj;

        if (!params.findMe) return obj;
        if (!params.fields || !Array.isArray(params.fields)) return obj;

        var out = [];
        for (var i = 0; i < obj.length; i++) {
            for (var j = 0; j < params.fields.length; j++) {
                if (typeof obj[i][params.fields[j]] != 'string') break;
                if (obj[i][params.fields[j]].indexOf(params.findMe) != -1) {
                    out.push(obj[i]);
                    break;
                }
            }
        }

        return out;
    }
});

//By using this directive as an attribute we can change the css of the elements.
//By changing restriction we ca change it to be an element.

app.directive("myRed", function () {
    return {
        restrict: "A",
        link: function ($scope, element, attrs) {
            element.css({
                color: "red" ,
                padding: "10px" ,
                "font-weight": "bold"  });
        }
    }
});


//By using this directive we can add some html template along with the existing elements.
//Template tag specifies the html template to be added.
// If value of transclude is set to false then we can completely replace the values of element with the new html template.

app.directive("myRedSymbol", function () {
    return {
        restrict: "A",
        template: "&gt;:(&gt;:(&gt;:( <span ng-transclude></span>",
        transclude: true,
        link: function ($scope, element, attrs) {
            element.css({
                color: "red" ,
                padding: "10px" ,
                "font-weight": "bold"  });

        }
    }
});

// By using this directive we can inject some html templates which are stored at the location specified by the url.

app.directive("paAlbum", function () {
    return {
        restrict: "E",
        scope: {
            albumdata: "="
        },
        templateUrl:"app/partials/AlbumDirective.html"
    }
});

app.directive("paAlbumForm", function () {
    return {
        restrict: "E",
        templateUrl:"app/partials/NewAlbumFormDirective.html"
    }
});