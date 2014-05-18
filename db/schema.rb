# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140517235738) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: true do |t|
    t.string   "title",      null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "albums", ["user_id"], name: "index_albums_on_user_id", using: :btree

  create_table "albums_photos", id: false, force: true do |t|
    t.integer "photo_id", null: false
    t.integer "album_id", null: false
  end

  add_index "albums_photos", ["album_id"], name: "index_albums_photos_on_album_id", using: :btree
  add_index "albums_photos", ["photo_id"], name: "index_albums_photos_on_photo_id", using: :btree

  create_table "circles", force: true do |t|
    t.string   "name",       limit: 100, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "circles", ["name"], name: "index_circles_on_name", using: :btree

  create_table "photos", force: true do |t|
    t.string   "title",      null: false
    t.string   "url"
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "photos", ["user_id"], name: "index_photos_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "first_name", limit: 100, null: false
    t.string   "last_name",  limit: 100, null: false
    t.string   "avatar_url"
    t.string   "email",      limit: 100, null: false
    t.string   "password",   limit: 50,  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["first_name"], name: "index_users_on_first_name", using: :btree
  add_index "users", ["last_name"], name: "index_users_on_last_name", using: :btree

  create_table "users_circles", id: false, force: true do |t|
    t.integer "users_id"
    t.integer "circles_id"
  end

  add_index "users_circles", ["circles_id"], name: "index_users_circles_on_circles_id", using: :btree
  add_index "users_circles", ["users_id"], name: "index_users_circles_on_users_id", using: :btree

end
