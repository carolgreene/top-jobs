$(document).ready(function() {
    bindClickHandlers()
})

function bindClickHandlers() {  
    getAllJobs()
    getJob()
    getNewJobForm()
    submitNewJob()
    editJobForm()
    submitEditJob()
    seeApplicants()
} 
    
    //***click event for jobs index link***

    function getAllJobs() {
     $('.all_jobs').on('click', (e) => {
        e.preventDefault()
     
        fetch(`/jobs.json`)
        .then((res) => res.json())
        .then(jobs => {
        $('#app-container').html('')
        $(`#app-container`).html('Our Jobs')
        jobs.forEach(job => {    //or jobs.forEach(function(job) {
            let newJob = new Job(job)
            let jobHtml = newJob.formatIndex()
            $(`#app-container`).append(jobHtml)
            //console.log(newJob)
        })
     })        
    }) 
}     

    //***click event for job/id show link***
    function getJob() {
    $(document).on('click', ".show_link", function(e) {
        e.preventDefault()
        $(`#app-container`).html('')
        let id = $(this).attr('data-id')
        console.log(this)
        fetch(`/jobs/${id}.json`)
        .then((res) => res.json())
        .then(job => {
            let newJob = new Job(job)
            let jobHtml = newJob.formatShow()                  
        
        $(`#app-container`).append(jobHtml)
    
        })
    })
}

        //***click event to get new job form***
    function getNewJobForm() {   
    $('button#new-job-form').on('click', function(e) {
        e.preventDefault() 
        $.ajax({
            url: 'http://192.168.1.6:3000/jobs/new',
            method: 'GET',
            dataType: 'html',

        }).success(function (response) {
          $(`#app-container`).html('').append(response)
        })
        
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
                console.log(response)
                let newJob = new Job(response)
                let jobHtml = newJob.formatShow()    
                
                $(`#app-container`).html('').append(jobHtml)
            }
        })
    }) 
}  
    
    //***click event to get edit job form***
    function editJobForm() {
    $(document).on('click', 'button#edit-job.edit_job', function(e) {
        e.preventDefault()
        let id = $(this).attr('data-id')

        $.ajax({
            url: `http://192.168.1.6:3000/jobs/${id}/edit`,
            method: 'GET',
            dataType: 'html',
            }).success(function (response) {
                //debugger
                
               $(`#app-container`).html('').append(response)
            })            
            
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
                console.log(response)
                let newJob = new Job(response)
                let jobHtml = newJob.formatShow()   
                                
                $(`#app-container`).html('').append(jobHtml)
            }
        })
    
    })  
} 

    function seeApplicants() {
    $(document).on('click', 'button#see-applicants.see_applicants', function(e) {
    //$('button#see-applicants.see_applicants').on('click', (e) => {
        e.preventDefault() 
        
        $(`#app-container`).html('Applicants')
        //alert('i was clicked')
        let id = $(this).attr('data-id')

        fetch(`/jobs/${id}/job_applications.json`)
        
        .then(function(res) {
        return res.json()
        })
        .then(function(applicants) {
            
            applicants.forEach(applicant => {
                let newApplicant = new Applicant(applicant)
                let applicantHtml = newApplicant.formatApplicant()                
                $(`#app-container`).append(applicantHtml)
                
            })
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
        this.id = applicant.id 
        this.name = applicant.name
        this.created_at = new Date(applicant.created_at).toDateString()
    }
}

Applicant.prototype.formatApplicant = function() {
    let applicantHtml = `
    <li>${this.name} | Date Applied: ${this.created_at}
    `
    return applicantHtml
}


//<a href="/jobs/${this.job_id}/job_applications/${this.id}" data-id="${this.id}" class="app_link"><h3>${this.name}</a>


