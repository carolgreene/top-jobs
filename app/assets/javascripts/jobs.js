$(document).ready(function() {
    bindClickHandlers()
})

const bindClickHandlers = () => {     
 $('.all_jobs').on('click', (e) => {
     e.preventDefault()
     //history.pushState(null, null, "jobs")
     //alert('i was clicked')
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

    
   

        


    $(document).on('click', ".show_link", function(e) {
        e.preventDefault()
        $(`#app-container`).html('')
        //history.pushState(null, null, "jobs")
        //alert('i was clicked')
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
   
    $('button#new-job-form').on('click', function(e) {
        e.preventDefault() 
        //let newJobForm = Job.newJobForm()
        //debugger
        $.ajax({
            url: 'http://192.168.1.6:3000/jobs/new',
            method: 'GET',
            dataType: 'html',

        }).success(function (response) {
          $(`#app-container`).html('').append(response)
        })
        
    })

    
    $(document).on('submit', "form#new_job.new_job", function(e) {
        e.preventDefault()         
        
        //alert('I was clicked')
        $(`#app-container`).html('').append('great new job goes here')
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
    
    $(document).on('click', 'button#edit-job.edit_job', function(e) {
        e.preventDefault()
        //alert('you clicked me')
        let id = $(this).attr('data-id')
        $.ajax({
            url: `http://192.168.1.6:3000/jobs/${id}/edit`,
            method: 'GET',
            dataType: 'html',

                }).success(function (response) {
                    $(`#app-container`).html('').append(response)
                })
    })


$(document).on('click', '#next-job', function() {
    //console.log(this)
    //alert("i was clicked")
    let id = $(this).attr('data-id')
    console.log(id)
    //test = fetch(`jobs/${id}/next.json`)
    //console.log(test)
    //.then(res => res.json())
    //console.log(res)
    //.then(job => {
    //    let newJob = new Job(job)
    //    let jobHTML = newJob.formatShow()
    //    $(`#app-container`).append(jobHtml)
    //})
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

    //static newJobForm() {
       // return (`
       // <h3><strong>Post a New Job</strong></h3>
       // <br>
       // <br>
      //  <form id="job-form" method="post" action= "/jobs">
       // Title<br>
       // <input id='title' type='text' name='title'</input><br>
       // Location<br>
      //  <input type='text' name='location'</input><br>
      //  Category<br>
      //  <input type='text' name='category'</input><br>
      //  Company Name<br>
     //   <input type='text' name='company name'</input><br>
      //  Salary<br>
      //  <input type='text' name='salary'</input><br>
     //   Description<br>
     //   <input type='text' name='description'</input><br>
      //  <br>
      //  <!--<input type='hidden' :company_id, :value => @user.id unless @job.company_id </input>-->
     //   <input type='submit' id='submit-new-job' />
        
       // </form>
       // `)
        
    //}
}

Job.prototype.formatIndex = function() {
    let jobHtml = `
    <a href="/jobs/${this.id}" data-id="${this.id}" class="show_link"><h3>${this.title}</a> |
    ${this.company_name} |
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
    `
    return jobHtml
}



