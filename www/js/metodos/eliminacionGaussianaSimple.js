;(function (global) {

	var eliminacionGaussianaSimple = function() {

		//Este es el método principal para la eliminacion gaussiana simple
		/*Los metodos utilizados para la eliminación gaussiana simple son:
		-sacarMultiplicadores()
		-eliminación gausiana()
		-solución()
		*/

		for (var i = 0; i < this.A.length; i++) {
			this.answer.push(0);
		}

		for (var i = 0; i < this.A.length-1; i++) {
			this.printEtapa(i+1);

			this.multiplicadores = [];

			this.sacarMultiplicadores().eliminacionGaussiana();
			this.etapaAb += "'";
			if(i < this.A.length-2){
				this.printAb();
			}

			this.cont_i++;
			this.cont_j++;

			// Mxi+1
		}

		this.print("La matriz resultante es:");
		this.printAb(true);


		this.sustitucionRegresiva("A");

	}

	global.prototype.eliminacionGaussianaSimple = eliminacionGaussianaSimple;
})(Sistema);