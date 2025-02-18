$(function() {
    // 금액에서 컴마를 제거하는 함수
    function removeComma(num) {
        return parseInt(num.replace(/,/g, ""));
    }

    // 금액에 컴마를 추가하는 함수
    function addComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 실시간으로 결제 금액을 업데이트하는 함수
    function updateTotalPrice() {
        const rightPriceElement = $('.right_price');
        const totalPriceElement = $('#total_price');
        const totLeftElement = $('.tot_right');

        // 현재 합계 금액을 가져와서 컴마 제거 후 숫자로 변환
        const rightPrice = removeComma(rightPriceElement.text());

        // mileage와 deposit 값을 가져옴
        let mileage = parseInt($('#mileage').val() || 0);
        let deposit = parseInt($('#deposit').val() || 0);

        // 마일리지 최대 10,000원 제한
        if (mileage > 10000) {
            mileage = 10000;
            $('#mileage').val(mileage);
        }

        // 예치금 최대 1,000원 제한
        if (deposit > 1000) {
            deposit = 1000;
            $('#deposit').val(deposit);
        }

        // 마일리지와 예치금을 차감한 최종 금액 계산
        const finalPrice = rightPrice - mileage - deposit;

        // 최종 금액이 0보다 작으면 0으로 설정
        const displayedPrice = finalPrice < 0 ? 0 : finalPrice;

        // 계산된 최종 금액 표시 (콤마 추가)
        totalPriceElement.text(addComma(displayedPrice) + '원');
        totLeftElement.text(addComma(displayedPrice) + '원');
    }

    // mileage와 deposit 입력 필드에 숫자만 입력 가능
    $('#mileage, #deposit').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ""); // 숫자만 허용
        updateTotalPrice();
    });

    // 페이지 로드 시 초기 업데이트
    updateTotalPrice();

    // 휴대폰 번호 유효성 검사 함수
    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^010-\d{4}-\d{4}$/;
        return phoneRegex.test(phoneNumber);
    }

    // 이메일 유효성 검사 함수
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 주문자 이름, 수취인 이름 입력창에 한글만 입력 가능
    $('input[name="orderer_name"], input[name="recipient_name"]').on('input', function() {
        this.value = this.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, ""); // 한글만 허용
    });

    // 주소 입력창에 한글, 영어, 숫자, 띄어쓰기만 입력 가능
    $('input[name="recipient_address"]').on('input', function() {
        this.value = this.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]/g, ""); 
    });

    // 입력값 유효성 검사 함수
    function validateForm() {
        const ordererName = $('input[name="orderer_name"]');
        const ordererPhone = $('input[name="orderer_phone"]');
        const ordererEmail = $('input[name="orderer_email"]');
        const recipientName = $('input[name="recipient_name"]');
        const recipientAddress = $('input[name="recipient_address"]');
        const recipientPhone = $('input[name="recipient_phone"]');
        const agreeCheck = $('#agree_chk').is(':checked');

        // 주문자 이름 검사
        if (!ordererName.val().trim()) {
            alert("주문하시는 분의 이름을 입력해주세요.");
            ordererName.focus(); // Focus 이동
            return false;
        }

        // 주문자 휴대폰 번호 검사
        if (!validatePhoneNumber(ordererPhone.val().trim())) {
            alert("주문하시는 분의 휴대폰 번호 형식이 올바르지 않습니다.");
            ordererPhone.focus(); 
            return false;
        }

        // 주문자 이메일 검사
        if (!validateEmail(ordererEmail.val().trim())) {
            alert("주문하시는 분의 이메일 형식이 올바르지 않습니다.");
            ordererEmail.focus(); 
            return false;
        }

        // 받으실분 이름 검사
        if (!recipientName.val().trim()) {
            alert("받으실 분의 이름을 입력해주세요.");
            recipientName.focus();
            return false;
        }

        // 받으실 곳 주소 검사
        if (!recipientAddress.val().trim()) {
            alert("받으실 곳의 주소를 입력해주세요.");
            recipientAddress.focus(); 
            return false;
        }

        // 수취인 휴대폰 번호 검사
        if (!validatePhoneNumber(recipientPhone.val().trim())) {
            alert("수취인 휴대폰 번호 형식이 올바르지 않습니다.");
            recipientPhone.focus(); 
            return false;
        }

        // 동의 여부 검사
        if (!agreeCheck) {
            alert("이용약관에 동의해주세요.");
            $('#agree_chk').focus(); 
            return false;
        }

        return true; // 모든 유효성 검사 통과
    }

    // 결제하기 버튼 클릭 시 유효성 검사 수행
    $('.order_btn').on('click', function(e) {
        e.preventDefault(); // 버튼 클릭 시 기본 동작 방지
        if (validateForm()) {
            // 유효성 검사 통과 시 결제 진행
            alert("결제가 진행됩니다.");
            loadContent('./sub/order/order_end.html'); 
        }
    });
});
