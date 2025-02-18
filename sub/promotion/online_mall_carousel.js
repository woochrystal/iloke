$(function () {
const items = document.querySelector('.carousel-items');
const dots = document.querySelectorAll('.dot');
let index = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;
const itemWidth = 320;

    // 'next' 버튼 클릭 시
    document.querySelector('.next').addEventListener('click', () => {
        if (index < totalItems - 1) {
            index++;
        } else {
            index = 0; // 마지막 슬라이드에서 처음으로 돌아감
        }
        updateCarousel();
    });

    // 'prev' 버튼 클릭 시
    document.querySelector('.prev').addEventListener('click', () => {
        if (index > 0) {
            index--;
        } else {
            index = totalItems - 1; // 첫 슬라이드에서 마지막으로 이동
        }
        updateCarousel();
    });

    // 슬라이드 업데이트 함수
    function updateCarousel() {
        items.style.transform = `translateX(${-index * itemWidth}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // 초기 슬라이드 상태 업데이트
    updateCarousel();
})