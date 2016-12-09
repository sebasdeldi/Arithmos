var d = document;
var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");
var strFcn = d.getElementById("func").value;


btnCalc.onclick = function() {
    simpUnTercioGen();
}

var simpUnTercioGen = function() {
    var fun = math.eval(strFcn);
    var a = d.getElementById("a").value;
    var b = d.getElementById("b").value;
    var n = d.getElementById("n").value;

    if(n>0){
        var h = (b-a)/n;
        var cont = fun(a) + fun(b);

        for(i=1; i< n; i = i+2){
            cont += 4*fun(a+(i*h))
        }

        for(i=2; i<n; i = i+2){
            cont += 2*fun(a+(i*h))
        }

        var res = (h/3)*cont;

        $("#mensaje").html(res);
    }else{
        $("#mensaje").html("Iteraciones menores o iguales a 0");
        throw "Iteraciones menores o iguales a 0";
    }

};