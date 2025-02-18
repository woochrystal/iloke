window.scrollTo(0, 0);  // 화면 로드 시에 스크롤 맨 위쪽으로 올림 

document.getElementById("login_btn").addEventListener("click", function() {
    loadContent('/sub/member/login.html');
});