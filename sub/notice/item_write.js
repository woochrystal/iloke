window.scrollTo(0, 0);
function previous() {
    loadContent('./sub/notice/itemInquery.html')
}

function save() {
    const title = document.querySelector('input[name="subject"]').value.trim();
    const contents = document.querySelector('textarea[name="contents"]').value.trim();

    if (!title || !contents) {
        alert('제목과 본문을 모두 작성해주세요.');
        return;
    }

    alert('글이 정상적으로 게시되었습니다.');
    loadContent('./sub/notice/itemInquery.html');
}