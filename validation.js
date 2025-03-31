const form = document.getElementById('SignupForm')
const fullname_input = document.getElementById('fullname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const confirm_password_input = document.getElementById('confirmpassword-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
   
    let errors = []

    if(fullname_input){
        errors = getSignupFormErrors(fullname_input.value, email_input.value, password_input.value, confirm_password_input.value)
    }
    else{
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }
    if(errors.length > 0){
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
})

function getSignupFormErrors(fullname, email, password, confirmed_password){
    let errors = []

    if(fullname === '' || fullname === null){
        errors.push('Full Name is required')
        fullname_input.parentElement.classList.add('incorrect')
    }

    if(email === '' || email === null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if(password === '' || password === null){
        errors.push('Password is required')
        password.parentElement.classList.add('incorrect')
    }
    if(password !== confirmed_password){
        errors.push('Passwords do not match')
    }
    return errors;
    
}

function getLoginFormErrors(email, password){

    let errors = []
    if(email === '' || email === null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if(password === '' || password === null){
        errors.push('Password is required')
        password.parentElement.classList.add('incorrect')
    }

}
const allInputs = [fullname_input, email_input, password_input, confirm_password_input].filter(input => input != null)
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})
