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
           <tr><td>n</td><td>xn</td><td>f(xn)</td><td>Error</td></tr>\
       </thead>\
       <tbody>\
           <tr></tr>\
       </tbody>";

    draw();
}

// Lee datps iniciales y ejecuta el metodo numerico
btnCalc.onclick = function() {
    btnReset.onclick();
    var strFcnF = f.elements[0].value; // FIXME: funciones globales
    var strFcnG = f.elements[1].value;
    var xi = Number(f.elements[2].value);
    var ni = Number(f.elements[3].value); // FIXME: entero positivo
    var tol = Number(f.elements[4].value); // FIXME: real positivo o cero
    // Convierto la funcion para que se pueda evaluar
    var fcnf = math.eval(strFcnF);
    var fcng = math.eval(strFcnG);

    puntofijo(fcnf, fcng, xi, ni, tol);
    // Obligo a MathJax a renderizar de nuevo
    //MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

puntofijo = function(fcnf, fcng, xi, ni, tol) {
    var xn = xi;
    var fn = fcnf(xn);
    var iter = 0;
    var error = tol + 1
    insertarFila(iter, xn, fn, error);
    while (fn != 0 && error > tol && iter < ni) {
        xn = fcng(xi);
        fn = fcnf(xn);
        error = math.abs(xn - xi);
        xi = xn;
        iter = iter + 1;

        insertarFila(iter, xn, fn, error);
    }

    if (fn == 0) {
        strMsg.innerHTML = "xn=" + xn + " es una raíz"; // FIXME: mismos mensajes que bisección
    } else if (error < tol) {
        strMsg.innerHTML = "xn=" + xn + " es aproximación a una raíz";
    } else {
        strMsg.innerHTML = "Fracaso en " + ni + " iteraciones";
    }
}

// insertarFila permite incluir una nueva fila en la tabla de resultados
insertarFila = function(iter, xn, fn, error) {
    var row = tblRes.insertRow(iter+2);
    row.insertCell(0).innerHTML = iter;
    row.insertCell(1).innerHTML = xn;
    row.insertCell(2).innerHTML = fn;
    row.insertCell(3).innerHTML = niceSNNumber(error.toExponential());
}


function draw() {
   var equation =  f.elements[0].value.slice(6);
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