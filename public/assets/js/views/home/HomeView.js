define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html',
  'models/user/UserModel'
], function($, _, Backbone, UserModel, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#container"),

    events: {
      'click input#btn_register': 'newUser'
    },

    newUser:function(e){
      e.preventDefault();
      alert("hi");
      var user = new UserModel({ first_name: 'naeem', last_name: 'talukdar', email: 'nt', password: 'lk', type: 'login'});
        user.save({
          success: function(model, resp){
            alert("wel done!");
          },
          error: function(){
            alert("aw we failed :(");
          }
        });
    },

    render: function(){
      
      this.$el.hide();
      this.$el.hide().html(homeTemplate).fadeIn();
 
    }

  });

  return HomeView;
  
});
