define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#container"),

    events: {
      'click button#btn_register': 'register'
    },

    register:function(e){
      $(".followingBallsG").show();
      $email = $("button#btn_register").parent().find("input:text").val();
      $pw = $("button#btn_register").parent().find("input:password").val();
      this.model.set({"email":$email,"password":$pw});
        this.model.save({}, {
          success: function(){
            //$(".followingBallsG").hide();
          },
          error: function(){
            //$(".followingBallsG").hide();
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
