define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var UserModel = Backbone.Model.extend({

      initialize: function( options ) {
  		},

		  url : function() {
        if(this.get('type'))
	        return '../user/' + this.get('type');
        else
          return '../user/';
	    },
	    
	    parse : function(res) { 
        // because of jsonp 
	        return res.data;
	    }

    });

  	return UserModel;

});
