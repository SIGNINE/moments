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

    render: function(){
      // $('.menu li').removeClass('active');
      // $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      // this.$el.hide();
      // this.$el.html(albumsTemplate).fadeIn();

      $.ajax({
        url: "/user/"+window.user_id+'/album',
        type: "POST",
        data: "title='testing';session_id="+window.session_id,
        success:function(result){
          alert('succes');
          window.rrr = result;
        }
      });

      var photo1 = new AlbumsModel({title:'Album 1', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo2 = new AlbumsModel({title:'Album 2', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo3 = new AlbumsModel({title:'Album 3', url: 'http://i.imgur.com/vSRCLfM.jpg'}); 
      var photo4 = new AlbumsModel({title:'Album 4', url: 'http://i.imgur.com/vSRCLfM.jpg'});
      var photo5 = new AlbumsModel({title:'Album 5', url: 'http://i.imgur.com/vSRCLfM.jpg'});

      var aPhotos = [photo1,photo2,photo3,photo4,photo5];

      window.ap = aPhotos;

      var photosCollection = new AlbumsCollection();
      photosCollection.put("user_id",window.user_id);
      photosCollection.put("session_id",window.session_id); 
      photosCollection.fetch(); 
      window.p = photosCollection;
      var photosListView = new AlbumsListView({ collection: photosCollection}); 
      
      photosListView.render(); 


    }
  });

  return AlbumsView;
});
