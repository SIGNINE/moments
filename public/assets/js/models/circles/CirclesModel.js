define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var CirclesModel = Backbone.Model.extend({

  	initialize: function(options){
      this.user_id = options.user_id;
  	},
    parse: function(response, xhr){
      if(response.circle){
        return response.circle;
      }else{
        return response;
      }
    },
  	urlRoot: function(){
  		return '/user/' + this.user_id + '/circles';
  	}




  });

  return CirclesModel;

});
