class Photo < ActiveRecord::Base
  validates :name, presence: true

  belongs_to :user, dependent: :destroy
end
