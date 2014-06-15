// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'models/user/UserModel',
  'views/home/HomeView',
  'views/albums/AlbumsView',
  'views/circles/CirclesView',
], function($, _, Backbone, UserModel, HomeView, AlbumsView, CirclesView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'albums': 'showAlbums',
      'register': 'newUser',
      'login': 'loginUser',
      'circles': 'showCircles',
      'signout': 'signOut',
      // Default
      '*actions': 'defaultAction'
    },
    getCookie: function(name){
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
  });
  
  var initialize = function(){

    window.app_router = new AppRouter;

    var user = new UserModel();
    window.user_id = window.app_router.getCookie("user_id");
    window.session_id = window.app_router.getCookie("session_id");

    Backbone.history.bind("all", function (route, router) {
      window.user_id = window.app_router.getCookie("user_id");
      window.session_id = window.app_router.getCookie("session_id");
    });

    app_router.on('route:showAlbums', function(){

        // Call render on the module we loaded in via the dependency array
        if(!$("#contents").is(":visible"))
          $("#contents").fadeIn();
        var albumsView = new AlbumsView();
        albumsView.render();

    });

    app_router.on('route:signOut', function(){

        document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        app_router.navigate('', {trigger: true});


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
   
        var user = new UserModel({ first_name: 'naeem', last_name: 'talukdar', email: 'nt', password: 'lk'});
        user.save({}, {
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
        var token = app_router.getCookie("session_id");

        if(token){
          app_router.navigate('circles', {trigger: true});
        } else {
          var homeView = new HomeView({model: user});
          homeView.render();
        }
    });

    function doBounce(element, times, distance, speed) {
      for(i = 0; i < times; i++) {
          var d = distance.split('px')[0]/(i+1) + 'px';
          element.animate({marginTop: '-='+d},speed)
              .animate({marginTop: '+='+d},speed);
      }        
    }

    doBounce($('#menuhelp'), 3, '10px', 300);   

    setInterval(doBounce($('#menuhelp'), 3, '10px', 300),2000);
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
