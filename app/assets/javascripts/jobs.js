$(document).ready(function() {
    bindClickHandlers()
})

function bindClickHandlers() {  
    listenForClickAllJobs()
    listenForClickOnJob()
    listenForClickNewJobForm()
    submitNewJob()
    listenForClickEditJobForm()
    submitEditJob()
    listenForClickSeeApplicants()
} 
    
    //***click event for jobs index link***

    function listenForClickAllJobs() {
     //$('.all_jobs').on('click', (e) => {
       $(document).on('click', '.all_jobs', function(e) {
        e.preventDefault()
        $(`#app-container`).html('')
        $(`#heading`).html('Our Jobs')
        $(`#nav`).html('')
        getAllJobs()
    })        
} 

    function getAllJobs() {
         
        fetch(`/jobs.json`)
        .then((res) => res.json())
        .then(jobs => {            
        jobs.forEach(job => {    //or jobs.forEach(function(job) {
            let newJob = new Job(job)
            let jobHtml = newJob.formatIndex()
            $(`#app-container`).append(jobHtml)

        })
        $(`#nav`).html(`<a href="/signout" class='sign_out'>Log Out</a> | 
        <a href="/users" class='my_jobs'>My Jobs</a>` )
    }) 
}     

    //***click event for job/id show link***
    function listenForClickOnJob() {
    $(document).on('click', ".show_link", function(e) {
      e.preventDefault()
      $(`#heading`).html('Job Details')
      let id = $(this).attr('data-id')
      getJob(id) 
    })
   }

     function getJob(id) {   
       fetch(`/jobs/${id}.json`)
       .then((res) => res.json())
       .then(job => {
         let newJob = new Job(job)
         let jobHtml = newJob.formatShow()  
         let jobLinks = newJob.formatShowLinks()        
         $(`#app-container`).html('').append(jobHtml)
         $(`#nav`).html('').append(jobLinks)
       })
      }


        //***click event to get new job form***
    function listenForClickNewJobForm() {   
    $(document).on('click', '.new_job_form', function(e) {
        e.preventDefault() 
        getNewJobForm()
    })
}

    function getNewJobForm() {
        $.ajax({
            url: 'http://192.168.1.6:3000/jobs/new',
            method: 'GET',
            dataType: 'html',
        }).success(function (response) {
            $(`#heading`).html('')
          $(`#app-container`).html('').append(response)
        })        
    }


        //***click event to submit new job form***

    function submitNewJob() {    
    $(document).on('submit', "form#new_job.new_job", function(e) {         
        e.preventDefault()    
                 
        $.ajax({            
            type: ($("input[name='_method']").val() || this.method),            
            url: this.action,
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response)            
           {
             let newJob = new Job(response)
             let jobHtml = newJob.formatShow()    
             $(`#app-container`).html('').append(jobHtml)
            }
        })
    })
}
  
    
    //***click event to get edit job form***
    function listenForClickEditJobForm() {
    $(document).on('click', '#edit-job', function(e) {
        e.preventDefault()
        let id = $(this).attr('data-id')
        getEditJobForm(id)
    })
}

    function getEditJobForm(id) {
        $.ajax({
            url: `http://192.168.1.6:3000/jobs/${id}/edit`,
            method: 'GET',
            dataType: 'html',
        }).success(function (response) {
            $(`#heading`).html('')
         $(`#app-container`).html('').append(response)
         $(`#nav`).html('')
        })            
    }   
    


    //***click event to submit edit job form***

    function submitEditJob() {
    $(document).on('submit', 'form.edit_job', function(e) {            
        e.preventDefault()           
        
        $.ajax({            
            type: ($("input[name='_method']").val() || this.method),            
            url: this.action,
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response)            
           {
            let newJob = new Job(response)
            let jobHtml = newJob.formatShow() 
            let jobLinks = newJob.formatShowLinks()
            $(`#heading`).html('Job Details')  
            $(`#app-container`).html('').append(jobHtml)
            $(`#nav`).html('').append(jobLinks)
            }
        })    
    })  
} 

    function listenForClickSeeApplicants() {
    $(document).on('click', 'button#see-applicants.see_applicants', function(e) {
    //$('button#see-applicants.see_applicants').on('click', (e) => {
        e.preventDefault()         
        $(`#heading`).html('Applicants For:')        
        let id = $(this).attr('data-id')
        getApplicants(id)
    })
}

        function getApplicants(id) {
        fetch(`/jobs/${id}/job_applications.json`)
        .then((res) => res.json())       
        .then((applicants) => {
           applicants.forEach(applicant => {
             let newApplicant = new Applicant(applicant)
             let applicantHtml = newApplicant.formatApplicant()                
             $(`#app-container`).append(applicantHtml)
            })
        })
    }  
           



class Job {
    constructor(job) {
      this.id = job.id
      this.title = job.title
      this.salary = job.salary         
      this.description = job.description
      this.category = job.category
      this.company_name = job.company_name
      this.company_id = job.company_id 
      this.location = job.location
      this.created_at = new Date(job.created_at).toDateString()
    }    
}

Job.prototype.formatIndex = function() {
    let jobHtml = `
    <a href="/jobs/${this.id}" data-id="${this.id}" class="show_link"><h3>${this.title}</a> 
    <li>${this.company_name} |
    ${this.location} |
    Date Posted:${this.created_at}</li>
    `        
    return jobHtml
}

Job.prototype.formatShow = function() {
    let jobHtml = `
    <h3>${this.title}</h3>     
    <p>${this.company_name} |
    ${this.location} |
    ${this.description} |
    ${this.salary}K </p>   
    
    `
    return jobHtml
}




Job.prototype.formatShowLinks = function() {
    //if(this.role === 'company')
    let jobLinks = `
     
    <br>
    <a href="/jobs/${this.id}/edit" data-id="${this.id}" id="edit-job">Edit Job</a> |
    <a href="/jobs/${this.id}/job_applications"  data-id"${this.id}" id="see-applicants">See Applicants</a>
    <br>
    <br>
    <a href="/jobs/new" class='new_job_form'>Post New Job</a> |
    <a href="/jobs" class='all_jobs'>All Jobs</a> |  
    <a href="/signout" class='sign_out'>Log Out</a>
    ` 
    return jobLinks
  }

//<button class="edit_job", data-id="${this.id}" id="edit-job">Edit Job</button>
//<button class="see_applications", data-id=${this.id}" id="see-applicants">See Applicants</button>


class Applicant {
    constructor(applicant) {
        this.job_id = applicant.job_id
        this.id = applicant.id 
        this.name = applicant.name
        this.created_at = new Date(applicant.created_at).toDateString()
    }
}

Applicant.prototype.formatApplicant = function() {
    let applicantHtml = `    
    
    <a href="/jobs/${this.job_id}/job_applications/${this.id}" data-id="${this.id}" class="app_link"><h3>${this.name}</a> |
    Date Applied: ${this.created_at}
    `
    return applicantHtml
}


