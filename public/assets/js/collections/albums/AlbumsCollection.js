define([
  'jquery',
  'underscore',
  'backbone',
  'models/albums/AlbumsModel'
], function($, _, Backbone, AlbumsModel){
  var AlbumsCollection = Backbone.Collection.extend({
    model: AlbumsModel,
    
    initialize: function(){
      this._meta = {};
    },
    put: function(prop, value){
      this._meta[prop] = value;
    },
    url: function(){
      return '.../users/'+this.get('user_id')+'/album.json?session_id='+this.get('session_id');
    }

  });
 
  return AlbumsCollection;
});
