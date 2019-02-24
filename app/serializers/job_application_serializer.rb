class JobApplicationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :job_id, :name, :email, :years_of_experience, :qualifications, :applicant_id, :created_at
  belongs_to :job 
  belongs_to :applicant, :class_name => 'User', :foreign_key => 'applicant_id' 

end
