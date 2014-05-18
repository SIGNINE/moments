define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html',
  'models/user/UserModel',
], function($, _, Backbone, UserModel, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#container"),

    events: {
      'click input#btn_register': 'newUser'
    },

    newUser: function(){
      alert("hi");
    },

    render: function(){
      
      $el.hide();
      $el.hide().html(homeTemplate).fadeIn();
 
    }

  });

  return HomeView;
  
});
