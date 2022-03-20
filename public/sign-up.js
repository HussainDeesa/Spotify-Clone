let sign_name = document.getElementById('sign-name')
let sign_email = document.getElementById('sign-email')
let sign_password = document.getElementById('sign-password')
let small = document.querySelectorAll('.small');
let c_password = document.getElementById('c-password')
let signup_btn = document.getElementById('signup-btn')

let s_name = '';
let s_email = '';
let reg_name = /^(?:\D)+(?:\D){3,10}$/
let reg_email = /(?:[A-Za-z0-9.])+(?:[A-Za-z0-9.])+@([a-z]+.)+[a-z]$/
// let reg_phone=/^\d{10}$/
sign_name.addEventListener('focusout', () => {
    small[0].innerText = ''
    signup_btn.classList.remove('disabled')
    signup_btn.disabled = false
    s_name = sign_name.value
    if (reg_name.test(s_name) == false) {
        small[0].innerText = '(* Should be 3-10 letters, and contain only alphabets)'
        signup_btn.classList.add('disabled')
        signup_btn.disabled = true
    }
})

sign_email.addEventListener('focusout', () => {
    small[1].innerText = ''
    signup_btn.classList.remove('disabled')
    signup_btn.disabled = false
    s_email = sign_email.value
    if (reg_email.test(s_email) == false) {
        small[1].innerText = '(* Invalid email id)'
        signup_btn.classList.add('disabled')
        signup_btn.disabled = true
    }
})


c_password.addEventListener('focusout', () => {
    small[2].innerText = ''
    signup_btn.classList.remove('disabled')
    signup_btn.disabled = false
    if (sign_password.value !== c_password.value) {
        small[2].innerText = `(* Password and Conform password are different)`
        console.log(sign_password, c_password);
        signup_btn.classList.add('disabled')
        signup_btn.disabled = true
    }
})

signup_btn.addEventListener('click', async (e) => {
    if (sign_name.value !== "" || sign_email.value !== "" || sign_password.value !== "" || c_password.value !== "") {
        small[3].innerText = ""

        signup_btn.disabled = true
        signup_btn.classList.add('disabled')
        e.preventDefault()
        const response = await fetch(`api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: sign_name.value, email: sign_email.value, password: sign_password.value })
        })

        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            localStorage.setItem('user-name',json.user_name)
            window.location.href='/index.html'
        }
        else {
            small[3].innerText = `( User with this email already exists. Login to continue )`
            signup_btn.disabled = false;
            signup_btn.classList.remove('disabled')
        }
    }
})
