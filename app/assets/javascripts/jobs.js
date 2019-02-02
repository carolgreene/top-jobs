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
        $(`#app-container`).html('Jobs')
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
        
        //alert('i was clicked')
        let id = $(this).attr('data-id')
        //console.log(id)
        fetch(`/jobs/${id}.json`)
        .then(res => res.json())
        .then(job => {
            let newJob = new Job(job)
            let jobHtml = newJob.formatShow()    
                
        $(`#app-container`).html('')
        $(`#app-container`).append(jobHtml)
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
    <a href="/jobs/${this.id}" data-id="${this.id}" class="show_link"><h3>${this.title}</h3></a> |
    ${this.company_name} |
    ${this.location} |
    Date Posted:${this.created_at}`
    return jobHtml
}

Job.prototype.formatShow = function() {
    let jobHtml = `
    <h3>${this.title}</h3>     
    ${this.company_name} |
    ${this.location} |
    ${this.description} |
    ${this.salary}`
    return jobHtml
}