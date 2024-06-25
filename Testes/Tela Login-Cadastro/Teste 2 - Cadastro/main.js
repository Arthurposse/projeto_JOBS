let icon_olho = document.getElementById('icon_olho');

icon_olho.onclick = function(){
    if(icon_olho.className === 'bi bi-eye-slash-fill'){
        icon_olho.className = "bi bi-eye-fill";
    }
    else {
        icon_olho.className = "bi bi-eye-slash-fill";
    }
}