define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var AlbumsModel = Backbone.Model.extend({

  	initialize: function(options){
      this.user_id = options.user_id;
  	},
    parse: function(response, xhr){
      if(response.album)
        console.log("hi");
        return response.album;
      else
        return response;
    },
  	urlRoot: function(){
  		return '/user/' + this.user_id + '/album';
  	}

  });


  return AlbumsModel;

});
