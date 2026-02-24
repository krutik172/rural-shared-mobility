class TravelRequest < ApplicationRecord
  belongs_to :user
  has_many :ride_members
  has_many :ride_groups, through: :ride_members

  validates :origin_lat, presence: true
  validates :origin_lng, presence: true
  validates :dest_lat, presence: true
  validates :dest_lng, presence: true
  validates :travel_date, presence: true
  validates :time_window_start, presence: true
  validates :time_window_end, presence: true
  validates :seats_required, presence: true, numericality: { greater_than: 0 }
  validates :status, presence: true, inclusion: { in: %w[pending matching grouped completed cancelled] }

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= "pending"
  end
end
