function changeImage(index) {
    const showroomImage = document.getElementById("showroomImage");
    if (index === 1) {
        showroomImage.src = "./content/img/sample/321.png";
    } else if (index === 2) {
        showroomImage.src = "./content/img/sample/jongro.png";
    } else if (index === 3) {
        showroomImage.src = "./content/img/sample/shinchon.png";
    }
}