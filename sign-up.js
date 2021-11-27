let sign_name=document.getElementById('sign-name')
let sign_email=document.getElementById('sign-email')
let sign_phone=document.getElementById('sign-phone')
let sign_username=document.getElementById('sign-username')
let sign_password=document.getElementById('sign-password')
let small=document.querySelectorAll('.small');
console.log(small);
let s_name='';
let s_email='';
let reg_name=/^(?:\D)+(?:\D){3,10}$/
let reg_email=/(?:[A-Za-z0-9.])+(?:[A-Za-z0-9.])+@([a-z]+.)+[a-z]$/
let reg_phone=/^\d{10}$/
// let reg_email=/\w+@([a-z]+.)+[a-z]$/g
sign_name.addEventListener('focusout',()=>{
    small[0].innerText=''
    s_name=sign_name.value
    if(reg_name.test(s_name)==false){
        console.log('done');
        small[0].innerText='(* Should be 3-10 letters, and contain only alphabets)'
    }
})

sign_email.addEventListener('focusout',()=>{
    small[1].innerText=''
    s_email=sign_email.value
    if(reg_email.test(s_email)==false){
        small[1].innerText='(* Invalid email id)'
    }
})

sign_phone.addEventListener('focusout',()=>{
    small[2].innerText=''
    s_phone=sign_phone.value
    if(reg_phone.test(s_phone)==false){
        small[2].innerText='(* Invalid Phone No.)'
    }
})

