define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var UserModel = Backbone.Model.extend({

      initialize: function( options ) {
  			this.query = options.query; 
  		},

		  url : function() {
	        return '../user';
	    },
	    
	    parse : function(res) { 
        // because of jsonp 
	        return res.data;
	    }

    });

  	return OwnerModel;

});
