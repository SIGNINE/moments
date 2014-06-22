class Photo < ActiveRecord::Base
  validates :title, presence: true

  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :albums

  EXTENSIONS = ['.jpg', '.jpeg', '.png']
  S3_BUCKET = 'moments_photos'

  def upload file
    filename = "#{user_id}_#{id}#{get_ext(file)}"

    AWS::S3::S3Object.store(filename, file.read, S3_BUCKET, :access => :public_read)
    url = AWS::S3::S3Object.url_for(filename, S3_BUCKET, :authenticated => false) 
    update_attribute(:url, url)
  end

  def self.file_valid? file
    EXTENSIONS.include?(get_ext(file)) && file.size > 0
  end

  private
  def get_ext file
    ext = File.extname(file.original_filename).downcase
  end
end
