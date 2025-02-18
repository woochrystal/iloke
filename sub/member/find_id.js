$(function() {
    // 유효성 검사 함수
    function validateForm() {
        const nameInput = $('#name_input').val().trim();
        const emailInput = $('#email_input').val().trim();

        // 이름 유효성 검사
        if (nameInput === "") {
            alert("이름을 입력해 주세요.");
            return false;  // 유효성 검사 실패
        }

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alert("올바른 이메일 형식을 입력해 주세요.");
            return false;  // 유효성 검사 실패
        }

        // 유효성 검사 통과
        return true;
    }

    // '아이디 찾기' 버튼 클릭 시 유효성 검사 호출
    $('#find_btn').click(function(event) {
        if (validateForm()) {
            loadContent('/sub/member/find_id2.html');  // 유효성 검사 통과 시 다음 페이지로 이동
        } else {
            event.preventDefault();  // 유효성 검사 실패 시 페이지 이동을 막음
        }
    });

    // 이메일 도메인 선택 로직
    const emailInput = $('.input_div input:nth-child(2)');
    const emailDomainSelect = $('#email_domain');

    emailDomainSelect.change(function() {
        const selectedDomain = emailDomainSelect.find('option:selected').text();  // 도메인 텍스트 가져오기
        let currentEmail = emailInput.val().split('@')[0]; // 입력된 아이디 부분만 유지
        
        if (selectedDomain !== '직접입력') {
            // 이메일 입력란이 비어있으면 '@'를 바로 붙여줌
            if (!currentEmail) {
                emailInput.val('@' + selectedDomain);
            } else {
                emailInput.val(currentEmail + '@' + selectedDomain);
            }
        } else {
            emailInput.val(currentEmail + '@');  // '직접입력' 선택 시 도메인 제거
        }
    });
});
