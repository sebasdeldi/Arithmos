;(function (global) {

	var eliminacionGaussianaParcial = function(){

		//Este es el metodo principal para la eliminacion gaussiana por pivoteo parcial
		/*Los metodos utilizados para la eliminación gaussiana con pivoteo parcial son:
		-mayorFila()
		-cambioFilas();
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

			this.mayorFila();
			this.cambioFilas(0);
			this.printAb();

			this.sacarMultiplicadores();
			this.eliminacionGaussiana();
			this.etapaAb += "'";
			if(i < this.A.length-2){
				this.printAb();
			}
			this.cont_i++;
			this.cont_j++;
		}

		this.print("La matriz resultante es:");
		this.printAb(true);

		this.sustitucionRegresiva("A");

	}

	global.prototype.eliminacionGaussianaParcial = eliminacionGaussianaParcial;
})(Sistema);