const frm = document.frm;


frm.addEventListener('submit', function(event) {
    var myId = frm.userId;
    var myPwd = frm.userPwd;
    if (idMatching(myId.value, myPwd.value)) {
        sessionStorage.setItem('login', 1);
    }
    else {  
        event.preventDefault();
        myId.value = "";
        myPwd.value ="";
    }
})


function idMatching(idvalue, pwvalue) { 
    if (idvalue=="" || pwvalue=="") {
        alert('값을 입력해주세요.');
        return false;
    }

    for (var i=0; i<userdata.length; i++) {
        let object = userdata[i];

        if (object.id == idvalue) {
            if (object.password == pwvalue) {
                alert(object.name+"님 환영합니다.");
                return true;
            }
            else {
                alert('로그인 정보가 일치하지 않습니다.');  
                return false;
            }
        }
    }
    alert('해당 아이디가 존재하지 않습니다.'); 
    return false;
}
