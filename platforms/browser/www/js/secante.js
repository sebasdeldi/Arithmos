var d = document;
var form = d.forms[0];

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
    var strF = form.elements[0].value;
    var x0 = Number(form.elements[1].value);
    var x1 = Number(form.elements[2].value);
    var niter = Number(form.elements[3].value);
    var tol = Number(form.elements[4].value);
    // Convierto la funcion para que se pueda evaluar
    var f = math.eval(strF);

    secante(f, x0, x1, niter, tol);
    // Obligo a MathJax a renderizar de nuevo
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function secante(f, x0, x1, ni, tol) {
    var fx0 = f(x0);

    if (fx0 == 0) {
        strMsg.innerHTML = "x0 = " + x0 + " es una raíz";
    } else {
        var fx1 = f(x1);
        var iter = 0;
        var error = tol + 1;
        var den = fx1 - fx0;
        var x2;

        insertarFila(iter, x1, fx1, error);

        while (error > tol && fx1 != 0 && den != 0 && iter < ni) {
            x2 = x1 - fx1 * (x1 - x0) / den;
            error = math.abs(x2 - x1);
            x0 = x1;
            fx0 = fx1;
            x1 = x2;
            fx1 = f(x1);
            den = fx1 - fx0;
            iter = iter + 1;

            insertarFila(iter, x1, fx1, error);
        }

        if (fx1 == 0) {
            strMsg.innerHTML = "x1 = " + x1 + " es una raíz";
        } else if (error < tol) {
            strMsg.innerHTML = "x1 = " + x1 + " es aproximación a una raíz";
        } else {
            strMsg.innerHTML = "Fracaso en " + ni + " iteraciones";
        }
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
