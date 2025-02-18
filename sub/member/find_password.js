// 아이디 유효성 검사 함수
function validateId(id) {
    // 영어와 숫자가 모두 포함된 4자 이상의 아이디를 확인하는 정규식
    const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;
    return idPattern.test(id);
}

$(document).ready(function () {
    // '다음' 버튼 클릭 이벤트
    $('#next_btn').click(function () {
        const idInput = $('#id_input').val();

        if (validateId(idInput)) {
            // 유효성 통과 시 다음 페이지로 이동
            alert('가입 시 입력한 이메일로 인증번호를 보냈습니다.');
            loadContent('/sub/member/user_certification_confirm.html');
        } else {
            // 유효성 실패 시 경고 메시지
            alert('존재하지 않는 id입니다.');
        }
    });
});
