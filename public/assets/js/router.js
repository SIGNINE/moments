// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'models/user/UserModel',
  'views/home/HomeView',
  'views/photos/PhotosView',
  'views/circles/CirclesView',
], function($, _, Backbone, UserModel, HomeView, PhotosView, CirclesView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'photos': 'showPhotos',
      'register': 'newUser',
      'login': 'loginUser',
      'circles': 'showCircles',
      // Default
      '*actions': 'defaultAction'
    },
    alertTime: function(){
      alert("hi");
    }
  });
  
  var initialize = function(){

    window.app_router = new AppRouter;

    app_router.on('route:showPhotos', function(){

        app_router.alertTime();
        alert("test");
        // Call render on the module we loaded in via the dependency array
        if(!$("#contents").is(":visible"))
          $("#contents").fadeIn();
        var photosView = new PhotosView();
        photosView.render();

    });

    app_router.on('route:showCircles', function(){

        // Call render on the module we loaded in via the dependency array
        if(!$("#contents").is(":visible"))
          $("#contents").fadeIn();
        var circlesView = new CirclesView();
        circlesView.render();

    });

    app_router.on('route:newUser', function(){
       app_router.navigate('circles', {trigger: true});

    });

    app_router.on('route:loginUser', function(){
   
        var user = new UserModel({ first_name: 'naeem', last_name: 'talukdar', email: 'nt', password: 'lk', type: 'login'});
        user.save({
          success: function(model, resp){
            alert("wel done!");
          },
          error: function(){
            alert("aw we failed :(");
          }
        });

    });

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        var user = new UserModel();
        var homeView = new HomeView({model: user});
        homeView.render();
    });

    //Sliding menu script

    $(".acidjs-hellobar").slideUp(); //Keep acidjs slid up first

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
