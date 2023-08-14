// function
(function() {

    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var todayIdx = new Date().getDate() +new Date(currentYear,currentMonth,1).getDay()-1;
    var nextBtn = document.querySelector('.nextBtn'); // 다음달로 이동하는 버튼
    var todayBtn = document.querySelector('.todayBtn');  //오늘로 이동하는 버튼
    var timeSelectorDateBox = document.querySelector(".timeSelector__date"); //선택한 날짜
    var rightBtn = document.querySelector('.timeMoveBtn.right');
    var leftBtn = document.querySelector('.timeMoveBtn.left');
    
    calendar(currentYear, currentMonth);  
    makeTimeSelector();
    BoxActive(todayIdx); //오늘 날짜 idx
    TimeActive();
    timeSelectorDateBox.innerHTML = (currentMonth+1) + "월" + (todayIdx-1) + "일"; 
    nextBtn.addEventListener('click', function(){
        calendar(currentYear, ++currentMonth);
        TimeActive();
    });
    todayBtn.addEventListener('click', function() {
        currentYear =  new Date().getFullYear();
        currentMonth = new Date().getMonth();
        calendar(currentYear, currentMonth);
        BoxActive(todayIdx);
        TimeActive();
    })
    rightBtn.addEventListener('click', ()=> btnScroll(200));
    leftBtn.addEventListener('click', ()=> {btnScroll(-200); });

})();

function makeBlock(rowNum) { // 캘린더 테이블 만들기 
    week = ['일','월', '화','수','목','금','토'];
    var header = document.querySelector(".calendar__header");
    var contents = document.querySelector(".calendar__contents");
    header.innerHTML = ""; 
    contents.innerHTML = "";
    //weekRow 박스 작성
    for (let i =0 ; i < rowNum;i++) {
        contents.innerHTML += "<div role='row' class='weekRow'>";
        var weekRow = document.querySelectorAll(".weekRow")[i];
        for (let j=0;j<7; j++) {  
            if (i==0){
                header.innerHTML += "<div>" + week[j] + "</div>"; 
            }
            weekRow.innerHTML += "<div class='dayBox'></div>";
        }
        contents.innerHTML += "</div>"; 
    }
}

function calendar(currentYear, currentMonth) { //캘린더 테이블에 날짜 적기 
    if (currentMonth<1) {
        currentYear += Math.floor(currentMonth/12);
        currentMonth += -12*Math.floor(currentMonth/12);
    }
    else if (currentMonth>11) {
        currentYear += parseInt(currentMonth/11);
        currentMonth %= 12;
    }
    
    var startInfo = new Date(currentYear, currentMonth, 1); //현재 달 시작 일  
    var lastInfo = new Date(currentYear, currentMonth+1,0); //현재 달 마지막 일
    var startDay = startInfo.getDay();  
    var today = new Date().getDate() + startDay;
    var lastDate = lastInfo.getDate();

    //박스 제작. . 
    if (startDay+lastDate>35){
        makeBlock(6);
    }
    else {
        makeBlock(5);
    }

    var titleCaption = document.querySelector(".cal__title"); 
    var dayBox = document.querySelectorAll(".dayBox");

    titleCaption.innerHTML = currentYear + "년" + (currentMonth+1) + "월" ; 

    //날짜 적기 
    var timeSelectorDateBox = document.querySelector(".timeSelector__date");

    if ((currentMonth == new Date().getMonth())){
        for (let i=startDay; i<startDay+lastDate; i++) {
            dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div>";
            if (i>=today-1){
                dayBox[i].classList.add('available');
                var clickListener = function() {
                    BoxActive(i);
                    timeSelectorDateBox.innerHTML = (currentMonth+1) + "월" + (i-startDay+1) + "일";
                    var availableTimeBox = document.querySelectorAll('.time_box.available');
                    availableTimeBox.forEach((li) => {
                        li.classList.remove('timeActive');
                    })
                }
                dayBox[i].addEventListener('click', clickListener);
            }
        }
    }
    else {
        for (let i=startDay; i<startDay+lastDate; i++) {
            dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div>";
            dayBox[i].classList.add('available');
            var clickListener = function() {
                BoxActive(i);
                timeSelectorDateBox.innerHTML = (currentMonth+1) + "월" + (i-startDay+1) + "일";
                var availableTimeBox = document.querySelectorAll('.time_box.available');
                availableTimeBox.forEach((li) => {
                    li.classList.remove('timeActive');
                })
            }
            dayBox[i].addEventListener('click', clickListener);
        }
    }

}

function BoxActive(todayIdx) { //캘린더 날짜 블록 선택 시 활성화되도록 만들기 
    var todayBox = document.querySelectorAll('.dayBox');
    for (var i=0;i<todayBox.length;i++) {
        todayBox[i].classList.remove("boxActive");
    }

    todayBox[todayIdx].classList.add("boxActive");
}

function makeTimeSelector() {
    var controller = document.querySelector('.timeSelector__controller').querySelector('ul');
    for (let i=0;i<24*2;i++) {
        controller.innerHTML += "<li><span class='time_txt'>" + String(parseInt(i/2)).padStart(2,'0') + ":" + (i/2==0? '00': '30')
                        +"</span><div class='time_box available' ng-click=''></li>";
    }
}


function TimeActive() {
    var availableTimeBox = document.querySelectorAll('.time_box.available');
    availableTimeBox.forEach((li) => {
        li.classList.remove('timeActive');
    })
    for (let i=0;i<availableTimeBox.length;i++) {
        availableTimeBox[i].addEventListener('click', ()=> { 
            var TimeBox = document.querySelectorAll('.time_box');
            var Indexes = [];
            var nowIdx =0;
            TimeBox.forEach((li,index) => {
                if (li.classList.contains('timeActive')){
                    Indexes.push(index);
                } 
                if (li == availableTimeBox[i]){
                    nowIdx=index;
                }
            }) 
            var activeNum = Indexes.length;
            if (activeNum>0) {
                if (nowIdx-Indexes[0]>=4) {
                    alert("최대 이용가능 시간은 2시간입니다.");
                    return
                }
                else if (nowIdx>Indexes[activeNum-1]) {
                    for (let j=Indexes[activeNum-1]+1; j<nowIdx; j++) {
                        TimeBox[j].classList.add('timeActive');
                    }
                }
                else {
                    for (let j=0; j<Indexes.length; j++) {
                        TimeBox[Indexes[j]].classList.remove('timeActive');
                    }
                }
            }
            availableTimeBox[i].classList.add('timeActive');
        })
    }

}

function btnScroll(x) {
    var ulDiv = document.querySelector('.timeSelector__controller').querySelector('ul');
    ulDiv.scrollBy(x,0);
}
