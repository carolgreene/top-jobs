class Job < ApplicationRecord
    validates_presence_of :title, :location, :category, :company_name, :salary, :description
    
    belongs_to :company, :class_name => 'User', :foreign_key => 'company_id'
    has_many :job_applications 
    has_many :applicants, :through => :job_applications, :class_name => 'User', :foreign_key => 'applicant_id' 
    accepts_nested_attributes_for :job_applications
    
    scope :most_recent_first, -> { reorder(created_at: :desc)} 

    def next 
      job = Job.where("id < ?", id).last 
      if job 
        job 
      else 
        Job.last
      end
      
    end

    

    
end
