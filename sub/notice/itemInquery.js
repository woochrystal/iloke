window.scrollTo(0, 0);
var posts = [
    { 문의날짜: '2024-09-30', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'da****', 상태: '접수'},
    { 문의날짜: '2024-09-29', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'hq****', 상태: '접수'},
    { 문의날짜: '2024-09-27', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'as****', 상태: '접수'},
    { 문의날짜: '2024-09-26', 카테고리: '배송', 제목: '배송 지연 문의', 작성자: 'hr****', 상태: '접수'},
    { 문의날짜: '2024-09-25', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'sd****', 상태: '답변완료'},
    { 문의날짜: '2024-09-13', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'gk****', 상태: '답변완료'},
    { 문의날짜: '2024-09-12', 카테고리: '배송', 제목: '배송 지연 문의', 작성자: 'sd****', 상태: '답변완료'},
    { 문의날짜: '2024-09-11', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'xz****', 상태: '답변완료'},
    { 문의날짜: '2024-08-22', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'vv****', 상태: '답변완료'},
    { 문의날짜: '2024-08-13', 카테고리: '배송', 제목: '배송 지연 문의', 작성자: 'de****', 상태: '답변완료'},
    { 문의날짜: '2024-08-11', 카테고리: '배송', 제목: '배송 지연 문의', 작성자: 'aw****', 상태: '답변완료'},
    { 문의날짜: '2023-12-16', 카테고리: '배송', 제목: '배송 지연 문의', 작성자: 'te****', 상태: '답변완료'},
    { 문의날짜: '2023-12-15', 카테고리: '상품', 제목: '상품 불량 문의', 작성자: 'uy****', 상태: '답변완료'},
    { 문의날짜: '2023-11-30', 카테고리: '배송', 제목: '배송 지연 문의', 작성자: 'aq****', 상태: '답변완료'},
    { 문의날짜: '2023-09-12', 카테고리: '배송', 제목: '배송 지연 문의', 작성자: 'oh****', 상태: '답변완료'},
];
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

function updateInquiryTable(filteredPosts) {
    const tableBody = document.getElementById("boardBody");
    tableBody.innerHTML = ""; // 이전 행 지우기

    filteredPosts.forEach(post => {
        let newRow = document.createElement("tr");

        let postDate = document.createElement("td");
        let postCate = document.createElement("td");
        let postName = document.createElement("td");
        let postWriter = document.createElement("td");
        let postState = document.createElement("td");

        postDate.innerHTML = post.문의날짜;
        postCate.innerHTML = post.카테고리;

        let reviewLink = document.createElement("a");
        reviewLink.innerHTML = post.제목;
        reviewLink.href = "#";
        reviewLink.setAttribute("onclick", "loadContent('./sub/notice/item_query_detail.html')");
        postName.appendChild(reviewLink);

        postWriter.innerHTML = post.작성자;
        postState.innerHTML = post.상태;

        newRow.appendChild(postDate);
        newRow.appendChild(postCate);
        newRow.appendChild(postName);
        newRow.appendChild(postWriter);
        newRow.appendChild(postState);

        tableBody.appendChild(newRow);
    });
}

// 초기 게시물로 테이블 채우기
updateInquiryTable(posts);