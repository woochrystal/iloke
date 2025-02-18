window.scrollTo(0, 0);
var posts = [
    { 번호: 15, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.22", 작성자: "fe*****", 조회: 53 },
    { 번호: 14, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.22", 작성자: "sd*****", 조회: 51 },
    { 번호: 13, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.22", 작성자: "zx*****", 조회: 53 },
    { 번호: 12, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.22", 작성자: "qw*****", 조회: 51 },
    { 번호: 11, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.22", 작성자: "ss*****", 조회: 53 },
    { 번호: 10, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.22", 작성자: "dl*****", 조회: 51 },
    { 번호: 9, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.21", 작성자: "sf*****", 조회: 153 },
    { 번호: 8, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.21", 작성자: "ee*****", 조회: 151 },
    { 번호: 7, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.21", 작성자: "dl*****", 조회: 153 },
    { 번호: 6, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.20", 작성자: "sf*****", 조회: 183 },
    { 번호: 5, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.20", 작성자: "ee*****", 조회: 190 },
    { 번호: 4, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.19", 작성자: "sf*****", 조회: 210 },
    { 번호: 3, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.18", 작성자: "ee*****", 조회: 256 },
    { 번호: 2, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.17", 작성자: "ee*****", 조회: 266 },
    { 번호: 1, 후기: "너무 좋아요 ~ 다음에도 여기에서 사야할거 같아요", 날짜: "2024.09.16", 작성자: "ee*****", 조회: 288 },
]

function displayTable() {
    var tableBody = document.getElementById("boardBody");
    tableBody.innerHTML = "";

    posts.forEach(function (post) {
        let newRow = document.createElement("tr");

        let postNum = document.createElement("td");
        let postReview = document.createElement("td")
        let postDate = document.createElement("td");
        let postWriter = document.createElement("td");
        let postCheck = document.createElement("td");

        postNum.innerHTML = post.번호;
        let reviewLink = document.createElement("a");
        reviewLink.innerHTML = post.후기;
        reviewLink.href = "#";
        reviewLink.setAttribute("onclick", "loadContent('./sub/notice/review_detail.html')");
        postReview.appendChild(reviewLink);

        postDate.innerHTML = post.날짜;
        postWriter.innerHTML = post.작성자;
        postCheck.innerHTML = post.조회;

        newRow.appendChild(postNum);
        newRow.appendChild(postReview);
        newRow.appendChild(postDate);
        newRow.appendChild(postWriter);
        newRow.appendChild(postCheck);

        postReview.addEventListener('click', function () {
            post.조회++;
            postCheck.innerHTML = post.조회;
        });

        tableBody.appendChild(newRow);
    });
}

displayTable();
