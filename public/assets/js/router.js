// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/photos/PhotosView',
], function($, _, Backbone, HomeView, PhotosView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'photos': 'showPhotos',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:showPhotos', function(){
   
        // Call render on the module we loaded in via the dependency array
        var photosView = new PhotosView();
        photosView.render();

    });

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        var homeView = new HomeView();
        homeView.render();
    });

    //Sliding menu script

    var someElement;
    var timeoutId;

    $(".logo").mouseenter(function(){
    $("#navigation").slideToggle();
    }).mouseleave(function(){
        timeoutId = setTimeout(function(){
            $("#navigation").slideToggle();
        }, 250);
    });

    $("#navigation").mouseenter(function(){
      clearTimeout(timeoutId);
    }).mouseleave(function(){
      $("#navigation").slideToggle();
    })
    
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
