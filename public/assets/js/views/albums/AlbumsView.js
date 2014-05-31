define([
  'jquery',
  'underscore',
  'backbone',
  'models/albums/AlbumsModel',
  'collections/albums/AlbumsCollection',
  'views/albums/AlbumsListView',
  'text!templates/albums/albumsTemplate.html'
], function($, _, Backbone, AlbumsModel, AlbumsCollection, AlbumsListView, albumsTemplate){

  var AlbumsView = Backbone.View.extend({
    el: $("#page"),
    render: function(){

      //This stuff is required for some reason
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.hide();
      this.$el.html(albumsTemplate).fadeIn();

      var AlbumsCollection = new AlbumsCollection();
      AlbumsCollection.put("user_id",window.user_id);
      AlbumsCollection.put("session_id",window.session_id); 
      AlbumsCollection.fetch(); 

      var albumListView = new AlbumsListView({ collection: AlbumsCollection}); 
      
      albumListView.render(); 


    }
  });

  return AlbumsView;
});
