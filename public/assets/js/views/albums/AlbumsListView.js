// Filename: views/photos/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'models/albums/AlbumsModel',
  'collections/albums/AlbumsCollection',
  'text!templates/albums/albumsListTemplate.html'

], function($, _, Backbone, AlbumsModel, AlbumsCollection, albumsListTemplate){
  var AlbumsListView = Backbone.View.extend({
    el: $("#photos-list"),

    render: function(){
      
      var data = {
        photos: this.collection.models,
        _: _ 
      };

      window.blah = albumsListTemplate;
      window.bleh = data;
      var compiledTemplate = _.template( albumsListTemplate, data );
      window.ct = compiledTemplate;
      $("#photos-list").prepend( compiledTemplate ); 
    }
  });
  return AlbumsListView;
});
