var d = document;
var btnCalc = d.getElementById("calc");
var btnReset = d.getElementById("reset");
var strFcn = d.getElementById("func").value;


btnCalc.onclick = function() {
    simpTresOctavosGen();
}

var simpTresOctavosGen = function() {
    var fun = math.eval(strFcn);
    var a = d.getElementById("a").value;
    var b = d.getElementById("b").value;
    var n = d.getElementById("n").value;

    if(n>0){
        var h = (b-a)/n;
        var cont = fun(a) + fun(b);

        for(i=1; i< n; i++){

            if(i%3 == 0){
                cont += 2*fun(a+(i*h));
            }else{
                cont += 3*fun(a+(i*h));
            }
        }

        var res = ((3*h)/8)*cont;

        $("#mensaje").html(res);

    }else{
        $("#mensaje").html("Iteraciones menores o iguales a 0");
        throw "Iteraciones menores o iguales a 0";
    }
};