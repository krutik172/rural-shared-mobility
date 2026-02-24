class User < ApplicationRecord
  has_many :travel_requests
  has_many :drivers
  
  validates :phone, presence: true, uniqueness: true
  validates :name, presence: true
  validates :role, presence: true, inclusion: { in: %w[passenger driver admin] }

  # Default to passenger
  after_initialize :set_default_role, if: :new_record?

  private

  def set_default_role
    self.role ||= "passenger"
  end
end
