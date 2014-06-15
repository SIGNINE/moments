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
    parse: function(response){
      window.rr = response;
      return response.albums;
    },
    url: function(){
      if(!this._meta['filter'])
        return '/user/'+this._meta['user_id']+'/album';
      else 
        return '/circle/'+this._meta['circle_id']+'/album';
      
    }

  });
 
  return AlbumsCollection;
});
