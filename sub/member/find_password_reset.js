$(document).ready(function() {
    $('#next_btn').on('click', function() {
        const password = $('#pw_input').val();
        const confirmPassword = $('#pw_input_chk').val();

        // 비밀번호 유효성 검사 (숫자와 영문자를 모두 포함한 10글자 이상)
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,}$/;

        if (!passwordRegex.test(password)) {
            alert("비밀번호는 숫자와 영문자를 모두 포함한 10글자 이상이어야 합니다.");
            return; // 유효성 검사 실패
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return; // 비밀번호 확인 실패
        }

        // 유효성 검사 통과 - 다음 페이지로 이동
        loadContent('/sub/member/find_password_complete.html');
    });
});
