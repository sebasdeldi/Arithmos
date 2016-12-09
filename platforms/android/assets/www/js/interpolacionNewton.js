var d = document;
var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");

btnReset.onclick = function() {
	Location.reload();
}

btnCalc.onclick = function() {
    evaluar();
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function evaluar(){
	var vX = $("#x").val().split(",");
	var vY = $("#y").val().split(",");
	var n = vX.length;
	var mat = createArray(n, n);
	var prod = 1;
	var res = 0;
	var val = Number($("#punto").val());

	for (a in vX ) {
	    vX[a] = Number(vX[a]);
	}

	for (a in vY ) {
	    vY[a] = Number(vY[a]);
	}

	for (var i = 0; i < n; i++) {

	    mat[i][0] = vY[i];

	    for (var j = 1; j <= i; j++) {
	        mat[i][j] = (mat[i][j - 1] - mat[i - 1][j - 1]) / (vX[i] - vX[i - j]);
	    }
	    if (i > 0) {
	        prod *= val - vX[i - 1];
	    }
	    res += mat[i][i] * prod;
	}
	$("#mensaje").html(res);

}


