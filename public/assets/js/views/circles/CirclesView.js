define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/circles/circlesTemplate.html'
], function($, _, Backbone, circlesTemplate){

  var CirclesView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      
      alert("ho ho ho");
      $(".main").fadeOut();
      this.$el.hide();
      this.$el.hide().html(circlesTemplate).fadeIn();
 
    }

  });

  return CirclesView;
  
});