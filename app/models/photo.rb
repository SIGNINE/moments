class Photo < ActiveRecord::Base
  validates :name, presence: true

  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :albums
end
