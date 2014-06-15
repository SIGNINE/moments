define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var AlbumsModel = Backbone.Model.extend({

  	initialize: function(options){
      this.circle_id = options.circle_id;
  	},
    parse: function(response, xhr){
      if(response.album){
        console.log("hi");
        return response.album;
      }else{
        return response;
      }
    },
  	urlRoot: function(){
  		return '/circle/' + this.circle_id + '/album';
  	}

  });


  return AlbumsModel;

});
