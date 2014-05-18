define([
  'jquery',
  'underscore',
  'backbone',
  'models/user/UserModel',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate, UserModel){

  var HomeView = Backbone.View.extend({
    el: $("#container"),

    events: {
      'click button#btn_register': 'register'
    },

    register:function(e){
      alert("hi");
    },

    render: function(){
      
      this.$el.hide();
      this.$el.hide().html(homeTemplate).fadeIn();
 
    }

  });

  return HomeView;
  
});
