$(function () {
  // 초기 필터 내용 가리기
  $(".filter_ctl").css("display", "none");

  document.querySelectorAll(".filter-tit").forEach(function (tit) {
    // 브라우저 전체 선택 요소 .filter-tit 선택, forEach 반복하는 함수(tit 매개변수) 정의
    tit.addEventListener("click", function () {
      // 매개변수 tit의 클릭이벤트 발생하는 함수 정의
      const filterList = this.nextElementSibling; // .filter-tit 다음에 있는 .filter-list 선택
      if (filterList.style.display == "block") {
        // filterList(.filter-list)이 블록일 때
        filterList.style.display = "none"; // 감추고
      } else {
        filterList.style.display = "block"; // 아닌경우 보여줌
      }
    });
  });

  // 좌측 체크박스 기능
  $("input[type='checkbox']").on("change", function () {
    let chk_name = $(this).attr("name");
    let chk_value = $(this).attr("value");

    let checkedValues = $(
      "input[name=" + chk_name + ']:not([value="all"]):checked'
    )
      .map(function () {
        return $(this).val();
      })
      .get();
    if (chk_value == "all") {
      // 전체 체크시 (체크 빠지는건 여기서 처리 안함)
      $(this).prop("checked", true);
      $("input[name=" + chk_name + "]:not([value='all'])").prop(
        "checked",
        false
      );

      if (checkedValues) {
        checkedValues.forEach(function (value) {
          $("#" + value).remove();
        });
      }
    } else {
      // 다른거 체크시(나머지들 체크상태에따라 전체체크는 빠짐)
      $("input[name=" + chk_name + "][value='all']").prop(
        "checked",
        !checkedValues.length
      );

      if ($(this).is(":checked")) {
        let detail_con = "<div class='tags' id='" + chk_value + "'>";
        detail_con += "<span>" + $(this).next("span").text() + "</span>";
        detail_con +=
          `<div class="xs-close" onclick="xs_close('` + chk_value + `')">`;
        detail_con += "<img src='./content/img/main/close_icon.svg' alt='' />";
        detail_con += "</div>";
        detail_con += "</div>";
        $(".checked_tag_box").append(detail_con);
      } else {
        $("#" + chk_value).remove();
      }
    }

    if ($(".checked_tag_box").children(".tags").length > 0) {
      $(".filter_ctl").css("display", "flex");
    } else {
      $(".filter_ctl").css("display", "none");
    }
  });
});

function xs_close(_this) {
  if ($(".checked_tag_box").children(".tags").length <= 1) {
    $(".filter_ctl").css("display", "none");
  }

  $("input[value='" + _this + "']").prop("checked", false);

  let this_neme = $("input[value='" + _this + "']").attr("name");

  let this_neme_list = $(
    "input[name=" + this_neme + ']:not([value="all"]):checked'
  )
    .map(function () {
      return $(this).val();
    })
    .get();

  if (this_neme_list.length <= 0) {
    $("input[name=" + this_neme + "][value='all']").prop("checked", true);
  }

  $("#" + _this).remove();
}

function re_load() {
  $(".checked_tag_box").children(".tags").remove();
  $(".filter_ctl").css("display", "none");

  // 전체항목 모두 체크
  $("input[value='all']").prop("checked", true);
  // 전체를 뺀 체크박스 체크뺌

  $("input:not([value='all'])").prop("checked", false);
}


// 하트 on/off
$(function(){
    // 관심상품
    $('.full').css('display','none')
    $('.price-container button').on('click', function() {
        let full = $(this).find('.full');
        let line = $(this).find('.line');
        if(full.css('display') == 'none'){
            line.css('display','none');
            full.css('display','inline-block');
        }else if(line.css('display') == 'none'){
            full.css('display','none');
            line.css('display','inline-block');
        }
    });


})


// $(function () {
//   $(".price-container button").on("click", function () {
//     const $heartIcon = $(this).find('i');
//     $heartIcon.toggleClass('fa-solid fa-heart');
//   });
// });

// <i class="fa-regular fa-heart"></i>

// <i class="fa-solid fa-heart"></i>