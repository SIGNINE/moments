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

    sendAlbum : function (e){
      var album = new AlbumsModel({user_id: window.user_id});
      $title = $("#submit_album").parent().find("input:text").val();
      album.save({session_id: window.session_id, title: $title}, {
        success: function(model, resp){
          if(resp.status == 200)
            alert('success')
          else
            alert('failed')
        },
        error: function(model, resp){
          if(resp.status == 200)
            alert('success')
          else
            alert('failed')
        }
      });
    },
    render: function(){

      //This stuff is required for some reason
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.hide();
      this.$el.html(albumsTemplate).fadeIn();


      var photo1 = new AlbumsModel({title:'Album 1', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo2 = new AlbumsModel({title:'Album 2', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo3 = new AlbumsModel({title:'Album 3', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo4 = new AlbumsModel({title:'Album 4', url: 'http://i.imgur.com/vSRCLfM.jpg'});
      var photo5 = new AlbumsModel({title:'Album 5', url: 'http://i.imgur.com/vSRCLfM.jpg'});

      var aPhotos = [photo1, 
                      photo2,
                      photo3,
                      photo4,
                      photo5];

      var photosCollection = new AlbumsCollection(aPhotos);  
      console.log(photosCollection);
      var aC = new AlbumsCollection();
      aC.put("user_id",window.user_id);
      aC.put("session_id",window.session_id); 
      aC.fetch({data: {session_id: window.session_id}, type: 'GET', success: function(results){alert('hi'); window.ac = aC; console.log(aC); console.log(results);}}); 

      var albumListView = new AlbumsListView({ collection: photosCollection}); 
      
      albumListView.render(); 


    },

  });

  return AlbumsView;
});
