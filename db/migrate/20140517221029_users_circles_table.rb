class UsersCirclesTable < ActiveRecord::Migration
  def change
    create_table :users_circles, id: false do |t|
      t.belongs_to :users
      t.belongs_to :circles
    end

    add_index :users_circles, :users_id
    add_index :users_circles, :circles_id
  end
end
