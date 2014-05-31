define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html',
  'models/user/UserModel'
], function($, _, Backbone, homeTemplate, UserModel){

  var HomeView = Backbone.View.extend({
    el: $("#container"),

    events: {
      'click button#btn_register': 'register',
      'click button#btn_login': 'login'
    },

    register:function(e){
      e.preventDefault();
      $(".fbg").show();
      $email = $("button#btn_register").parent().find("input:text").val();
      $pw = $("button#btn_register").parent().find("input:password").val();
      var user = new UserModel({ email: $email, password: $pw});
      user.save({}, {
        success: function(model, resp){
          document.cookie='session_id='+window.r.session_id+';expires='+(new Date(new Date().getTime()+86400000).toGMTString())+';path=/';
          window.location= '#circles';
          window.location.reload();
        },
        error: function(model, resp){
          alert("hi");
          alert(model);
          alert(resp);
          window.mm = model;
          window.rr = resp;
          $("#errormsg").html("Registration failed. Please try again.");
          setTimeout('$(".fbg").hide(); $(".acidjs-hellobar").slideToggle();', 2500);
          setTimeout('$(".acidjs-hellobar").slideToggle();', 7000);
        }
      });
    },

    login:function(e){
      e.preventDefault();
      $(".fbg").show();
      $email = $("button#btn_login").parent().find("input:text").val();
      $pw = $("button#btn_login").parent().find("input:password").val();
      var user = new UserModel({ email: $email, password: $pw, type: 'type'});
        user.save({}, {
          success: function(model, resp){
            window.r = resp;
            document.cookie='session_id='+window.r.session_id+';expires='+(new Date(new Date().getTime()+86400000).toGMTString())+';path=/';
            window.location.reload();
          },
          error: function(resp){
            $("#errormsg").html("Invalid login. Please try again.");
            setTimeout('$(".fbg").hide(); $(".acidjs-hellobar").slideToggle();', 2500);
            setTimeout('$(".acidjs-hellobar").slideToggle();', 7000);
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
