//data section
var TodoData = []
TodoData.push({date: "2023-08-12", title: "연합공연", detail: "시간: 19시-21시<br>장소: 홍대FF" });
TodoData.push({date: "2023-08-17", title: "프로젝트 발표", detail: "동영상 제출" });
TodoData.push({date: "2023-09-05", title: "개강 버스킹", detail: "시간: 18시-20시<br>장소: 붕어방" });


// function
(function() {

    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();
    var todayIdx = new Date().getDate() +new Date(currentYear,currentMonth,1).getDay()-1;
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');
    const todayBtn = document.querySelector('.todayBtn');
    const modifyBtn = document.querySelector('.modifyBtn');
    const submitBtn = document.querySelector('.submitBtn');
    const doneBtn = document.querySelector('.doneBtn');

    
    calendar(currentYear, currentMonth); 
    BoxActive(todayIdx); 
    displayDetails(new Date());
    //console.log(prev);
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
        console.log(doneBtn.classList);
        doneBtn.classList.remove("display-none");
        modify();
    })
    submitBtn.addEventListener('click', function() {
        submit();
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
    insertData(currentYear, currentMonth);
}

function insertData(year, month){
    for (let i =0; i<TodoData.length; i++) {
        let data = TodoData[i].date.split("-");
        if (year == data[0]) {
            if ((month+1) == data[1]) {
                var startDay = new Date(year,month,1);
                var todoIdx = Number(startDay.getDay()) + Number(data[2]) - 1;
                var todoBox = document.querySelectorAll(".todo")[todoIdx];
                todoBox.innerHTML += "<div>" + TodoData[i].title + "</div>";
            }
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
                detailsTitle.innerHTML += "\t" + TodoData[i].title;
                detailsBox.innerHTML = TodoData[i].detail;
            }
        }
    }
    
}

function modify() {
    var dayBox = document.querySelectorAll(".dayBox.available");
    var form = document.getElementById('form');
    var timeCheck = document.querySelector("input[type=checkbox]");
    var inputDates = document.querySelector("select[name='datetime']");

    $('input[name="dates"]').datepicker({
        minYear: 2023,
        maxYear: 2024,
        locale: {
            format: 'YY/MM/DD'
          }
    });
    $('input[name="dates"]').datetimepicker({
        singleDatePicker: true,
        minYear: 2023,
        maxYear: 2024,
        locale: {
            format: 'YY/MM/DD'
          }
    });
    /*
    for (let i =0;i<24;i++) {
        inputDates.innerHTML += "<option value=" + i + ">" +i+"시 </option>";
    }
    */
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
        if (form[2].checked) {
            object = {date: form[1], title: form[0]['value'], detail: form[3]['value']};
        }
    })

    for (let i=0;i<dayBox.length; i++) {
        dayBox[i].addEventListener('click', ()=> {
            var popup = document.querySelector('.calendar__popup');
            if (window.getComputedStyle(popup).getPropertyValue('display') =='none') {
                let rect = dayBox[i].getBoundingClientRect();
                popup.style.marginLeft = rect.right+"px";
                popup.style.marginTop =  rect.top +"px"; 
                popup.style.display="flex";
            }
            else {
                popup.style.display='none';
            }
        })
    }
}

function submit() {

}