;(function (global){

	var doolittle = function(){

		for (var i = 0; i < this.A.length; i++) {
			this.answer.push(0);
			this.numeroColumna.push(i+1);
		}

		var aux = [];
		for (var i = 0; i < this.A.length; i++) {
			aux = []
			for (var j = 0; j < this.A.length; j++) {
				aux.push(0);
			}
			this.matrizU.push(aux);
		}

		for (var i = 0; i < this.A.length; i++) {
			aux = []
			for (var j = 0; j < this.A.length; j++) {
				if (i == j) {
					aux.push(1);
				}else{
					aux.push(0);
				}
			}
			this.matrizL.push(aux);
		}

		//this.printAbEcuaciones();
		this.printALUDoolittle();
		for (var i = 0; i < this.A.length; i++) {
			this.printEtapa(i+1);
			this.doolittleMatrizU();
			this.doolittleMatrizL();
			this.print("Como resultado de esta etapa tenemos:");
			this.printALUDoolittle(i);
			this.cont_i++;
			this.cont_j++;
		}
		console.log("answers");
		console.log(this.matrizL);
		console.log(this.matrizU);

		this.sustitucionProgresiva();
		this.sustitucionRegresiva("U");

	}

	global.prototype.doolittle = doolittle;
})(Sistema);