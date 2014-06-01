define([
  'jquery',
  'underscore',
  'backbone',
  'models/circles/CirclesModel'
], function($, _, Backbone, CirclesModel){
  var CirclesCollection = Backbone.Collection.extend({
    model: CirclesModel,
    
    initialize: function(){ 
      this._meta = {};
    },
    put: function(prop, value){
      this._meta[prop] = value;
    },
    parse: function(response){
      window.rr = response;
      return response.circles;
    },
    url: function(){
      return '/user/'+this._meta['user_id']+'/album';
    }

  });
 
  return CirclesCollection;
});
