class CreateCircles < ActiveRecord::Migration
  def change
    create_table :circles do |t|
      t.string :name, limit: 100, null: false
      t.timestamps
    end

    add_index :circles, :name
  end
end
