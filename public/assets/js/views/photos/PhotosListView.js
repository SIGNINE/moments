// Filename: views/photos/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'models/photos/PhotosModel',
  'collections/photos/PhotosCollection',
  'text!templates/photos/photosListTemplate.html'

], function($, _, Backbone, PHotosModel, PhotosCollection, photosListTemplate){
  var PhotosListView = Backbone.View.extend({
    el: $("#photos-list"),

    render: function(){
      
      var data = {
        photos: this.collection.models,
        _: _ 
      };

      var compiledTemplate = _.template( photosListTemplate, data );
      $("#photos-list").html( compiledTemplate ); 
    }
  });
  return PhotosListView;
});
