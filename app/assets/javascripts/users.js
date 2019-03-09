$(document).ready(function() {
  bindEventListeners()
})

function bindEventListeners() {
  listenForClickSignInForm()
  listenForClickNewUserForm()
  postSignIn()
  postNewUser()
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
        let userHtml = newUser.formatShow()
        let userLinks = newUser.formatLinks()
        $(`#heading`).html('')
        $(`#app-container`).html('').append(userHtml) 
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


User.prototype.formatShow = function() {  
    //applicant not working. Can't access app.job.title****
    let applicantHtml = this.job_applications.map(application => {
        //console.log(this.applied_jobs)        
        return (`
        <li><a href='/job_applications/${application.id}' data-id="${application.id}">${application.id}</a> | Job Title | Company Name </li>
        `)
    }).join('')
    
    let companyHtml = this.jobs.map(job => {
        return (`
        <li><a href='/jobs/${job.id}' data-id="${job.id}" class="show_link">${job.title}</a> | ${job.location} | Date Posted: ${new Date(job.created_at).toDateString()}</li>
    `)
    }).join('')
    if(this.role === 'company')
    return (` 
    <h3>Hi ${this.name}</h3>
    <h4>Type: ${this.role}</h4>
    <br>
    <br>
    <h4>Jobs Posted</h4>
    <br>
    <ul>${companyHtml}</ul>
    `) 
    else     
    return (`
    <h3>Hi ${this.name}</h3>
    <h4>Type: ${this.role}</h4>
    <br>
    <br>
    <h4>Jobs Applied To</h4>
    <br>
    <ul>${applicantHtml}</ul> 
    `)
}


User.prototype.formatLinks = function() {
  if(this.role === 'company')
  return (`
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



