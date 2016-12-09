

var d = document;
var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");

btnReset.onclick = function() {
	Location.reload();
}

btnCalc.onclick = function() {
    evaluar();
}

function evaluar(){
	var prod;
	var X = $("#x").val().split(",");
	var n = X.length;
	var Y = $("#y").val().split(",");
	var L = [];
	var punto = Number($("#punto").val());
	var resultado = 0;

	for (a in X ) {
	    X[a] = Number(X[a]);
	}

	for (a in Y ) {
	    Y[a] = Number(Y[a]);
	}

	for (var i = 0; i < n; i++) {
	    prod = 1;
	    for (var j = 0; j < n; j++) {
	        if (j != i) {
	            prod = prod * ((punto - X[j]) / (X[i] - X[j]));
	        }
	    }
	    L[i] = prod;
	    resultado = resultado + (L[i] * Y[i]);
	}

	$("#mensaje").html(resultado);
}


