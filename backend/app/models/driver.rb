class Driver < ApplicationRecord
  belongs_to :user
  has_many :vehicles
  has_many :ride_groups

  validates :license_status, presence: true, inclusion: { in: %w[pending verified suspended] }

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.license_status ||= "pending"
  end
end
