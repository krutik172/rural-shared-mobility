class CreatePricingRules < ActiveRecord::Migration[7.0]
  def change
    create_table :pricing_rules do |t|
      t.string :vehicle_type
      t.decimal :base_fee
      t.decimal :price_per_km

      t.timestamps
    end
  end
end
