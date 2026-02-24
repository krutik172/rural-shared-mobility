class Vehicle < ApplicationRecord
  belongs_to :driver

  validates :vehicle_type, presence: true
  validates :capacity, presence: true, numericality: { greater_than: 0 }
end
