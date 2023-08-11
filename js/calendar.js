(function(){
    week = ['일','월', '화','수','목','금','토'];
    var header = document.querySelector(".calendar__header");
    var contents = document.querySelector(".calendar__contents");
    
    // 캘린더 테이블 요소 작성 
    for (let i=0;i<5;i++) {
        contents.innerHTML += "<div role='row' class='weekRow'>" 
        + "<div class='date'></div> <div role='presentation' class='todo'></div> </div>";
    }
    for (let i=0; i <week.length; i++) {
        header.innerHTML += "<div role='columnheader' tabindex='0' class='dayHead"+ (i+1) + "> <span class='daySpan" + (i+1) + "'>"+week[i]+"</span></div>";  
        for (let j=0;j<5;j++) {
            let datebox = document.querySelectorAll(".date")[j];
            datebox.innerHTML += "<div class='weekNum" +(j+1) + "'></div>";
            let todo = document.querySelectorAll('.todo')[j];
            todo.innerHTML += "<div role='gridcell' class='todoCont"+(i+1)+"'> </div>";
        }
    }

    //날짜적기
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

    calendar(year, month);
    
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    //console.log(prev);
    prev.addEventListener('click', function(){
        calendar(year, --month);
    });
    next.addEventListener('click', function(){
        calendar(year, ++month);
    });
    
})();

function calendar(curr_year, curr_month) {
    var d = new Date(curr_year, curr_month-1, 1);
    var d_length = 32 - new Date(curr_year, curr_month-1,32).getDate();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();
    var caption_title = document.querySelector('.cal__title');
    
    //현재 연도,달 제목으로 적기
    caption_title.innerHTML = year+ "년 " + month + "월";

    // 날짜 적기 
    var start_day = document.querySelectorAll('.date>div');
    for(var i = day; i < day + d_length; i++){
        start_day[i].innerHTML = date;
        date++;
      }
    
}
