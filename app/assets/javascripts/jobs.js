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
     $('.all_jobs').on('click', (e) => {
        e.preventDefault()
        $(`#app-container`).html('')
        $(`#heading`).html('Our Jobs')
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
         $(`#app-container`).html('').append(jobHtml)
       })
      }


        //***click event to get new job form***
    function listenForClickNewJobForm() {   
    $('button#new-job-form').on('click', function(e) {
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
    $(document).on('click', 'button#edit-job.edit_job', function(e) {
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
            $(`#heading`).html('Job Details')  
            $(`#app-container`).html('').append(jobHtml)
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
        
        
        





$(document).on('click', '#next-job', function() {
    //console.log(this)
    //alert("i was clicked")
    let id = $(this).attr('data-id')
    console.log(id)
    let test = fetch(`jobs/${id}/next.json`)
    console.log(test)
    //.then(res => res.json())
    //console.log(res)
    //.then(job => {
    //    let newJob = new Job(job)
    //    let jobHTML = newJob.formatShow()
    //    $(`#app-container`).append(jobHtml)
    //})
})
    



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
    <button class="next", data-id="${this.id}" id="next-job">Next Job</button>
    <button class="edit_job", data-id="${this.id}" id="edit-job">Edit Job</button>
    <button class="see_applicants", data-id=${this.id}" id="see-applicants">See Applicants</button>
    `
    return jobHtml
}

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


