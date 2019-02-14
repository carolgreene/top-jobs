class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password, :role

  has_many :jobs, :foreign_key => 'company_id', source: :company

  has_many :job_applications, :foreign_key => 'user_id'
  has_many :applied_jobs, through: :job_applications, :class_name => 'Job', :foreign_key => 'applicant_id', source: :applicant
    
end
