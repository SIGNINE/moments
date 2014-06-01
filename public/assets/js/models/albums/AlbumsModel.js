define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var AlbumsModel = Backbone.Model.extend({

  	initialize: function(options){
      this.user_id = options.user_id;
  	},
    parse: function(response, xhr){
      console.log(response.album);
      console.log(response.title);
      if(response.type =="update")
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
