class Album < ActiveRecord::Base
  validates :title, presence: true

  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :photos 
  has_and_belongs_to_many :circles
end
