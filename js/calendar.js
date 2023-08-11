//data section
var TodoData = []
TodoData.push({date: "2023-08-12", title: "연합공연", detail: "19시-21시" });
TodoData.push({date: "2023-08-17", title: "프로젝트 발표", detail: "동영상 제출" });


// function
(function() {

    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var Year = currentYear;
    var Month = currentMonth;
    calendar(currentYear, currentMonth); 

    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var today = document.querySelector('.today');
    //console.log(prev);
    prev.addEventListener('click', function(){
        calendar(Year, --Month);
    });
    next.addEventListener('click', function(){
        calendar(Year, ++Month);
    });
    today.addEventListener('click', function() {
        calendar(currentYear, currentMonth);
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
    var preInfo = new Date(currentYear, currentMonth, 0); // 이전 달 마지막 일 
    var startDay = startInfo.getDay();  
    var lastDate = lastInfo.getDate();
    var preDate = preInfo.getDate();

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

    
    for (let i=0; i<startDay; i++) {
        dayBox[i].innerHTML = "<div class='date'>" + (preDate-startDay+i+1) + "</div> <div role='presentation' class='todo'></div>";
        dayBox[i].className += " inactive";
    }

    for (let i=startDay; i<startDay+lastDate; i++) {
        dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div> <div role='presentation' class='todo'></div>";
        dayBox[i].classList.remove = "inactive";
    }
    lastDate += startDay;
    for (let i=lastDate; i<35;i++) {
        dayBox[i].innerHTML = "<div class='date'></div>" + (i-lastDate+1) +"<div role='presentation' class='todo'></div>";
        dayBox[i].className += " inactive";
    }

    insertData(currentYear, currentMonth);
}

function insertData(year, month){
    for (let i =0; i<TodoData.length; i++) {
        let data = TodoData[i].date.split("-")
        if (year != data[0]) {
            return
        }
        else {
            if (month != (data[1]-1)) {
                return
            }
            else {
                var startDay = new Date(year,month,1);
                var todoIdx = Number(startDay.getDay()) + Number(data[2]) - 1;
                var todoBox = document.querySelectorAll(".todo")[todoIdx];
                todoBox.innerHTML += "<div>" + TodoData[i].title + "</div>";
            }
        }
    }
    
}