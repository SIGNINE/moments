define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var UserModel = Backbone.Model.extend({

      initialize: function( options ) {
  			this.query = options.query; 
  		},

		  url : function() {
	        return '../user/' + this.get('type');
	    },
	    
	    parse : function(res) { 
        // because of jsonp 
	        return res.data;
	    }

    });

  	return UserModel;

});
