class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, limit: 100, null: false
      t.string :last_name, limit: 100, null: false
      t.string :avatar_url
      t.string :email, limit: 100, null: false
      t.string :password, limit: 50, null: false
      t.timestamps
    end
    add_index :users, :first_name
    add_index :users, :last_name
    add_index :users, :email
  end
end
