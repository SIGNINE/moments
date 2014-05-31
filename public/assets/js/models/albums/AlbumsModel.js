define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var AlbumsModel = Backbone.Model.extend({

  	initialize: function(options){

  	},

  	urlRoot: function(){
  		return '.../user/' + this.get('user_id') + '/album/';
  	}

  });


  return AlbumsModel;

});
