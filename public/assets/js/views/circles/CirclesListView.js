// Filename: views/photos/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'models/circles/CirclesModel',
  'collections/circles/CirclesCollection',
  'text!templates/circles/circlesListTemplate.html'

], function($, _, Backbone, CirclesModel, CirclesCollection, circlesListTemplate){
  var CirclesListView = Backbone.View.extend({
    el: $("#circles-list"),

    render: function(){
      
      var data = {
        circles: this.collection.models,
        _: _ 
      };

      var compiledTemplate = _.template( circlesListTemplate, data );
      $("#circles-list").html( compiledTemplate ); 
    }
  });
  return CirclesListView;
});
