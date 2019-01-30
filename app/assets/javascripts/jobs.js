$(document).ready(function() {
    bindClickHandlers()
})

const bindClickHandlers = () => {
 $('.all_jobs').on('click', (e) => {
     e.preventDefault()
     history.pushState(null, null, "jobs")
     //alert('i was clicked')
     fetch(`/jobs.json`)
     .then((response) => response.json())
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
        let jobDetail = fetch(`/jobs/${id}.json`)
        
        .then(response => response.json())
        .then(job => {
            
        $(`#app-container`).html('')
        $(`#app-container`).append("this is cool!")
        })
    })
}



function Job(job) {
    this.id = job.id
    this.title = job.title
    this.salary = job.salary
    this.category = job.category
    this.company_name = job.company_name
    this.company_id = job.company_id 
    this.location = job.location
    this.created_at = job.created_at
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
    let detailHtml = `
    ${this.title} | 
    ${this.company_name} |
    ${this.location} |
    ${this.description} |
    ${this.salary}`
    return detailHtml
}