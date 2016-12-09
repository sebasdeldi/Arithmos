


var d = document;
var f = d.forms[0];

var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");
var tblRes = d.getElementById("res");
var strMsg = d.getElementById("mensaje");

// Restablece los valores
btnReset.onclick = function() {
    strMsg.innerHTML = "";
    tblRes.innerHTML = "<thead>\
           <tr><td>i</td><td>x inf</td><td>x sup</td><td>xm</td><td>f(xm)</td><td>Error</td></tr>\
       </thead>\
       <tbody>\
           <tr></tr>\
       </tbody>";
    // Obligo a MathJax a renderizar de nuevo
    //MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    draw();
}

// Lee datps iniciales y ejecuta el metodo numerico
btnCalc.onclick = function() {
    btnReset.onclick();
    var strFcn = f.elements[0].value; // FIXME función global
    var xi = Number(f.elements[1].value);
    var xs = Number(f.elements[2].value);
    var ni = Number(f.elements[3].value); // FIXME como entero positivo
    var tol = Number(f.elements[4].value); // FIXME Positivo
    // Convierto la funcion para que se pueda evaluar
    var fcn = math.eval(strFcn);

    biseccion(fcn, xi, xs, ni, tol);
    // Obligo a MathJax a renderizar de nuevo
    //MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

biseccion = function(fcn, xi, xs, ni, tol) {
    var fi = fcn(xi);
    var fs = fcn(xs);

    if (fi == 0) {
        strMsg.innerHTML = "xi es una raíz";
    } else if (fs == 0) {
        strMsg.innerHTML = "xs es una raíz";
    } else if (fi*fs < 0) {
        strMsg.innerHTML = "Calculando tabla...";
        var xm = (xi + xs) / 2.0;
        var xaux; // FIXME declaracion sola
        var fm = fcn(xm);
        var iter = 1;
        var error = tol + 1;

        insertarFila(iter, xi, xs, xm, fm, error);

        while (error > tol && fm != 0 && iter < ni) {
            if (fi*fm < 0) {
                xs = xm;
                fs = fm;
            } else {
                xi = xm;
                fi = fm;
            }
            // Calculo los nuevos valores
            xaux = xm;
            xm = (xi + xs) / 2.0;
            fm = fcn(xm);
            error = math.abs(xm - xaux); // FIXME incluir opción de absoluto o relativo
            iter = iter + 1;

            insertarFila(iter, xi, xs, xm, fm, error);
        }
        if (fm == 0) {
            strMsg.innerHTML = "xm=" + xm + " es aproximación a una raíz, porque f(xm)=0";
        } else if (error < tol) {
            strMsg.innerHTML = "xm=" + xm + " es aproximación a una raíz, con error = " + error;
        } else {
            strMsg.innerHTML = "Fracaso en " + ni + " iteraciones";
        }
    } else {
        strMsg.innerHTML = "El intervalo es inadecuado";
    }
}

// insertarFila permite incluir una nueva fila en la tabla de resultados
insertarFila = function(iter, xi, xs, xm, fm, error) {
    var row = tblRes.insertRow(iter);
    row.insertCell(0).innerHTML = iter;
    row.insertCell(1).innerHTML = xi;
    row.insertCell(2).innerHTML = xs;
    row.insertCell(3).innerHTML = xm;
    row.insertCell(4).innerHTML = fm;
    row.insertCell(5).innerHTML = niceSNNumber(error.toExponential());
}

function draw() {
   var equation =  form.elements[0].value.slice(6);
  try {
    functionPlot({
      target: '#plot',
      data: [{
        fn: equation,
        sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
        graphType: 'polyline'
      }]
    });
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
}

document.getElementById('form').onsubmit = function (event) {
  event.preventDefault();
  draw();
};

var niceSNNumber = function (num) {
      try{
          var sOut = num.toString();
          if ( sOut.indexOf("E") > 0){
            sOut = sOut.replace("E","x10<sup>")+"</sup>";
          }
          if ( sOut.indexOf("e") > 0){
            sOut = sOut.replace("e","x10<sup>")+"</sup>";
          }
          return sOut;
      }
      catch ( e) {
          return num;
      }
}


