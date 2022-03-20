let login_email = document.getElementById("login-email")
let login_password = document.getElementById("login-password")
let login_btn = document.getElementById("login-btn")
let small = document.querySelectorAll('.small');

login_btn.addEventListener('click', async () => {
    small[0].innerText=""
    login_btn.disabled=true
    login_btn.classList.add('disabled')
    const response = await fetch(`api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: login_email.value, password: login_password.value })
    })
    const json = await response.json()
    if (json.success) {
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('user-name',json.user_name)
        window.location.href='/index.html'
        }
    else {
        small[0].innerText='( Invalid Crediantials. Please try again)'
        login_btn.disabled=false
        login_btn.classList.remove('disabled')
  
    }
})
