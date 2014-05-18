class AlbumsPhotosTable < ActiveRecord::Migration
  def change
    create_table :albums_photos, id: false do |t|
      t.integer :photo_id, null: false
      t.integer :album_id, null: false
    end

    add_index :albums_photos, :photo_id
    add_index :albums_photos, :album_id
  end
end
