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
      this.$el.html(circlesTemplate).fadeIn();

      var photo1 = new CirclesModel({title:'Circle 1', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo2 = new CirclesModel({title:'Circle 2', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo3 = new CirclesModel({title:'Circle 3', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo4 = new CirclesModel({title:'Circle 4', url: 'http://i.imgur.com/vSRCLfM.jpg'});
      var photo5 = new CirclesModel({title:'Circle 5', url: 'http://i.imgur.com/vSRCLfM.jpg'});

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
