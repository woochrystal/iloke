$(function() {
    let checkboxes = $('input[type="checkbox"]').not('#tot_chk');  // tot_chk를 제외한 모든 체크박스 선택
    const totChk = $('#tot_chk');
    const leftPrice = $('.left_price');
    const rightPrice = $('.right_price');
    const deleteBtn = $('#delete_btn'); // '선택 상품 삭제' 버튼

    // 체크박스가 변경될 때 가격 계산 함수
    function calculateTotal() {
        let total = 0;

        // 새로 갱신된 체크박스 기준으로 가격 계산
        checkboxes.each(function() {
            if ($(this).is(':checked')) {
                const priceText = $(this).closest('tr').find('.tot_price_td').text();
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));  
                // '숫자 아닌 문자' 모두 찾아서 ''으로 대체(삭제)
                total += price;
            }
        });

        // 가격 업데이트
        leftPrice.text(total.toLocaleString() + '원');
        rightPrice.text(total.toLocaleString() + '원');
    }

    // 상품이 없을 때 버튼 숨기는 함수
    function toggleDeleteButton() {
        if (checkboxes.length === 0) {
            deleteBtn.hide(); // 상품이 없으면 버튼 숨김
        } else {
            deleteBtn.show(); // 상품이 있으면 버튼 표시
        }
    }

    // '전체 선택' 체크박스 클릭 시
    totChk.change(function() {
        checkboxes.prop('checked', $(this).is(':checked'));  
        // 다른 모든 체크박스의 상태를 totChk와 동일하게 설정
        calculateTotal();
    });

    // 개별 체크박스가 변경될 때마다 실시간 가격 계산 및 전체 선텍 체크박스 상태 확인
    checkboxes.change(function() {
        calculateTotal();

        // 모든 체크박스가 선택된 상태인지 확인
        const allChecked = checkboxes.length === checkboxes.filter(':checked').length;

        // 모든 체크박스가 선택된 상태가 아니면 전체 선택 체크박스 비활성화
        totChk.prop('checked', allChecked);
    });

    // 선택상품삭제
    $('#delete_btn').click(function() {
        const checkedItems = checkboxes.filter(':checked');
        const checkedCount = checkedItems.length;

        if (checkedCount > 0) {
            const confirmDelete = confirm(`선택하신 ${checkedCount}개 상품을 장바구니에서 삭제하시겠습니까?`);

            if (confirmDelete) {
                checkedItems.each(function() {
                    $(this).closest('tr').remove(); // 해당 행 삭제
                });

                checkboxes = $('input[type="checkbox"]').not('#tot_chk'); // 남은 체크박스 다시 선택

                // 삭제 후 가격 다시 계산
                calculateTotal();

                // 남은 체크박스 확인 후 테이블 숨기고, '장바구니에 담겨있는 상품이 없습니다' 표시
                if (checkboxes.length === 0) {
                    $('.table_div table').hide();  // 테이블 숨김
                    $('#empty_cart_message').show();  // 빈 장바구니 메시지 표시
                }

                // 삭제 후 버튼 보임 여부 확인
                toggleDeleteButton();
            }
        } else {
            alert('삭제할 상품을 선택해주세요.');
        }
    });

    // 페이지 로드 시 상품 상태에 따른 버튼 표시 여부 결정
    toggleDeleteButton();

    // 상품 주문 버튼 클릭
    window.orderProducts = function() {
        const checkedItems = checkboxes.filter(':checked');

        // 장바구니에 상품이 없을 때
        if (checkboxes.length === 0) {
            alert('장바구니에 상품이 없습니다. 상품을 추가해주세요.');
            return; // 다음 페이지로의 진행을 막음
        }

        // 선택된 상품이 없을 때 처리
        if (checkedItems.length === 0) {
            alert('선택하신 상품이 없습니다. 상품을 선택해주세요.');
            return; // 다음 페이지로의 진행을 막음
        }

        // 체크된 아이템이 있을 경우 다음 페이지로 이동
        loadContent('/sub/order/order.html');
    };
});
