var d = document;
var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");
var strFcn = d.getElementById("func").value;


btnCalc.onclick = function() {
    simpUnTercio();
}

var simpUnTercio = function() {
	var fun = math.eval(strFcn);
	var a = d.getElementById("a").value;
	var b = d.getElementById("b").value;

    var h = (b-a)/3;
    var aMed = (a+b)/2;
    var eval = fun(a) + fun(b) + 4*fun(aMed);
    var res = (h/2)*eval;

    if (res == NaN) {
    	$("#mensaje").html("Infinito");
    }

    $("#mensaje").html(res);
};