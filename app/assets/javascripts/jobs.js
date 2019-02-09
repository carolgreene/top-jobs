$(document).ready(function() {
    bindClickHandlers()
})

const bindClickHandlers = () => {     
 $('.all_jobs').on('click', (e) => {
     e.preventDefault()
     history.pushState(null, null, "jobs")
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
            console.log(newJob)
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
        .then(res => res.json())
        .then(job => {
            let newJob = new Job(job)
            let jobHtml = newJob.formatShow()                  
        
        $(`#app-container`).append(jobHtml)
    
        })
    })


   
    $('button#new-job-form').on('click', function(e) {
        e.preventDefault() 
        let newJobForm = Job.newJobForm()
        $(`#app-container`).html('').append(newJobForm)
    })

    $(document).on('click', '#submit-new-job', function(e) {
        e.preventDefault()
        alert('I was clicked')
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

    static newJobForm() {
        return (`
        <h3><strong>Post a New Job</strong></h3>
        <br>
        <br>
        <form id="job-form">
        Title<br>
        <input id='title' type='text' name='title'</input><br>
        Location<br>
        <input type='text' name='location'</input><br>
        Category<br>
        <input type='text' name='category'</input><br>
        Company Name<br>
        <input type='text' name='company name'</input><br>
        Salary<br>
        <input type='text' name='salary'</input><br>
        Description<br>
        <input type='text' name='description'</input><br>
        <br>
        <!--<input type='hidden' :company_id, :value => @user.id unless @job.company_id </input>-->
        <input type='submit' id='submit-new-job' />
        
        </form>
        `)
        
    }
}

Job.prototype.formatIndex = function() {
    let jobHtml = `
    <a href="/jobs/${this.id}" data-id="${this.id}" class="show_link"><h3>${this.title}</h3></a> |
    ${this.company_name} |
    ${this.location} |
    Date Posted:${this.created_at}`        
    return jobHtml
}

Job.prototype.formatShow = function() {
    let jobHtml = `
    <h3>${this.title}</h3>     
    <p>${this.company_name} |
    ${this.location} |
    ${this.description} |
    ${this.salary}K </p>
    <button class="next", data-id="${this.id}" id="next-job">Next Job</button`
    return jobHtml
}


//$(document).on('click', '#next-job', function() {
    //console.log(this)
    //alert("i was clicked")
    //let id = $(this).attr('data-id')
    //console.log(id)
    //test = fetch(`jobs/${id}/next.json`)
    //console.log(test)
    //.then(res => res.json())
    //console.log(res)
    //.then(job => {
    //    let newJob = new Job(job)
    //    let jobHTML = newJob.formatShow()
    //    $(`#app-container`).append(jobHtml)
    //})
//})