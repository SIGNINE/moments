define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var AlbumsModel = Backbone.Model.extend({

  	initialize: function(options){
      this.user_id = options.user_id;
  	},

  	urlRoot: function(){
  		return '.../user/' + this.user_id + '/album';
  	}

  });


  return AlbumsModel;

});
