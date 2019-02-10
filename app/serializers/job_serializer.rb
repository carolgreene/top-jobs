class JobSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :company_name, :company_id, :salary, :created_at, :category

  belongs_to :company, :class_name => 'User', :foreign_key => 'company_id'
  has_many :job_applications 
  has_many :applicants, :through => :job_applications, :class_name => 'User', :foreign_key => 'applicant_id' 
  #accepts_nested_attributes_for :job_applications
end
