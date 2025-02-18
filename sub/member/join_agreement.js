// 온로드
$(function () {
    $("#agree-all").on("change",function(){
        $('.agree').prop('checked', this.checked);
    });

    $(".btnNext").click(function(){
        // 필수체크란 체크상태인지 확인
        if($("#agree1").is(":checked") && $("#agree2").is(":checked")){
            // 체크 됐을 경우
            loadContent('./sub/member/join.html');
        }else{
            // 아닐 경우
            // 이전에 필수 알림 삭제하고 띄우기
            $(".center").remove();
            $(".button-container").prev().append('<div class="center"><strong>❗ (필수) 이용약관 동의을 체크해주세요.</strong></div>');
        }
    });
})