define([
  'jquery',
  'underscore',
  'backbone',
  'models/albums/AlbumsModel'
], function($, _, Backbone, AlbumsModel){
  var AlbumsCollection = Backbone.Collection.extend({
    model: AlbumsModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    },

    url: function(){
      return '.../users/'+this.get('user_id')+'/album.json?session_id='+this.get('session_id');
    }

  });
 
  return AlbumsCollection;
});
