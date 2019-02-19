class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password, :role, :jobs, :applied_jobs, :job_applications
  
  has_many :jobs, :foreign_key => 'company_id', source: :company

  has_many :job_applications, :foreign_key => 'user_id'
  
  has_many :applied_jobs, each_serializer: JobApplicationSerializer 
end


#has_many :applied_jobs, through: :job_applications, :class_name => 'Job', :foreign_key => 'applicant_id', source: :applicant