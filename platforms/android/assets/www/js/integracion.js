var d = document;
var btnTrapSen = d.getElementById("trapSen");
var btnTrapComp = d.getElementById("trapComp");
var btnSimpUnTercio = d.getElementById("simpUnTercio");
var btnSimpUnTercioGen = d.getElementById("simpUnTercioGen");
var btnSimpTresOctavos = d.getElementById("simpTresOctavos");
var btnSimpTresOctavosGen = d.getElementById("simpTresOctavosGen");

var btnReset = d.getElementById("reset");
var strFcn = d.getElementById("func").value;
var fun = math.eval(strFcn);
var a = d.getElementById("a").value;
var b = d.getElementById("b").value;
var n = d.getElementById("n").value;


btnReset.onclick = function() {
    Location.reload();
}

btnTrapComp.onclick = function() {
    trapComp();
}

// btnSimpUnTercio.onclick = function() {
//     simpUnTercio();
// }

// btnTrapSen.onclick = function() {
//     trapSen();
// }

// btnSimpUnTercioGen.onclick = function() {
//     simpUnTercioGen();
// }

// btnSimpTresOctavos.onclick = function() {
//     simpTresOctavos();
// }

// btnSimpTresOctavosGen.onclick = function() {
//     simpTresOctavosGen();
// }


var trapSen = function() {
    var h = (b-a)/2;
    var eval = fun(a) + fun(b);
    var res = h*eval;

    $("#mensaje").html(res);
};

var trapComp = function() {

    if(n>0){
        var h = (b-a)/n;
        var cont = fun(a) + fun(b);

        for(i=0; i<n-1; i++){
            cont += 2*fun(a+(i*h))
        }

        var res = (h/2)*cont;

        $("#mensaje").html(res);
    }else{
        $("#mensaje").html("Iteraciones menores o iguales a 0");
        throw "Iteraciones menores o iguales a 0";
    }

};

var simpUnTercio = function() {

    var h = (b-a)/3;
    var aMed = (a+b)/2;
    var eval = fun(a) + fun(b) + 4*fun(aMed);
    var res = (h/2)*eval;

    return res;
};

var simpUnTercioGen = function() {

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

        return res;
    }else{
        throw "Iteraciones menores o iguales a 0";
    }

};

var simpTresOctavos = function() {

    var h = (b-a)/3;
    var a1 = a+h;
    var a2 = a+2*h;
    var eval = fun(a) + fun(b) + 3*fun(a1) + 3*fun(a2);
    var res = ((3*h)/8)*eval;

    return res;
};

var simpTresOctavosGen = function() {

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

        return res;
    }else{
        throw "Iteraciones menores o iguales a 0";
    }

};
