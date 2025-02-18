window.scrollTo(0, 0);
var posts = [
    { 번호: 15, 제목: "공지사항15", 날짜: "2024.09.22", 작성자: "이로케", 조회: 53 },
    { 번호: 14, 제목: "공지사항14", 날짜: "2024.09.22", 작성자: "이로케", 조회: 51 },
    { 번호: 13, 제목: "공지사항13", 날짜: "2024.09.22", 작성자: "이로케", 조회: 53 },
    { 번호: 12, 제목: "공지사항12", 날짜: "2024.09.22", 작성자: "이로케", 조회: 51 },
    { 번호: 11, 제목: "공지사항11", 날짜: "2024.09.22", 작성자: "이로케", 조회: 53 },
    { 번호: 10, 제목: "공지사항10", 날짜: "2024.09.22", 작성자: "이로케", 조회: 51 },
    { 번호: 9, 제목: "공지사항9", 날짜: "2024.09.21", 작성자: "이로케", 조회: 153 },
    { 번호: 8, 제목: "공지사항8", 날짜: "2024.09.21", 작성자: "이로케", 조회: 151 },
    { 번호: 7, 제목: "공지사항7", 날짜: "2024.09.21", 작성자: "이로케", 조회: 153 },
    { 번호: 6, 제목: "공지사항6", 날짜: "2024.09.20", 작성자: "이로케", 조회: 183 },
    { 번호: 5, 제목: "공지사항5", 날짜: "2024.09.20", 작성자: "이로케", 조회: 190 },
    { 번호: 4, 제목: "공지사항4", 날짜: "2024.09.19", 작성자: "이로케", 조회: 210 },
    { 번호: 3, 제목: "공지사항3", 날짜: "2024.09.18", 작성자: "이로케", 조회: 256 },
    { 번호: 2, 제목: "공지사항2", 날짜: "2024.09.17", 작성자: "이로케", 조회: 266 },
    { 번호: 1, 제목: "공지사항1", 날짜: "2024.09.16", 작성자: "이로케", 조회: 288 },
]

function displayTable() {
    var tableBody = document.getElementById("boardBody");
    tableBody.innerHTML = "";

    posts.forEach(function (post) {
        let newRow = document.createElement("tr");

        let postNum = document.createElement("td");
        let postName = document.createElement("td")
        let postDate = document.createElement("td");
        let postWriter = document.createElement("td");
        let postCheck = document.createElement("td");

        postNum.innerHTML = post.번호;

        let reviewLink = document.createElement("a");
        reviewLink.innerHTML = post.제목;
        reviewLink.href = "#"
        reviewLink.setAttribute("onclick", "loadContent('./sub/notice/notice_detail.html')");
        postName.appendChild(reviewLink);

        postDate.innerHTML = post.날짜;
        postWriter.innerHTML = post.작성자;
        postCheck.innerHTML = post.조회;

        newRow.appendChild(postNum);
        newRow.appendChild(postName);
        newRow.appendChild(postDate);
        newRow.appendChild(postWriter);
        newRow.appendChild(postCheck);

        postName.addEventListener('click', function () {
            post.조회++;
            postCheck.innerHTML = post.조회;
        });

        tableBody.appendChild(newRow);
    });
}

displayTable();