var d = document;
var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");
var strFcn = d.getElementById("func").value;


btnCalc.onclick = function() {
    simpTresOctavos();
}


var simpTresOctavos = function() {
    var fun = math.eval(strFcn);
    var a = d.getElementById("a").value;
    var b = d.getElementById("b").value;

    var h = (b-a)/3;
    var a1 = a+h;
    var a2 = a+2*h;
    var eval = fun(a) + fun(b) + 3*fun(a1) + 3*fun(a2);
    var res = ((3*h)/8)*eval;
    $("#mensaje").html(res);
};