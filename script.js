const colorInput = document.querySelector('#color'),
hex = document.querySelector('#hex')

colorInput.addEventListener('input', actualizar);

function actualizar() {

    const color = colorInput.value;
    hex.innerHTML=color;


    const rgbcolor =rgb(color);

}

function rgb(hex){
    hex=hex.slice(1);
    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4,6),16);

    document.getElementById("rojo").textContent="R: " +r;
    document.getElementById("verde").textContent="G: " +g;
    document.getElementById("azul").textContent="B: " +b;

    return {r,g,b}
}
function complementario(rgbcolor){
    var r = 255- rgbcolor.r;
    var g = 255- rgbcolor.g;
    var b = 255- rgbcolor.b;


}