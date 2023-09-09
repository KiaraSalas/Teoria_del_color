const colorInput = document.querySelector('#color')
const coloresComplementarios = document.querySelector('#coloresComplementarios')
const coloresAnalogos = document.querySelector('#coloresAnalogos')
const coloresMonocromaticos = document.querySelector('#coloresMonocromaticos')

colorInput.addEventListener('input', actualizar);

function actualizar() {

    const color = colorInput.value;
    hex.innerHTML = color;
    coloresComplementarios.innerHTML = ""
    coloresAnalogos.innerHTML = ""
    coloresMonocromaticos.innerHTML = ""


    const rgbcolor =rgb(color);
    var colorComplementario = complementario(rgbcolor);


    var diferencia = 0;
    var colorComplementarioDiv = generarColorVecino(colorComplementario, 1, diferencia);
    generarColor(coloresComplementarios, colorComplementarioDiv);
    diferencia = 1;
    var colorComplementarioDiv = generarColorVecino(colorComplementario, 1, diferencia);
    generarColor(coloresComplementarios, colorComplementarioDiv);

    var diferencia = 0;
    for (let i = 2; i >=1; i-- ){
      const colorAnalogo = generarColorVecino(rgbcolor,i,diferencia);
      generarColor(coloresAnalogos,colorAnalogo);
      diferencia = 0;
    }
    diferencia = 1;
    for (let i = 1; i <=2; i++ ){
      const colorAnalogo = generarColorVecino(rgbcolor,i,diferencia);
      generarColor(coloresAnalogos,colorAnalogo);
      diferencia = 1;
    }

    for (let i = 1; i <=3 ; i++) {
        const colorMono = generarMonocromatico(rgbcolor, (i * 0.35));
        generarColor(coloresMonocromaticos,colorMono);
      }





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

function generarMonocromatico(rgb, aumento) {
    var r = Math.min(255, rgb.r * (1 + aumento))
    var g = Math.min(255, rgb.g * (1 + aumento))
    var b = Math.min(255, rgb.b * (1 + aumento))
    
    return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`;
}

function complementario(rgbcolor){
    var r = 255- rgbcolor.r;
    var g = 255- rgbcolor.g;
    var b = 255- rgbcolor.b;

    document.getElementById("rojoC").textContent = "R: "+r;
    document.getElementById("verdeC").textContent = "G: "+g;
    document.getElementById("azulC").textContent = "B: "+b;

    var asignarcolor = document.getElementById("cuadroC");
    asignarcolor.style.backgroundColor = `rgb(${r},${g},${b}`;
    
    return {r,g,b}
}

    function generarColorVecino(rgbcolor, numero, diferencia){
        console.log(rgbcolor.r,"", rgbcolor.g,"", rgbcolor.b);
        var rgbDuplicado = Object.values(rgbcolor);
        var rgbModificacion = Object.values(rgbcolor);
        var numSuperior = Math.max(...rgbDuplicado);
        rgbDuplicado.splice(rgbDuplicado.indexOf(numSuperior),1);
        var numSuperior2 = Math.max(...rgbDuplicado);
        var limbo = (numSuperior*0.75).toFixed(0);
        
        rgbDuplicado = Object.values(rgbcolor);
        var listaMod = [true, true, true];
        var operacion = 0.0;
        if (limbo>numSuperior2){//si es primario no modificar color grande
            console.log("Primario");
            rgbModificacion.splice(rgbModificacion.indexOf(numSuperior),1);
            operacion = 60 * numero;
            console.log(operacion);
            listaMod[rgbDuplicado.indexOf(numSuperior)] = false;
        }else{//si es secundario, no modificar color chico
            console.log("Secundario");
            var numInferior = Math.min(...rgbModificacion);
            rgbModificacion.splice(rgbModificacion.indexOf(numInferior),1);
            operacion = - 60 * numero;
            console.log(operacion);
            listaMod[rgbDuplicado.indexOf(numInferior)] = false;
        }
        console.log(listaMod);

        var rNueva = rgbcolor.r;
        var gNueva = rgbcolor.g;
        var bNueva = rgbcolor.b;

        if(listaMod[0]) {
            console.log("R");
            rNueva = Math.min(255, rgbcolor.r+(operacion*diferencia));
            if (diferencia == 0) {
                diferencia = 1;
            } else {
                diferencia = 0;
            }
        }
        if(listaMod[1]) {
            console.log("G");
            gNueva = Math.min(255, rgbcolor.g+(operacion*diferencia));
            
            if (diferencia == 0) {
                diferencia = 1;
            } else {
                diferencia = 0;
            }
        }
        if(listaMod[2]) {
            console.log("B");
            bNueva = Math.min(255, rgbcolor.b+(operacion*diferencia));
            
            if (diferencia == 0) {
                diferencia = 1;
            } else {
                diferencia = 0;
            }
        }
        console.log(rNueva,  gNueva, bNueva);
        return `rgb(${rNueva}, ${gNueva}, ${bNueva})`;
}

function generarColor(ubicacion, rgbNew) {
    const cuadroColor = document.createElement("div");
    cuadroColor.className = "cuadroColor";
    cuadroColor.style.backgroundColor = rgbNew;
    
    ubicacion.appendChild(cuadroColor);
  }