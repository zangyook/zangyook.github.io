
//DATA
var userdata = [] ; 
userdata.push({admin:true, id:'admin', password:"0000", class:0, name:"관리자", phone:NaN, part:NaN, stdNum:NaN});
userdata.push({admin:true, id:'manager', password:"0000", class:15, name:"총무", phone:NaN, part:NaN, stdNum:NaN});
userdata.push({admin:false, id:'yerang', password:"0000", class:14, name:"이예랑", phone:"01055668069", part:"드럼", stdNum:"21102377"});


if (sessionStorage.getItem("userdata")==null) {
    sessionStorage.setItem('userdata', JSON.stringify(userdata));
}

if (sessionStorage.getItem("login")==null) {
    sessionStorage.setItem('login', 0);
}


//LOGIN
document.querySelector(".navbar__logout").addEventListener('click', () => {
    alert('로그아웃 되었습니다.');
    sessionStorage.setItem('login', 0);
})

if (sessionStorage.getItem('login') != 0) {
    UserMode();
}
else {
    GuestMode();
}

function GuestMode() {
    var loginIcon = document.querySelector(".navbar__login");
    var logoutIcon = document.querySelector(".navbar__logout");
    loginIcon.classList.remove('display-none');
    logoutIcon.classList.add('display-none');
}

function UserMode() {
    var loginIcon = document.querySelector(".navbar__login");
    var logoutIcon = document.querySelector(".navbar__logout");
    loginIcon.classList.add('display-none');
    logoutIcon.classList.remove('display-none');
}

//HOVER
var menuBtn = document.querySelector(".navbar__item__list__wrap").children
for (let i=0; i<menuBtn.length; i++) {
    menuBtn[i].addEventListener('mouseover',()=>{
        menuBtn[i].classList.add("mouseover");
    })
    menuBtn[i].addEventListener('mouseout', () => {
        menuBtn[i].classList.remove("mouseover");
    })
}

//MOBILE
var menutriggerBtn = document.querySelector(".navbar__menutrigger__button");
var menubackBtn = document.querySelector(".navbar__menuback__button");
var navbarItemList = document.querySelector(".navbar__item__list__wrap");
var logo = document.querySelector(".navbar__item__logo");
var navbarItemSign = document.querySelector(".navbar__item__sign");
var main = document.querySelector('main');

menutriggerBtn.addEventListener('click', () => {
    main.setAttribute("class", "display-none")
    
    logo.style.display = "none" ; 
    //main.style.display = "none";
    navbarItemList.style = "height: calc(100dvh - var(--nav-height)); visibility: visible; padding: 0";
    navbarItemList.style.backgroundColor = "var(--nav-background-color)";
    navbarItemSign.style.display="block";
    menutriggerBtn.style.display = "none";
    menubackBtn.style.display = "flex";
})
menubackBtn.addEventListener('click', () => {
    main.removeAttribute('class');
    logo.style.display = "flex";
    //main.style.display = "block";
    navbarItemList.style.visibility = "hidden";
    navbarItemList.style.height = "54px";
    navbarItemSign.style.display="none";
    menutriggerBtn.style.display = "flex";
    menubackBtn.style.display = "none";
})

window.addEventListener('beforeunload', () => {
    if (main.classList) {
        main.removeAttribute('class');
    }
})
