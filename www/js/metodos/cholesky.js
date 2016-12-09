;(function (global){

	var cholesky = function(){

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
			this.matrizL.push(aux);
		}

		for (var i = 0; i < this.A.length; i++) {
			aux = []
			for (var j = 0; j < this.A.length; j++) {
				aux.push(0);
			}
			this.matrizU.push(aux);
		}

		this.printALUCholesky();
		for (var i = 0; i < this.A.length; i++) {
			this.printEtapa(i+1);
			this.choleskyMatrizL();
			this.choleskyMatrizU();
			this.print("Como resultado de esta etapa tenemos:");
			this.printALUCholesky(i);
			this.cont_i++;
			this.cont_j++;
		}
		console.log(this.matrizL);
		console.log(this.matrizU);

		this.sustitucionProgresiva();//sustitución progreasiva
		this.sustitucionRegresiva("U");//sustitución regresiva en U
	}

	global.prototype.cholesky = cholesky;
})(Sistema);