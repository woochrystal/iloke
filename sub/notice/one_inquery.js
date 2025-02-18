function previous() {
    //alert('모든 내용이 사라집니다 그래도 취소하시겠습니까?')
    location.href = './index.html';
}

function save() {
    const title = document.querySelector('input[name="subject"]').value.trim();
    const contents = document.querySelector('textarea[name="contents"]').value.trim();

    if (!title || !contents) {
        alert('제목과 본문을 모두 작성해주세요.');
        return;
    }

    alert('글이 정상적으로 게시되었습니다.');
    location.href = './index.html';
}
