$(document).ready(function() {
    // 이전 버튼 클릭 시 이전 페이지로 이동
    $('#previous_btn').click(function() {
        loadContent('/sub/member/find_password.html');
    });

    // 다음 버튼 클릭 시 유효성 검사 후 다음 페이지로 이동
    $('#next_btn').click(function() {
        const inputField = $('#id_input').val().trim();

        if (inputField !== "") {
            // 유효성 검사 통과 - 다음 페이지로 이동
            loadContent('/sub/member/find_password_reset.html');
        } else {
            // 유효성 검사 실패 - 경고 메시지 표시
            alert("인증번호를 입력해주세요.");
        }
    });
});
