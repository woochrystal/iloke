// filter 기본값 전체
var posts = [
    { 번호: 8, 분류: "결제&#47;마일리지&#47;이벤트", 제목: "고객후기 이벤트는 어떻게 신청하나요?" },
    { 번호: 7, 분류: "일반&#47;관리냄새", 제목: "천연 가죽소파의 관리 방법!" },
    { 번호: 6, 분류: "결제&#47;마일리지&#47;이벤트", 제목: "상품후기 작성 후 사은품신청은 어떻게 하나요?" },
    { 번호: 5, 분류: "색상&#47;패턴&#47;주름", 제목: "사용 후 가죽 방석에 주름이 졌어요" },
    { 번호: 4, 분류: "색상&#47;패턴&#47;주름", 제목: "가죽의 주름과 패턴이 서로 달라요" },
    { 번호: 3, 분류: "일반&#47;관리냄새", 제목: "기름 얼룩이 있어요" },
    { 번호: 2, 분류: "색상&#47;패턴&#47;주름", 제목: "기존 구매 제품과 새로 구매한 제품과의 색상차이가 있어요" },
    { 번호: 1, 분류: "일반&#47;관리냄새", 제목: "사용 중 쿠션이 변하거나 꺼진 느낌이에요" },
]

function inqueryTable() {
    var tableBody = document.getElementById("boardBody");
    tableBody.innerHTML = "";

    posts.forEach(function (post) {
        let newRow = document.createElement("tr");

        let postNum = document.createElement("td");
        let postCate = document.createElement("td");
        let postName = document.createElement("td");

        postNum.innerHTML = post.번호;
        postCate.innerHTML = post.분류;
        let reviewLink = document.createElement("a");
        reviewLink.innerHTML = post.제목;
        reviewLink.href = "#";
        reviewLink.setAttribute("onclick", "loadContent('./sub/notice/faq_detail.html')");
        postName.appendChild(reviewLink);

        newRow.appendChild(postNum);
        newRow.appendChild(postCate);
        newRow.appendChild(postName);

        tableBody.appendChild(newRow);
    });
}

inqueryTable();

// filter 결제/마일리지/이벤트
var poststwo = [
    { 번호: 2, 분류: "결제&#47;마일리지&#47;이벤트", 제목: "고객후기 이벤트는 어떻게 신청하나요?" },
    { 번호: 1, 분류: "결제&#47;마일리지&#47;이벤트", 제목: "상품후기 작성 후 사은품신청은 어떻게 하나요?" },
]

function inquerySecondTable() {
    var tableBody = document.getElementById("boardBody");
    tableBody.innerHTML = "";

    poststwo.forEach(function (post) {
        let newRow = document.createElement("tr");

        let postNum = document.createElement("td");
        let postCate = document.createElement("td");
        let postName = document.createElement("td");

        postNum.innerHTML = post.번호;
        postCate.innerHTML = post.분류;
        let reviewLink = document.createElement("a");
        reviewLink.innerHTML = post.제목;
        reviewLink.href = "#";
        reviewLink.setAttribute("onclick", "loadContent('./sub/notice/faq_detail.html')");
        postName.appendChild(reviewLink);

        newRow.appendChild(postNum);
        newRow.appendChild(postCate);
        newRow.appendChild(postName);

        tableBody.appendChild(newRow);
    });
}

inquerySecondTable();

// filter 일반/관리/냄새
var poststhree = [
    { 번호: 3, 분류: "일반&#47;관리냄새", 제목: "천연 가죽소파의 관리 방법!" },
    { 번호: 2, 분류: "일반&#47;관리냄새", 제목: "기름 얼룩이 있어요" },
    { 번호: 1, 분류: "일반&#47;관리냄새", 제목: "사용 중 쿠션이 변하거나 꺼진 느낌이에요" },
]

function inqueryThirdTable() {
    var tableBody = document.getElementById("boardBody");
    tableBody.innerHTML = "";

    poststhree.forEach(function (post) {
        let newRow = document.createElement("tr");

        let postNum = document.createElement("td");
        let postCate = document.createElement("td");
        let postName = document.createElement("td");

        postNum.innerHTML = post.번호;
        postCate.innerHTML = post.분류;
        let reviewLink = document.createElement("a");
        reviewLink.innerHTML = post.제목;
        reviewLink.href = "#";
        reviewLink.setAttribute("onclick", "loadContent('./sub/notice/faq_detail.html')");
        postName.appendChild(reviewLink);

        newRow.appendChild(postNum);
        newRow.appendChild(postCate);
        newRow.appendChild(postName);

        tableBody.appendChild(newRow);
    });
}

inqueryThirdTable();

// filter 색상/패턴/주름
var postsfour = [
    { 번호: 3, 분류: "색상&#47;패턴&#47;주름", 제목: "사용 후 가죽 방석에 주름이 졌어요" },
    { 번호: 2, 분류: "색상&#47;패턴&#47;주름", 제목: "가죽의 주름과 패턴이 서로 달라요" },
    { 번호: 1, 분류: "색상&#47;패턴&#47;주름", 제목: "기존 구매 제품과 새로 구매한 제품과의 색상차이가 있어요" },
]

function inqueryFourthTable() {
    var tableBody = document.getElementById("boardBody");
    tableBody.innerHTML = "";

    postsfour.forEach(function (post) {
        let newRow = document.createElement("tr");

        let postNum = document.createElement("td");
        let postCate = document.createElement("td");
        let postName = document.createElement("td");

        postNum.innerHTML = post.번호;
        postCate.innerHTML = post.분류;
        let reviewLink = document.createElement("a");
        reviewLink.innerHTML = post.제목;
        reviewLink.href = "#";
        reviewLink.setAttribute("onclick", "loadContent('./sub/notice/faq_detail.html')");
        postName.appendChild(reviewLink);

        newRow.appendChild(postNum);
        newRow.appendChild(postCate);
        newRow.appendChild(postName);

        tableBody.appendChild(newRow);
    });
}

inqueryFourthTable();
