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
    events: {
      'click .add_circ': 'fade',
      'click .new_album': 'newAlbum',
      'blur .new_album': 'createNewAlbum',
      'keyup .new_album': 'keyNewAlbum'
    },
    initialize: function(){
      window.View = this;
    },
    keyNewAlbum: function(){
      if(event.keyCode == 13){
          $(".new_album").blur();
      }
    },
    createNewAlbum: function(){
      if(!$(".new_album").html()){
        $(".new_album").fadeOut('slow');
      } else {

        var circle = new CirclesModel({user_id: window.user_id});
        $name = $(".new_album").html();
        circle.save({session_id: window.session_id, name: $name}, {
          success: function(model, resp){
            if(resp.status == 200)
              window.View.render();
            else
              alert('failed');
          },
          error: function(model, resp){
            if(resp.status == 200)
              window.View.render();
            else
              alert('failed');
          }
        });

      }
    },
    newAlbum : function() {
      $('.new_album').html('');
    },
    fade : function(){
      $(".new").fadeToggle('slow');
    },
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
