define([
  'jquery',
  'underscore',
  'backbone',
  'models/photos/PhotosModel',
  'collections/photos/PhotosCollection',
  'views/photos/PhotosListView',
  'text!templates/photos/photosTemplate.html'
], function($, _, Backbone, PhotosModel, PhotosCollection, PhotosListView, photosTemplate){

  var PhotosView = Backbone.View.extend({
    el: $("#page"),
    render: function(){
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.hide();
      this.$el.html(photosTemplate).fadeIn();

      var photo1 = new PhotosModel({title:'Photo 1', url: 'http://i.imgur.com/ODT5hTG.png?1'}); 
      var photo2 = new PhotosModel({title:'Photo 2', url: 'http://i.imgur.com/ODT5hTG.png?1'}); 
      var photo3 = new PhotosModel({title:'Photo 3', url: 'http://i.imgur.com/ODT5hTG.png?1'}); 
      var photo4 = new PhotosModel({title:'Photo 4', url: 'http://i.imgur.com/ODT5hTG.png?1'});
      var photo5 = new PhotosModel({title:'Photo 5', url: 'http://i.imgur.com/ODT5hTG.png?1'});

      var aPhotos = [photo1, 
                      photo2,
                      photo3,
                      photo4,
                      photo5];

      var photosCollection = new PhotosCollection(aPhotos);  
      var photosListView = new PhotosListView({ collection: photosCollection}); 
      
      photosListView.render(); 


    }
  });

  return PhotosView;
});
