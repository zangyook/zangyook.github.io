//database
var userdata = [] ; 
userdata.push({admin:true, id:'admin', password:"0000", class:0, name:"관리자", phone:NaN, part:NaN, stdNum:NaN});
userdata.push({admin:false, id:'yerang', password:"0000", class:32, name:"이예랑", phone:"01055668069", part:"드럼", stdNum:"21102377"});
var login = false;
//

document.querySelector(".navbar-logout").addEventListener('click', () => {
    alert('로그아웃 되었습니다.');
    sessionStorage.setItem('login', 0);
})

if (sessionStorage.getItem('login')==1) {
    UserMode();
}
else {
    GuestMode();
}

function GuestMode() {
    var loginIcon = document.querySelector(".navbar-login");
    var logoutIcon = document.querySelector(".navbar-logout");
    loginIcon.classList.remove('invisible');
    logoutIcon.classList.add('invisible');
}

function UserMode() {
    var loginIcon = document.querySelector(".navbar-login");
    var logoutIcon = document.querySelector(".navbar-logout");
    loginIcon.classList.add('invisible');
    logoutIcon.classList.remove('invisible');
}