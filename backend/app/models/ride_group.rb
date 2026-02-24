class RideGroup < ApplicationRecord
  has_many :ride_members
  has_many :travel_requests, through: :ride_members
  
  # vehicle and driver might be nil initially during the grouping phase
  belongs_to :vehicle, optional: true
  belongs_to :driver, optional: true

  validates :origin_lat, presence: true
  validates :origin_lng, presence: true
  validates :dest_lat, presence: true
  validates :dest_lng, presence: true
  validates :scheduled_time, presence: true
  validates :status, presence: true, inclusion: { in: %w[forming driver_assigned in_progress completed cancelled] }

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= "forming"
  end
end
