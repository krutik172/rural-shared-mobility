# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2026_02_23_111552) do
  create_table "drivers", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "license_status", default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_drivers_on_user_id"
  end

  create_table "pricing_rules", force: :cascade do |t|
    t.string "vehicle_type"
    t.decimal "base_fee"
    t.decimal "price_per_km"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ride_groups", force: :cascade do |t|
    t.decimal "origin_lat", precision: 10, scale: 6
    t.decimal "origin_lng", precision: 10, scale: 6
    t.string "origin_name"
    t.decimal "dest_lat", precision: 10, scale: 6
    t.decimal "dest_lng", precision: 10, scale: 6
    t.string "dest_name"
    t.string "pickup_landmark"
    t.datetime "scheduled_time"
    t.integer "vehicle_id"
    t.integer "driver_id"
    t.string "status", default: "forming"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["driver_id"], name: "index_ride_groups_on_driver_id"
    t.index ["vehicle_id"], name: "index_ride_groups_on_vehicle_id"
  end

  create_table "ride_members", force: :cascade do |t|
    t.integer "ride_group_id", null: false
    t.integer "travel_request_id", null: false
    t.decimal "fare_split", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ride_group_id"], name: "index_ride_members_on_ride_group_id"
    t.index ["travel_request_id"], name: "index_ride_members_on_travel_request_id"
  end

  create_table "travel_requests", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "origin_lat", precision: 10, scale: 6
    t.decimal "origin_lng", precision: 10, scale: 6
    t.string "origin_name"
    t.decimal "dest_lat", precision: 10, scale: 6
    t.decimal "dest_lng", precision: 10, scale: 6
    t.string "dest_name"
    t.string "pickup_landmark"
    t.date "date"
    t.datetime "time_window_start"
    t.datetime "time_window_end"
    t.integer "seats_required", default: 1
    t.decimal "max_budget", precision: 10, scale: 2
    t.string "status", default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_travel_requests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "phone", null: false
    t.string "name", null: false
    t.boolean "is_verified", default: false
    t.string "role", default: "passenger"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["phone"], name: "index_users_on_phone", unique: true
  end

  create_table "vehicles", force: :cascade do |t|
    t.integer "driver_id", null: false
    t.string "vehicle_type"
    t.integer "capacity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["driver_id"], name: "index_vehicles_on_driver_id"
  end

  add_foreign_key "drivers", "users"
  add_foreign_key "ride_groups", "drivers"
  add_foreign_key "ride_groups", "vehicles"
  add_foreign_key "ride_members", "ride_groups"
  add_foreign_key "ride_members", "travel_requests"
  add_foreign_key "travel_requests", "users"
  add_foreign_key "vehicles", "drivers"
end
