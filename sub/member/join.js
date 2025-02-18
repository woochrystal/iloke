// 온로드
$(function () {    
    // 취소버튼 클릭시
    $("#btnCancel").click(function () {
        window.location.href = "../../index.html";
    });
    
    // 가입버튼 클릭시
    $("#submit").click(function () {
        if (valChk()) {
        // 성공시 내용 작성
        loadContent('./sub/member/join_fin.html');
        } else {
        }
    });
    
    /// 이벤트
    /// 아이디
    $("#pid").focusout(function () {
        // 기존 메시지 삭제 (여러 번 문구가 중복 삽입되지 않도록)
        $(this).next(".message").remove();
    
        /// 아이디
        if ($(this).val().length < 4) {
        // 최소 4자이상 입력하지 않으면 하단에 표기
        $(this).after(
            '<p class="message" style="color:#f294b2;">최소 4자 이상 입력해 주세요.</p>'
        );
        } else if (
        !(
            $("#pid").val().match(/[a-z]/i) && $("#pid").val().match(/[0-9]/i)
        )
        ) {
        // 영문 숫자 조합이 아니면 하단에 표기
        $(this).after(
            '<p class="message" style="color:#f294b2;">아이디는 숫자,영문을 포함해야 합니다.</p>'
        );
        } else {
        // 문제없을때 제대로 표기
        $(this).after(
            '<p class="message" style="color:#06ADC3;">사용가능한 아이디입니다.</p>'
        );
        }
    });
    /// 닉네임
    $("#pnick").focusout(function () {
        // 기존 메시지 삭제 (여러 번 문구가 중복 삽입되지 않도록)
        $(this).next(".message").remove();
    
        if ($(this).val() != "" && $(this).val().length < 2) {
        // 최소 2자이상 입력하지 않으면 하단에 표기
        $(this).after(
            '<p class="message" style="color:#f294b2;">최소 2자 이상 입력해 주세요.</p>'
        );
        } else if ($(this).val() != "") {
        $(this).after(
            '<p class="message" style="color:#06ADC3;">사용가능한 닉네임입니다.</p>'
        );
        } else {
        // 문제없을때 제대로 표기
        $(this).next(".message").remove();
        }
    });
    
    // 이메일
    $("#email").focusout(function () {
        // 기존 메시지 삭제 (여러 번 문구가 중복 삽입되지 않도록)
        $(this).parent().next(".message").remove();
    
        if (
        !$("#email")
            .val()
            .match(
            /^[a-z0-9]{3,}@[a-z0-9]{3,}[.]([a-z]{3}|([a-z]{2}[.][a-z]{2}))$/i
            )
        ) {
        // 이메일 정확하게 입력하지 않았을 경우
        $(this)
            .parent()
            .after(
            '<p class="message" style="color:#f294b2;">이메일을 정확하게 입력해주세요.</p>'
            );
        } else {
        // 문제없을때 제대로 표기
        $(this)
            .parent()
            .after(
            '<p class="message" style="color:#06ADC3;">사용가능한 이메일입니다.</p>'
            );
        }
    });
    
    // 전화번호
    $("#tel").focusout(function () {
        // 기존 메시지 삭제 (여러 번 문구가 중복 삽입되지 않도록)
        $(this).next(".message").remove();
        if (
        !$("#tel")
            .val()
            .match(/^((\d{3}-\d{4})|(\d{2,3}-\d{3}))-\d{4}$/i)
        ) {
        // 이메일 정확하게 입력하지 않았을 경우
        $(this).after(
            '<p class="message" style="color:#f294b2;">전화번호가 올바르지 않습니다.</p>'
        );
        } else {
        // 문제없을때 제대로 표기
        $(this).after(
            '<p class="message" style="color:#06ADC3;">사용가능한 전화번호입니다.</p>'
        );
        }
    });
    
    // datapicker
    $("#date").on("change", function () {
        const selectedDate = $(this).val();
        // 선택한 날짜를 처리하는 추가 로직을 여기에 추가
    });
});
    
function valChk() {
    /// 아이디 체크
    if (
        !(
        $("#pid")
            .val()
            .match(/^[a-z0-9]{4,}$/i) &&
        $("#pid").val().match(/[a-z]/i) &&
        $("#pid").val().match(/[0-9]/i)
        )
    ) {
        alert("아이디는 숫자,영문을 포함한 최소 4자 이상 입력해 주세요.");
        $("#pid").focus();
        return false;
    }
    
    // 초기 입력부터 막음
    
    /// 비밀번호 체크
    if ($("#pw").val().trim().length < 10) {
        // 최소 10자이상 체크
        alert("패스워드는 10자 이상 입력하셔야합니다.");
        $("#pw").focus();
        return false;
    } else if ($("#pw").val() != $("#pw2").val()) {
        // 비밀번호 확인 체크
        alert("비밀번호 확인이 서로 다릅니다.");
        $("#pw").focus();
        return false;
    } else if (
        !/[0-9]/.test($("#pw").val()) ||
        !/[a-zA-Z]/.test($("#pw").val())
    ) {
        // 숫자 영문자 포함 체크
        alert("비밀번호는 숫자와 영문자를 모두 포함해야 합니다.");
        return false;
    }
    
    /// 이름 체크
    if (
        $("#pname").val().trim() == null ||
        $("#pname").val().trim() == ""
    ) {
        // 미입력 시
        alert("이름은 필수항목 입니다.");
        $("#pname").focus();
        return false;
    }
    
    /// 닉네임 체크
    if ($("#pnick").val() != "" && $("#pnick").val().length < 2) {
        // 입력하지 않거나 최소 2자 이상 입력해야함
        alert("최소 2자 이상 입력해 주세요.");
        return false;
    }
    
    // 이메일
    if (
        !$("#email")
        .val()
        .match(
            /^[a-z0-9]{3,}@[a-z0-9]{3,}[.]([a-z]{3}|([a-z]{2}[.][a-z]{2}))$/i
        )
    ) {
        // 잘못된 이메일 입력시
        alert("사용 가능하지 않은 이메일입니다.");
        return false;
    }
    
    // 전화번호
    if (
        !$("#tel")
        .val()
        .match(/^((\d{3}-\d{4})|(\d{2,3}-\d{3}))-\d{4}$/i)
    ) {
        alert("전화번호가 올바르지 않습니다.");
        return false;
    }
    
    // 생일
    if ($("#calendars").val().length <= 0) {
        alert("양력,음력을 선택해 주세요.");
        $("#calendars").focus();
        return false;
    } else if (
        parseInt($("#birth").val().split("-")[0]) < 1900 ||
        parseInt($("#birth").val().split("-")[1]) < 1 ||
        parseInt($("#birth").val().split("-")[2]) < 1 ||
        isNaN($("#birth").val().split("-")[0]) ||
        isNaN($("#birth").val().split("-")[1]) ||
        isNaN($("#birth").val().split("-")[2])
    ) {
        alert("생일이 올바르지 않습니다.");
        $("#birth").focus();
        return false;
    }
    
    return true;
}

//아이디에 숫자와 영어만 입력하게(아닌값들은 자동으로 삭제)
function validateInput(input) {
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, "");
}

//아이디에 숫자와 영어만 입력하게(아닌값들은 자동으로 삭제)
function validateInputE(input) {
    input.value = input.value.replace(/[^a-zA-Z0-9@.]/g, "");
}    

//아이디에 숫자와 한글만 입력하게(아닌값들은 자동으로 삭제)
function validateInputK(input) {
    input.value = input.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
}

//주소 영어숫자한글 띄워쓰기 가능
function validateInputA(input) {
    input.value = input.value.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9 ]/g, "");
}

//전화번호 영어숫자한글 띄워쓰기 가능
function validateInputN(input) {
    input.value = input.value.replace(/[^0-9-]/g, "");
}

//이메일 드롭다운 박스 내려올떄 나오는 이벤트
function handleSelectChange() {
    var emailVal = $("#email").val();
    var emailVal2 = $("#email2").val();
    emailVal = emailVal.split("@")[0];
    $("#email").val(emailVal + "@" + emailVal2);
    $("#email").focus();
}