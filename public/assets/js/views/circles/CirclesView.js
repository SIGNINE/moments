define([
  'jquery',
  'underscore',
  'backbone',
  'models/circles/CirclesModel',
  'collections/circles/CirclesCollection',
  'views/circles/CirclesListView',
  'text!templates/circles/circlesTemplate.html'
], function($, _, Backbone, CirclesModel, CirclesCollection, CirclesListView, circlesTemplate){

  var CirclesView = Backbone.View.extend({
    el: $("#page"),
    render: function(){

      this.$el.hide();
      this.$el.html(photosTemplate).fadeIn();

      var photo1 = new CirclesModel({title:'Photo 1', url: 'http://i.imgur.com/ODT5hTG.png?1'}); 
      var photo2 = new CirclesModel({title:'Photo 2', url: 'http://i.imgur.com/ODT5hTG.png?1'}); 
      var photo3 = new CirclesModel({title:'Photo 3', url: 'http://i.imgur.com/ODT5hTG.png?1'}); 
      var photo4 = new CirclesModel({title:'Photo 4', url: 'http://i.imgur.com/ODT5hTG.png?1'});
      var photo5 = new CirclesModel({title:'Photo 5', url: 'http://i.imgur.com/ODT5hTG.png?1'});

      var aPhotos = [photo1, 
                      photo2,
                      photo3,
                      photo4,
                      photo5];

      var circlesCollection = new CirclesCollection(aPhotos);  
      var circlesListView = new CirclesListView({ collection: circlesCollection}); 
      
      circlesListView.render(); 


    }
  });

  return CirclesView;
});
