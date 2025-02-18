$(function () {
    let modal = document.getElementById("imageModal")
    let btn = document.getElementsByClassName("photo-review-imagebox")
    let close = document.getElementsByClassName("close")[0]
    
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = function () {
            modal.style.display = "block"
        }
    }
    
    close.onclick = function () {
        modal.style.display = "none"
    }
    
    window.onclick = function (event) {
        if(event.target == modal) {
            modal.style.display = "none"
        }
    }
})