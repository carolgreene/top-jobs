class JobApplicationsController < ApplicationController  
  before_action :require_login
  before_action :set_user
  before_action :find_job_application, :except => [:index, :new, :create, :show]

  def new  
    if params[:job_id]
      @job = Job.find_by_id(params[:job_id])
      @job_application = JobApplication.new(job_id: params[:job_id])
      authorize @job_application
    end
  end

  def index     
    if @user.role != 'company'
      redirect_to user_path(@user), alert: "You can only see your own applications"
    else
      if params[:job_id] 
       @job = Job.find_by(id: params[:job_id])      
       @job_applications = @job.job_applications 
       respond_to do |f|
        f.html
        f.json {render json: @job.job_applications}
      end
      end  
      #else  
        #@job_applications = JobApplication.all   #s/only be for admin. Will add admin later
      #end 
    end
  end

  def create 
    @job = Job.find_by(id: params[:job_id]) 
    @job_application = JobApplication.find_by_user_id_and_job_id(params[:job_application][:user_id], params[:job_application][:job_id])     
    if !@job_application.nil?
      redirect_to jobs_path, alert: "You already applied for this job"
    else      
      @job_application = JobApplication.new(job_application_params)
      if @job_application.save              
        redirect_to job_application_path(@job_application), alert: "Your application was successfully submitted"
      else 
        @job = @job_application.job
        render :new
      end
    end
  end

  def show 
    if params[:job_id]
      @job = Job.find_by(id: params[:job_id])      
      @job_application = @job.job_applications.find_by(id: params[:id])      
      authorize @job_application      
    else
      find_job_application 
      authorize @job_application      
    end
  end

  def edit     
    @job = @job_application.job 
    authorize @job_application
  end 

  def update   
    authorize @job_application  
    @job_application.update(job_application_params)
    redirect_to job_application_path(@job_application), alert: "Job Application successfully updated!"
  end

  def destroy 
    authorize @job_application
    @job_application.destroy
    redirect_to user_path(@user), alert: "Job Application successfully deleted"
  end

  def most_recent_applications 
    @job_applications = JobApplication.most_recent_applications
  end

  private 

  def find_job_application
    @job_application = JobApplication.find_by(id: params[:id])
  end

  def job_application_params 
    params.require(:job_application).permit(:user_id, :job_id, :name, :email, :years_of_experience, :qualifications, :applicant_id)
  end
end
