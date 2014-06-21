class Photo < ActiveRecord::Base
  validates :title, presence: true

  has_attached_file :pic
  validates_attachment_content_type :pic, :content_type => /\Aimage\/.*\Z/

  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :albums
end
