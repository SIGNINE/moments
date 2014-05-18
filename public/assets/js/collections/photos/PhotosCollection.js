define([
  'jquery',
  'underscore',
  'backbone',
  'models/photos/PhotosModel'
], function($, _, Backbone, PhotosModel){
  var PhotosCollection = Backbone.Collection.extend({
    model: PhotosModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    }

  });
 
  return PhotosCollection;
});
