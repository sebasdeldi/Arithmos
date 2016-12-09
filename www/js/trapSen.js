var d = document;
var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");
var strFcn = d.getElementById("func").value;


btnCalc.onclick = function() {
    trapSen();
}

var trapSen = function() {
	var fun = math.eval(strFcn);
	var a = d.getElementById("a").value;
	var b = d.getElementById("b").value;

    var h = (b-a)/2;
    var eval = fun(a) + fun(b);
    var res = h*eval;


    $("#mensaje").html(res);
};