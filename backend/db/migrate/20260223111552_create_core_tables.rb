class CreateCoreTables < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :phone, null: false
      t.string :name, null: false
      t.boolean :is_verified, default: false
      t.string :role, default: "passenger"

      t.timestamps
    end
    add_index :users, :phone, unique: true

    create_table :drivers do |t|
      t.references :user, null: false, foreign_key: true
      t.string :license_status, default: "pending"

      t.timestamps
    end

    create_table :vehicles do |t|
      t.references :driver, null: false, foreign_key: true
      t.string :vehicle_type
      t.integer :capacity

      t.timestamps
    end

    create_table :travel_requests do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :origin_lat, precision: 10, scale: 6
      t.decimal :origin_lng, precision: 10, scale: 6
      t.string :origin_name
      t.decimal :dest_lat, precision: 10, scale: 6
      t.decimal :dest_lng, precision: 10, scale: 6
      t.string :dest_name
      t.string :pickup_landmark
      t.date :date
      t.datetime :time_window_start
      t.datetime :time_window_end
      t.integer :seats_required, default: 1
      t.decimal :max_budget, precision: 10, scale: 2
      t.string :status, default: "pending"

      t.timestamps
    end

    create_table :ride_groups do |t|
      t.decimal :origin_lat, precision: 10, scale: 6
      t.decimal :origin_lng, precision: 10, scale: 6
      t.string :origin_name
      t.decimal :dest_lat, precision: 10, scale: 6
      t.decimal :dest_lng, precision: 10, scale: 6
      t.string :dest_name
      t.string :pickup_landmark
      t.datetime :scheduled_time
      t.references :vehicle, foreign_key: true
      t.references :driver, foreign_key: true
      t.string :status, default: "forming"

      t.timestamps
    end

    create_table :ride_members do |t|
      t.references :ride_group, null: false, foreign_key: true
      t.references :travel_request, null: false, foreign_key: true
      t.decimal :fare_split, precision: 10, scale: 2

      t.timestamps
    end
  end
end
