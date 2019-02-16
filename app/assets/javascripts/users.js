$(document).ready(function() {
    bindEventListeners()
})

const bindEventListeners = () => {
 $('.sign_in').on('click', (e) => {
    e.preventDefault() 
    
    $.ajax({
        url: 'http://192.168.1.6:3000/signin',
        method: 'GET',
        dataType: 'html',

    }).success(function (response) {
      $(`#app-container`).html('').append(response)
    })
    
  })

  $('.sign_up').on('click', (e) => {
    e.preventDefault()
    
    $.ajax({
        url: 'http://192.168.1.6:3000/users/new',
        method: 'GET',
        dataType: 'html',

    }).success(function (response) {
        $(`#app-container`).html('').append(response)
    })
  })


  $(document).on('submit', "form#signin_form", function(e) {
    e.preventDefault()   
        
    $.ajax({
        type: ($("input[name='_method']").val() || this.method),
        url: this.action,
        data: $(this).serialize(),
        dataType: 'json',
        success: function(response)
        {
            console.log(response)
            let newUser = new User(response)               
            let userHtml = newUser.formatShow()
            $(`#app-container`).html('').append(userHtml)        
                    
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
    }
}

User.prototype.formatShow = function() {
    
    let userHtml = `
    <h3>Hi ${this.name}!</h3>
    <h4>Type: ${this.role}</h4>
    <br>
    <h4>Jobs Posted</h4>  
    ${this.jobs} 
    `
    return userHtml
}
