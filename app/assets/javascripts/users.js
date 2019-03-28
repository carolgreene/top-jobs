$(document).ready(function() {
  bindEventListeners()
})

let sortableJobs = []


function bindEventListeners() {
  listenForClickSignInForm()
  listenForClickNewUserForm()
  postSignIn()
  postNewUser()
  listenForClickSortJobs(sortableJobs)
}

function listenForClickSignInForm() {
  $('.sign_in').on('click', (e) => {
    e.preventDefault() 
    getSignInForm() 
  })
}

function getSignInForm() {
  $.ajax({
    url: 'http://192.168.1.6:3000/signin',
    method: 'GET',
    dataType: 'html',
  }).success(function (response) {
    $(`#nav`).html('')
    $(`#app-container`).html('').append(response)
  })    
}


function listenForClickNewUserForm() { 
  $('.sign_up').on('click', (e) => {
    e.preventDefault()
    getNewUserForm()
  })
}

function getNewUserForm() {
  $.ajax({
    url: 'http://192.168.1.6:3000/users/new',
    method: 'GET',
    dataType: 'html',
  }).success(function (response) {
    $(`#nav`).html('')
    $(`#app-container`).html('').append(response)
  })
}


function postSignIn() {
  $(document).on('submit', "form#signin_form", function(e) {
    e.preventDefault()   
        
    $.ajax({
       type: ($("input[name='_method']").val() || this.method),
       url: this.action,
       data: $(this).serialize(),
       dataType: 'json',
       success: function(response)
       {
         let newUser = new User(response)               
         let userHtml = newUser.formatUserInfoShow()
         let userLinks = newUser.formatLinks()
         let sortableHtml = newUser.formatUserJobsShow()

         $(`#heading`).html('')
         $(`#app-container`).html('').append(userHtml)  
         $(`#user-jobs`).html('').append(sortableHtml)
         $(`#nav`).append(userLinks)         
       }
    })
  })
}      
                    

function postNewUser() {
  $(document).on('submit', "form#new_user.new_user", function(e) {
    e.preventDefault()
       
    $.ajax({
      type: ($("input[name='_method']").val() || this.method),
      url: this.action,
      data: $(this).serialize(),
      dataType: 'json', 
      success: function(response)
      {
        let newUser = new User(response)
        let userHtml = newUser.formatShow()
        let userLinks = newUser.formatLinks()
        
        $(`#heading`).html('')
        $(`#app-container`).html('').append(userHtml)     
        $(`#nav`).append(userLinks)
      }
    })
  })
}

function listenForClickSortJobs() {  
  $(document).on('click', 'button#sort_jobs', function(e) {
    let sortedJobs = sortableJobs[0].slice(0)
    
    sortedJobs.sort(function(a,b) {
      let value = (a.title).localeCompare(b.title)
      if(value === 0) {
        return a.location.localeCompare(b.location)
      
      } else {
        return value
      }
      
    })
    //console.log(sortedJobs)
    $(`#user-jobs`).html('')
    listSortedJobs(sortedJobs)
  })    
}
    
function listSortedJobs(sortedJobs) {
  console.log(sortedJobs)
  sortedJobs.map(job =>{
    $(`#user-jobs`).append(`<li><a href='/jobs/${job.id}' data-id="${job.id}" class="show_link">${job.title}</a> |
     ${job.location} | Date Posted: ${new Date(job.created_at).toDateString()}</li>`)
     $(`#nav`).html('').append(`<br><br><a href="/jobs/new" class='new_job_form'>Post New Job</a> |
     <a href="/jobs" class='all_jobs'>All Jobs</a> |  
     <a href="/signout" class='sign_out'>Log Out</a>`)
  })
}  


class User {
  constructor(user) {
    this.id = user.id 
    this.name = user.name 
    this.role = user.role  
    this.jobs = user.jobs 
    this.job_applications = user.job_applications
    //this.applied_jobs = user.applied_jobs
    //console.log(this.applied_jobs)
  }
}

User.prototype.formatUserInfoShow = function() {
  if(this.role === 'company')
    return (` 
    <h3>Hi ${this.name}</h3>
    <h4>Type: ${this.role}</h4>
    <br>
    <br>
    <h4>Jobs Posted</h4>    
    `) 
  else     
    return (`
    <h3>Hi ${this.name}</h3>
    <h4>Type: ${this.role}</h4>
    <br>
    <br>
    <h4>Jobs Applied To</h4>     
  `)
}


User.prototype.formatUserJobsShow = function() {  
  sortableJobs.push(this.jobs)

  //applicant not working. Can't access app.job.title****
  let applicantHtml = this.job_applications.map(application => { 
    //console.log(this.applied_jobs)        
    return (`
      <li><a href='/job_applications/${application.id}' data-id="${application.id}">${application.id}</a> | Job Title | Company Name | Applied: ${new Date(application.created_at).toDateString()} </li>
    `)
  }).join('')  
    
  let companyHtml = this.jobs.map(job => {
    return (`
    <li><a href='/jobs/${job.id}' data-id="${job.id}" class="show_link">${job.title}</a> | ${job.location} | Date Posted: ${new Date(job.created_at).toDateString()}</li>
    `)
  }).join('')
  if(this.role === 'company')
    return (`    
    <br>
    <ul>${companyHtml}</ul>
    `) 
  else     
    return (`    
    <br>
    <ul>${applicantHtml}</ul> 
  `)
}


User.prototype.formatLinks = function() {
  if(this.role === 'company')
    return (`
    <br>
    <button class="sort_jobs" data-id="${this.id}" id="sort_jobs">Sort Jobs By Title</button> 
    <br>
    <br>
    <a href="/jobs/new" class='new_job_form'>Post New Job</a> |
    <a href="/jobs" class='all_jobs'>All Jobs</a> |  
    <a href="/signout" class='sign_out'>Log Out</a>
    
    `) 
  else 
    return (`
    <br>
    <br>
    <a href="/jobs" class='all_jobs'>All Jobs</a> |  
    <a href="/signout" class='sign_out'>Log Out</a>
  `)
}
