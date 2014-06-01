define([
  'jquery',
  'underscore',
  'backbone',
  'models/circles/CirclesModel',
  'collections/circles/CirclesCollection',
  'views/circles/CirclesListView',
  'text!templates/circles/circlesTemplate.html'
], function($, _, Backbone, CirclesModel, CirclesCollection, CirclesListView, circlesTemplate){

  var CirclesView = Backbone.View.extend({
    el: $("#page"),
    render: function(){

      this.$el.hide();
      this.$el.html(circlesTemplate).fadeIn();

      var circlesCollection = new CirclesCollection();
      circlesCollection.put("user_id",window.user_id);
      circlesCollection.fetch({data: {session_id: window.session_id}, type: 'GET', success: function(){
        var circlesListView = new CirclesListView({ collection: circlesCollection}); 
        circlesListView.render(); 
      }}); 




    }
  });

  return CirclesView;
});
