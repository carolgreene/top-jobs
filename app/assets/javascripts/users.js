$(document).ready(function() {
    bindEventListeners()
})

const bindEventListeners = () => {
 $('.sign_in').on('click', (e) => {
    e.preventDefault() 
    //alert("I was clicked!")
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
    //alert("you clicked me!")
    $.ajax({
        url: 'http://192.168.1.6:3000/users/new',
        method: 'GET',
        dataType: 'html',

    }).success(function (response) {
        $(`#app-container`).html('').append(response)
    })
})
}

