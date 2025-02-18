$(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();

    // 간단한 클라이언트 측 로그인 처리 (임시로 admin/password로 로그인 허용)
    if (val_chk()) {
      var pid = $("#pid").val();
      var password = $("#password").val();
      // 토큰을 localStorage에 저장 (백엔드 없으므로 임시 토큰)
      var token = btoa(pid + ":" + password); // base64로 인코딩
      localStorage.setItem("token", token);
      alert("로그인 되었습니다.");
      $("#join").css("display","none");
      $(".head-login").css("display","block");
      window.location.href = "../../index.html";
    } else {
      $("#result").text("가입되지 않은 아이디 입니다.");
    }
  });

  // 비회원 주문조회 클릭시
  $(".btnSearch").click(function(){
    $(".noOrder").remove();
    if($("input[name='pname'").val() == "1" && $("input[name='orderNo'").val()==1){
      loadContent('./sub/order/cart.html')
    }else{
      $(".btnSearch").after('<p class="noOrder">❗ 주문자명과 주문번호가 일치하는 주문이 존재하지 않습니다. 다시 입력해 주세요.</p>');
    }
  })
});

function val_chk() {
  // 아이디 체크 앞에 admin이나 test 포함되면 통과
  if (
    !($("#pid").val().startsWith("admin") || $("#pid").val().startsWith("test"))
  ) {
    alert("가입되지 않은 아이디 입니다.");
    return false;
  }

  if (!($("#password").val() == "administrator1234")) {
    alert("비밀번호가 다릅니다.");
    return false;
  }
  return true;
}
