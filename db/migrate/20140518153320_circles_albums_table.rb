class CirclesAlbumsTable < ActiveRecord::Migration
  def change
    create_table :circles_albums, id: false do |t|
      t.belongs_to :circles
      t.belongs_to :albums
    end

    add_index :circles_albums, :circles_id
    add_index :circles_albums, :albums_id
  end
end
