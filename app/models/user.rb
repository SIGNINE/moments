class User < ActiveRecord::Base
  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  validates :password, length: { in: 6..20 }
  validates :email, format: { with: EMAIL_REGEX } 

  has_many :photos
  has_many :albums
  has_and_belongs_to_many :circles
end
