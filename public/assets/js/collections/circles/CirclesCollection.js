define([
  'jquery',
  'underscore',
  'backbone',
  'models/circles/CirclesModel'
], function($, _, Backbone, CirclesModel){
  var CirclesCollection = Backbone.Collection.extend({
    model: CirclesModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    }

  });
 
  return CirclesCollection;
});
