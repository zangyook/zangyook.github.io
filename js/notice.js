/*======데이터======*/
var noticeData = [];
noticeData.push({
    title: "동아리 운영규정 안내",
    writer: "관리자",
    date: "2022-03-04",
    count: 613, 
    text: "동아리 운영규정은 다음과 같습니다. "
});
noticeData.push({
    title: "15기 임원진 모집 안내(~3/2)",
    writer: "관리자",
    date: "2023-02-14",
    count: 613, 
    text: "15기 SoundClub을 운영할 임원진을 모집합니다. 모집인원은 다음과 같습니다.<br>- 총무 1명, 서기 1명"
});
noticeData.push({
    title: "운영진 구성 안내",
    writer: "관리자",
    date: "2023-03-04",
    count: 613, 
    text: "다음과 같이 임원진이 결정되었습니다. <br>총무: 가나<br>서기: 다라"
});
noticeData.push({
    title: "4월 결산안",
    writer: "총무",
    date: "2023-05-01",
    count: 613, 
    text: "4월 결산안입니다."
});
noticeData.push({
    title: "5월 결산안",
    writer: "총무",
    date: "2023-06-01",
    count: 613, 
    text: "5월 결산안입니다."
});
if (sessionStorage.getItem('noticeData')==null) {
    sessionStorage.setItem('noticeData', JSON.stringify(noticeData));
}
/*=============메인=================*/
(function() {
    titlePerPg = 2; //페이지 당 보여줄 게시물 개수
    DB = JSON.parse(sessionStorage.getItem('noticeData'));
    var pageNum = Math.ceil(DB.length/2);
    makePageBtn(pageNum);
    displayRows(DB);
    popupHandler(); // 해당 페이지에 만들어지고 난 후에 이벤트 바인딩

    buttonHandler();
    $('form').on('submit', (e)=> {
        e.preventDefault();
        searching(e);
    })
})();

function popupHandler() {
    $('.tbody .title').on('click', (e)=> PopDetail(e));
    $('#closeBtn').on('click', (e)=> {
        $('.popup').hide();
    })
}

function buttonHandler() {
    $('.page').on('click', (e)=> { //페이지 이동 버튼 
        $('.page.on').removeClass('on');
        $(e.target).addClass('on');
        displayRows(DB);
        popupHandler();
    })
    $('.prevBtn').on('click', (e)=> { //왼쪽으로 
        var idx = $('.page.on').html();
        if (idx==1) {
            return
        }
        $('.page.on').removeClass('on');
        $('.page').eq(idx-2).addClass('on');
        displayRows(DB);
        popupHandler();
    })
    $('.nextBtn').on('click', (e)=> { //오른쪽으로 
        var idx = $('.page.on').html();
        if (idx==$('.page').length) {
            return
        }
        $('.page.on').removeClass('on');
        $('.page').eq(idx).addClass('on');
        displayRows(DB);
        popupHandler();
    })
}

function makePageBtn(pageNum) {
    var text = `<button class="prevBtn"><</button>`;
    for(let i=1;i<=pageNum;i++) {
        text += `<button class="page">${i}</button>`;
    }
    text += `<button class="nextBtn">></button>`;
    $('.pageSelect').html(text);
    $('.page').first().addClass('on');
}

//게시물에 따라 나열하기 
function displayRows(DB) { 
    $('.tbody__wrap').html("");
    var nowPgNum = $('.page.on').html();
    var startIdx = DB.length-nowPgNum*titlePerPg;
    for (let i=startIdx+titlePerPg-1; i>=startIdx;i--) {
        try {
            var tempDb = DB[i];
            var text = `<div class="tbody"><div class="num">${i+1}</div><div class="title">`
                    +`${tempDb.title}</div><div class="writer">${tempDb.writer}</div><div class="date">`
                    +`${tempDb.date}</div><div class="count">${tempDb.count}</div></div>`;
            $('.tbody__wrap').append(text);
        }catch(error) {
            break
        }

    }

    
}

//게시물 팝업 띄우기 
function PopDetail(e) {
    var clickedTitle = $(e.target).html();
    
    var filteredData = DB.filter(item=> item.title ==clickedTitle);
    $('.popup__text').html(filteredData[0].text);
    $('.popup').show();
}

//검색어 찾기
function searching(e) {
    var form = document.querySelector('form');
    var option = form[0].value;
    var keyword = form[1].value;
    if (option==1) { //제목으로 검색
        var filteredData = DB.filter(item=>item.title.includes(keyword));
    }
    else if (option==2) { // 2인 경우, 작성자로 검색
        var filteredData = DB.filter(item=>item.writer.includes(keyword));
    }
    else { //3인 경우 내용으로 검색
        var filteredData = DB.filter(item=>item.text.includes(keyword));
    }
    
    var pageNum = Math.ceil(filteredData.length/2);
    makePageBtn(pageNum);
    displayRows(filteredData);
    popupHandler();
    buttonHandler();
}