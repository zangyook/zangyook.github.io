const frm = document.frm;
const loginBtn = document.querySelector(".login-btn"); 

loginBtn.addEventListener('click', function() {
    var myId = frm.userId;
    var myPwd = frm.userPwd;
    if(myId.value == '' || myPwd.value == ''){
        alert('아이디 또는 비밀번호가 입력되지 않았습니다!');  
    } 
    else{
        alert(myId.value + '님 환영합니다!');  
    };
})