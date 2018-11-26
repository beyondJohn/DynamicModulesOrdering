var displayMask = false;

var maskClick = function () {
    displayMask = !displayMask;
    if(displayMask){
        
        document.getElementById('divMask').style.display = "block";
        document.getElementById('divMask').style.opacity = ".4";
    }
    else{
        document.getElementById('divMask').style.opacity = "0";
        document.getElementById('divMask').style.display = "none";
    }
    modalClick();
}
var enableMask = function () {
    var divMask = document.createElement("DIV");
    divMask.id = "divMask";
    divMask.classList = "div-mask";
    divMask.addEventListener('click', function () { maskClick(); });
    document.body.appendChild(divMask);

};