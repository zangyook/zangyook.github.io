//data section
var TodoData = []
TodoData.push({
    date: '2023-08-12', 
    time: 19, 
    title: '연합공연', 
    detail: '시간: 19시-21시<br>장소: 홍대FF'
});
TodoData.push({
    date: '2023-08-17', 
    time: -1, 
    title: '프로젝트 발표', 
    detail: '동영상 제출' 
});
TodoData.push({
    date: '2023-09-05', 
    time: 18, 
    title: '개강 버스킹', 
    detail: '시간: 18시-20시<br>장소: 붕어방' 
});
if (sessionStorage.getItem("TodoData") == null) {
    sessionStorage.setItem("TodoData", JSON.stringify(TodoData));

}



// 페이지 로딩 시 
(function() {

    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();
    var todayIdx = new Date().getDate() +new Date(currentYear,currentMonth,1).getDay()-1;
    //버튼
    prevBtn = document.querySelector('.prevBtn');
    nextBtn = document.querySelector('.nextBtn');
    todayBtn = document.querySelector('.todayBtn');
    modifyBtn = document.querySelector('.modifyBtn');
    doneBtn = document.querySelector('.doneBtn');
    submitBtn = document.querySelector('.submitBtn');
    backBtn = document.querySelector('.backBtn');
    if (sessionStorage.getItem("login") != 0) {
        if (JSON.parse(sessionStorage.getItem("login")).admin == true) { 
            modifyBtn.classList.remove("display-none");
        }
    }
    calendar(currentYear, currentMonth); 
    BoxActive(todayIdx); 
    displayDetails(new Date());

    prevBtn.addEventListener('click', function(){
        calendar(currentYear, --currentMonth);
    });
    nextBtn.addEventListener('click', function(){
        calendar(currentYear, ++currentMonth);
    });
    todayBtn.addEventListener('click', function() {
        currentYear = new Date().getFullYear();
        currentMonth = new Date().getMonth();
        calendar(currentYear, currentMonth);
        BoxActive(todayIdx);
        displayDetails(new Date());
    })
    modifyBtn.addEventListener('click', function() {
        modifyBtn.classList.add("invisible");
        doneBtn.classList.remove("display-none");
        modify();
    })

})();

/* ==========기본 캘린더 틀============= */
//캘린더 블록 구조 만들기 
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

//캘린더 구조에 날짜 및 데이터 입력 
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
    var todayIdx = new Date().getDate() + startDay;
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
        dayBox[i].classList.remove("available");
        dayBox[i].classList.remove("today");
    }

    for (let i=startDay; i<startDay+lastDate; i++) {
        dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div> <div role='presentation' class='todo'></div>";
        dayBox[i].classList.add("available");
        dayBox[i].classList.remove("today");
        dayBox[i].addEventListener('click', ()=> {
            BoxActive(i);
            displayDetails(new Date(currentYear, currentMonth, i-startDay+1));
        });
    }
    lastDate += startDay;
    for (let i=lastDate; i<35;i++) {
        dayBox[i].innerHTML = "<div class='date'>" + (i-lastDate+1) +"</div><div role='presentation' class='todo'></div>";
        dayBox[i].classList.remove("available");
        dayBox[i].classList.remove("today");
    }
    dayBox[todayIdx].classList.add("today");
    TodoData = JSON.parse(sessionStorage.getItem("TodoData"));
    insertData(currentYear, currentMonth, TodoData); //캘린더 날짜 입력할 때 todo 데이터도 입력 
}



//캘린더 날짜 블록 선택 시 활성화되도록 만들기 
function BoxActive(todayIdx) {
    var todayBox = document.querySelectorAll('.dayBox');
    for (var i=0;i<todayBox.length;i++) {
        todayBox[i].classList.remove("boxActive");
    }

    todayBox[todayIdx].classList.add("boxActive");
}

// 블록 클릭 시 그 날의 상세 정보 표시하기 
function displayDetails (dateOb) {
    var detailsTitle = document.querySelector('.details__title');
    var detailsBox = document.querySelector('.details__contents');
    var Month = dateOb.getMonth();
    var Year = dateOb.getFullYear();
    var Date = dateOb.getDate();
    detailsTitle.innerHTML = `${Year}-${Month+1}-${Date}`;
    detailsBox.innerHTML = "일정이 없습니다.";
    for (let i =0; i<TodoData.length; i++) {
        let data = TodoData[i].date.split("-");
        if (Year == data[0] & (Month+1) == data[1]) {

            if (Date == data[2]) {
                detailsTitle.innerHTML = `${Year}-${Month+1}-${Date}\t` + TodoData[i].title;
                detailsBox.innerHTML = TodoData[i].detail;
            }
        }
    }
    
}



//일정 데이터 입력하는 함수 
function insertData(year, month, Data){
    
    for (let i =0; i<Data.length; i++) {
        let data = Data[i].date.split("-");
        var startDay = new Date(year,month,1);
        var todoIdx = Number(startDay.getDay()) + Number(data[2]) - 1;
        var todoBox = document.querySelectorAll(".todo")[todoIdx];
        //todoBox.innerHTML = "";
        if (year == data[0]) {
            if ((month+1) == data[1]) {
                todoBox.innerHTML += `<div class='tododata' value='${JSON.stringify(Data[i])}'> ${Data[i].title}</div>`;
            }
        }
    }
    
}


/*===========================관리자 기능===================================*/
// 관리자 수정 모드 눌렀을 때 
function modify() {
    var dayBox = document.querySelectorAll(".dayBox.available");
    var form = document.getElementById('form');
    var timeCheck = document.querySelector("input[type=checkbox]");
    var inputDates = document.querySelector("select[name='datetime']");
    var tododiv = document.querySelectorAll(".tododata");
    var tempData = [] //JSON.parse(sessionStorage.getItem("TodoData")) || [];

    for (let i=0;i<tododiv.length;i++) {
        tododiv[i].classList.add("modify");
        tododiv[i].addEventListener('click', modifyPopup)
    }
    eventListeners = [];
    for (let i=0;i<dayBox.length; i++) {
        var popuplistener = createPopupHandler(i);
        dayBox[i].addEventListener('click', popuplistener);
        eventListeners.push(popuplistener);
    }
        
    for (let i =0;i<24;i++) {
        inputDates.innerHTML += "<option value=" + i + ">" +i+"시 </option>";
    }
    
    timeCheck.addEventListener('change', function() {
        if (timeCheck.checked) {
            inputDates.disabled = true;
        }
        else {
            inputDates.disabled = false;
        }
    })

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (form[3].checked) {
            var object = {
                date: form[1]['value'], 
                time:-1, 
                title: form[0]['value'], 
                detail: form[4]['value']};
        }
        else {
            var object = {
                date: form[1]['value'], 
                time:form[2]['value'], 
                title: form[0]['value'], 
                detail: form[4]['value']};
        }
        var popup = document.querySelector('.calendar__popup');
        tempData.push(object);
        insertData(currentYear, currentMonth,tempData);
        popup.style.display='none';
        displayDetails (new Date(currentYear,currentMonth, form[1]['value'].split('-')[2]));
    })

    submitBtn.addEventListener('click', function() {
        modifyBtn.classList.remove("invisible");
        doneBtn.classList.add("display-none");
        sessionStorage.setItem("TodoData", JSON.stringify(tempData));
        hiddenPopup();
        location.reload(true);
    })
    backBtn.addEventListener('click', function() {
        modifyBtn.classList.remove("invisible");
        doneBtn.classList.add("display-none");
        hiddenPopup();
        location.reload(true);
    })
}


//수정하려고 블록 눌렀을 때 
function createPopupHandler(idx) {
    return function(event) {
        popupHandler(event,idx);
    }
}
function popupHandler(event, i)  {
    var popup = document.querySelector('.calendar__popup');
    
    if (window.getComputedStyle(popup).getPropertyValue('display') =='none') {
        let rect = event.currentTarget.getBoundingClientRect();
        popup.style.marginLeft = rect.right+"px";
        popup.style.marginTop =  rect.top +"px"; 
        popup.style.display="flex";
    }
    else {
        popup.style.display='none';
    }

    $('input[name="dates"]').daterangepicker({ 
        singleDatePicker: true,
        lang:'ko',
        minYear: 2023,
        maxYear: 2024,

        startDate: `${currentYear}-${currentMonth+1}-${i+1}`,
        locale: {
            format: 'YYYY-MM-DD'
          }        
    });
}

// 존재하는 일정 수정하려고 할 때 
function modifyPopup(event) {
    var popupForm = document.getElementById('form'); 

    var object = JSON.parse(event.target.getAttribute('value')); // 객체가 텍스트 형태로 저장되어있다고 가정 

    popupForm[0]['value'] = object.title;
    popupForm[1]['value'] = object.Date;
    if (object.time==-1){
        popupForm[3].checked = true;
    }
    else {
        popupForm[2]['value'] = object.time;
    }
    popupForm[4]['value'] = object.detail;
    event.target.classList.add('modify');

}

// 수정 완료 눌렀을 때 
function hiddenPopup() {
    var popup = document.querySelector('.calendar__popup');
    var dayBox = document.querySelectorAll(".dayBox.available");
    for (let i=0;i<dayBox.length; i++) {
        dayBox[i].removeEventListener('click', eventListeners[i]);
    }
    popup.style.display='none';
}