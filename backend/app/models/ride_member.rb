class RideMember < ApplicationRecord
  belongs_to :ride_group
  belongs_to :travel_request

  validates :fare_split, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
