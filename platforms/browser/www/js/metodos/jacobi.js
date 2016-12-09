;(function (global){

    var jacobi = function(matrizA, vectorB, x0, relajacion, lambda, ite, tol){

        var result = [];
        var message = "";

        var errNumerador =0;
        var errDenominador = 0;

        var x = [];
        for(var i = 0; i < matrizA.length; i++){
            x.push(0);
        }

        var n = matrizA.length;

        var contador = 1;
        var error = tol + 1;
        var acumNumerador = 0;

        while((contador <= ite) && (error > tol)){
            error = 0;
            errDenominador = 0;
            acumNumerador = 0;
            for (var i = 0; i < n; i++){
                var suma = 0;

                for(var p = 0; p < n; p++){
                    if(i!=p){
                        suma -= (matrizA[i][p]*x0[p]);
                    }
                }

                x[i] = (suma+vectorB[i])/notZero(matrizA[i][i]);
                if(relajacion){
                    x[i] = lambda*x[i] + (1-lambda)*x[i];
                }

                errNumerador = x[i] - x0[i];
                acumNumerador = acumNumerador+ Math.pow(errNumerador,2);

                errDenominador = errDenominador + Math.pow(x[i],2);
            }

            error = Math.pow(acumNumerador,0.5)/notZero(Math.pow(errDenominador,0.5));
            result.push([x.slice(), error]);
            contador++;

            for(var i = 0; i < n; i++){
                x0[i] = x[i];
            }

        }

        if(error <= tol){
            var text = "$Solución:$\\begin{eqnarray}";
            for (var i = 0; i < x.length; i++) {
                text += "x_"+(i+1)+" & = & "+x[i]+"\\\\"
                x[i]
            }
            text += "\\end{eqnarray}"
            message = text;
        }else{
            message = "<p style='color:red'><b>Fallo en "+ite+" iteraciones con un error de: "+error+"</b></p>";
        }

        return {data: result, message: message};

    };

    var notZero = function(n) {
      n = +n;  // Coerce to number.
      if (!n) {  // Matches +0, -0, NaN
        throw new Error('División por cero');
      }
      return n;
    }

    global.jacobi = jacobi;
})(window);