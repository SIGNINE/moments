define([
  'jquery',
  'underscore',
  'backbone',
  'models/albums/AlbumsModel',
  'collections/albums/AlbumsCollection',
  'views/albums/AlbumsListView',
  'text!templates/albums/albumsTemplate.html'
], function($, _, Backbone, AlbumsModel, AlbumsCollection, AlbumsListView, albumsTemplate){

  var AlbumsView = Backbone.View.extend({
    el: $("#page"),

    events: {
      'click #submit_album': 'sendAlbum'
    },
    initialize: function(){
      window.View = this;
      $('.original').hover(function(){
        $('.original').toggleClass('add_circle');
      });
      $('.original').mouseout(function(){
        $('.original').addClass('add_circle');
      });
    },
    sendAlbum : function (e){
      var album = new AlbumsModel({user_id: window.user_id});
      $title = $("#submit_album").parent().find("input:text").val();
      album.save({session_id: window.session_id, title: $title}, {
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
    },
    render: function(){
      console.log("Rendering...");
      //This stuff is required for some reason
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.hide();
      this.$el.html(albumsTemplate).fadeIn();

      var aC = new AlbumsCollection();
      aC.put("user_id",window.user_id);
      aC.fetch({data: {session_id: window.session_id}, type: 'GET', success: function(results){

        var albumListView = new AlbumsListView({ collection: aC}); 
        albumListView.render(); 

      }}); 

      


    },

  });

  return AlbumsView;
});
