// function
(function() {

    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    calendar(currentYear, currentMonth); 
    var todayIdx = new Date().getDate() +new Date(currentYear,currentMonth,1).getDay()-1;

    selected(todayIdx); //오늘 날짜 idx

    
    var nextBtn = document.querySelector('.nextBtn');
    var todayBtn = document.querySelector('.todayBtn');  
    
    nextBtn.addEventListener('click', function(){
        calendar(currentYear, ++currentMonth);
    });
    todayBtn.addEventListener('click', function() {
        currentYear =  new Date().getFullYear();
        currentMonth = new Date().getMonth();
        calendar(currentYear, currentMonth);
        selected(todayIdx);
    })

})();

function makeBlock(rowNum) {
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

function calendar(currentYear, currentMonth) {
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
    var isCurrentMonth = (currentMonth == new Date().getMonth())
    if ((currentMonth == new Date().getMonth())){
        for (let i=startDay; i<startDay+lastDate; i++) {
            dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div>";
            if (i>=today-1){
                dayBox[i].classList.add('available');
                var clickListener = function() {selected(i);}
                dayBox[i].addEventListener('click', clickListener);
            }
        }
    }
    else {
        for (let i=startDay; i<startDay+lastDate; i++) {
            dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div>";
            dayBox[i].classList.add('available');
            var clickListener = function() {selected(i);}
            dayBox[i].addEventListener('click', clickListener);
        }
    }

}

function selected(todayIdx) {
    var todayBox = document.querySelectorAll('.dayBox');
    for (var i=0;i<todayBox.length;i++) {
        todayBox[i].classList.remove("active");
    }

    todayBox[todayIdx].classList.add("active");
}