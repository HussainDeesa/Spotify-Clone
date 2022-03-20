let user_name = document.getElementById('user-name')
let logout = document.getElementById('logout')
let login = document.getElementById('login')
let signup = document.getElementById('signup')
let loggedin_dropdown = document.getElementById('loggedin-dropdown')
let container = document.getElementsByClassName('container')
let bottom = document.getElementsByClassName('bottom')

if (localStorage.getItem('token') === null) {
    window.location.href = '/login.html'
}
const displayName=()=>{
    let name=localStorage.getItem('user-name')
    if(name.split(' ').length>1){
        user_name.innerText = name.split(' ')[0]
    }
    else{
        user_name.innerText=name
    }
}
const checkUser = async () => {
    const response = await fetch(`api/auth/getuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
        },
       
    })
    const json = await response.json()
    if (!json.success) {
        window.location.href = '/login.html'
    }  
    if(json.success){
        container[0].classList.remove('hidden')
        bottom[0].classList.remove('hidden')
        login.classList.add('hidden')
        signup.classList.add('hidden')
        user_name.classList.remove('hidden')
        loggedin_dropdown.classList.remove('hidden')
        displayName()
    }
}
if (localStorage.getItem('token')) {
    checkUser()
}
logout.addEventListener('click', () => {
    console.log('clicked logout');
    localStorage.removeItem('token')
    localStorage.removeItem('user-name')
    login.classList.remove('hidden')
    signup.classList.remove('hidden')
    user_name.classList.add('hidden')
    loggedin_dropdown.classList.add('hidden')
    window.location.href = '/index.html'
})