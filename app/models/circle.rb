class Circle < ActiveRecord::Base
  validates :name, presence: true

  has_and_belongs_to_many :users
  has_and_belongs_to_many :albums
end
