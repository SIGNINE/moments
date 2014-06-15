define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var AlbumsModel = Backbone.Model.extend({

  	initialize: function(options){
      this.user_id = options.user_id;
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
      if(this.circle_id)
        return '/circle/' + this.circle_id + '/album';
      else
  		  return '/user/' + this.user_id + '/album';
  	}

  });


  return AlbumsModel;

});
