class AddYearsOfExperienceToJobApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :job_applications, :years_of_experience, :integer
  end
end
