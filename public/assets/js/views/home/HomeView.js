define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#container"),

    events: {
      'click button#btn_register': 'register',
      'click button#btn_login': 'login'
    },

    register:function(e){
      $(".fbg").show();
      $email = $("button#btn_register").parent().find("input:text").val();
      $pw = $("button#btn_register").parent().find("input:password").val();
      this.model.clear();
      this.model.set({"email":$email,"password":$pw,"session_id":window.app_router.getCookie("session_id")});
        this.model.save({}, {
          success: function(model, resp){
            window.r = resp;
            document.cookie='session_id='+window.r.session_id+';expires='+(new Date(new Date().getTime()+days*86400000).toGMTString())+';path=/';
            window.location= '#circles';
            window.location.reload();
          },
          error: function(){
            setTimeout('$(".followingBallsG").hide(); $(".acidjs-hellobar").slideToggle();', 2500);
            setTimeout('$(".acidjs-hellobar").slideToggle();', 7000);
          }
        });
    },

    login:function(e){
      $(".fbg").show();
      $email = $("button#btn_login").parent().find("input:text").val();
      $pw = $("button#btn_login").parent().find("input:password").val();
      this.model.clear();
      this.model.set({"email":$email,"password":$pw, "type":"login","session_id":window.app_router.getCookie("session_id")});
        this.model.save({}, {
          success: function(model, resp){
            window.r = resp;
            document.cookie='session_id='+window.r.session_id+';expires='+(new Date(new Date().getTime()+days*86400000).toGMTString())+';path=/';
            window.location.reload();
          },
          error: function(resp){
            window.r = resp;
            alert("failed");
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
