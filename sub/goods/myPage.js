// 마이페이즈 데이 필터
function setDateRange(days) {
    const today = new Date();
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("last-date");

    endDateInput.value = today.toISOString().split("T")[0];

    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);
    startDateInput.value = pastDate.toISOString().split("T")[0];
}

// 쿠폰 데이 필터
document.querySelectorAll('.coupon-date-period button').forEach((button) => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.coupon-date-period button').forEach(btn => {
            btn.classList.remove('on');
        });

        this.classList.add('on');
        const days = parseInt(this.getAttribute('data-value'));
        setDateRange(days);
    });
});

document.querySelectorAll('.mypage-date-period button').forEach((button) => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.mypage-date-period button').forEach(btn => {
            btn.classList.remove('on');
        });

        this.classList.add('on');
        const days = parseInt(this.getAttribute('data-value'));
        setDateRange(days);
    });
});

//주문취소
document.querySelectorAll('.order-cancel').forEach(cancel =>{
    cancel.addEventListener('click',function(){
        let order_cancel = confirm('주문취소 처리를 하시겠습니까?');
        let newSpan = document.createElement('span')
        newSpan.classList.add('cancel-txt');
        newSpan.innerHTML = '주문취소완료'
        if(order_cancel){//확인
            alert('주문이 정상취소 되었습니다.');
            this.style.display = 'none';
            this.parentNode.appendChild(newSpan)//반품 진행중
        }else{//취소
            alert('주문취소가 취소되었습니다.');
        }
    })
})

//반품신청
document.querySelectorAll('.order-refund').forEach(refund =>{
    refund.addEventListener('click',function(){
        let order_refund = confirm('반품신청 처리를 하시겠습니까?');
        let newSpan = document.createElement('span')
        newSpan.classList.add('refund-txt');
        newSpan.innerHTML = '반품 진행중'
        if(order_refund){//확인
            alert('반품이 정상적으로 신청되었습니다.');
            this.style.display = 'none';
            this.parentNode.appendChild(newSpan)//반품 진행중
        }else{//취소
            alert('반품신청이 취소되었습니다.');
        }
    })
})

//jquery
$(function(){
    // 관심상품
    $('.full').css('display','none')
    $('.mypage-price-container > button').on('click', function() {
        let full = $(this).find('.full');
        let line = $(this).find('.line');
        if(full.css('display') == 'none'){
            line.css('display','none');
            full.css('display','inline-block');
        }else if(line.css('display') == 'none'){
            full.css('display','none');
            line.css('display','inline-block');
        }
    });
})
function validateDates() { // 입력 필드 가져오기
    let startDate = $("#start-date").val();
    let endDate = $("#last-date").val();
    // let errorMessage = document.getElementById("error-message");

    // 시작일과 종료일이 입력된 경우만 비교
    if (startDate && endDate) {
        // 문자열 형태의 날짜를 비교 가능하도록 Date 객체로 변환
        const start = startDate ? new Date(startDate + 'T00:00:00+09:00') : null;
        const end = endDate ? new Date(endDate + 'T23:59:59+09:00') : null;

        // 시작일이 종료일보다 나중일 경우 오류 처리
        if (start > end) {
            alert("시작일은 종료일보다 늦을 수 없습니다");
            return false; // 폼 제출 막기
        } 
    }
    return true; // 폼 제출 허용
}

$(function () {
    
    function setDateRange(days) {
        const endDateInput = document.getElementById("end-date");
        const startDateInput = document.getElementById("start-date"); 
    
        const today = new Date();
        const endDate = today.toISOString().split('T')[0]; // 포맷: YYYY-MM-DD
        endDateInput.value = endDate;
    
        if (days === 0) {
            startDateInput.value = endDate; // 오늘
        } else {
            today.setDate(today.getDate() - days);
            const startDate = today.toISOString().split('T')[0];
            startDateInput.value = startDate;
        }
    
        // active button class 버튼 색상 변경
        const buttons = document.querySelectorAll('.mypage-date-period button');
        buttons.forEach(button => {
            button.classList.remove('active'); //
        });
        const activeButton = Array.from(buttons).find(button => button.dataset.value == days);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    function filterPosts() {
        const startDateInput = document.getElementById("start-date").value;
        const endDateInput = document.getElementById("end-date").value;
    
        // 입력된 날짜를 한국시간대 기준으로 변환
        const startDate = startDateInput ? new Date(startDateInput + 'T00:00:00+09:00') : null;
        const endDate = endDateInput ? new Date(endDateInput + 'T23:59:59+09:00') : null;
    
        if (startDate && endDate && startDate > endDate) {
            alert("시작일은 종료일보다 늦을 수 없습니다");
            return; // 필터링 작업 중단
        }
    
        const filteredPosts = posts.filter(post => {
            const postDate = new Date(post.문의날짜);
            return (!startDate || postDate >= startDate) && 
                   (!endDate || postDate <= endDate);
        });
    
        updateInquiryTable(filteredPosts);
    }
})

// $(function () {
//     parseInt($("#birth").val().split("-")[0]) < 1900 ||
//         parseInt($("#birth").val().split("-")[1]) < 1 ||
//         parseInt($("#birth").val().split("-")[2]) < 1 ||
//         isNaN($("#birth").val().split("-")[0]) ||
//         isNaN($("#birth").val().split("-")[1]) ||
//         isNaN($("#birth").val().split("-")[2])
// })