;(function (global) {

	var eliminacionGaussianaPivoteo = function () {

		//Este es el metodo principal para la eliminacion gaussiana por pivoteo total
		/*Los metodos utilizados para la eliminación gaussiana con pivoteo total son:
		-mayor();
		-cambioFilas();
		-cambioColumnas();
		-sacarMultiplicadores()
		-eliminación gausiana()
		-solución()
		*/

		for (var i = 0; i < this.A.length; i++) {
			this.answer.push(0);
		}

		console.log(this.answer);

		for (var k = 0; k < this.A.length-1; k++) {
			this.printEtapa(k+1);

			this.multiplicadores = [];

			this.mayor();
			this.cambioFilas(0);
			this.cambioColumnas();
			this.printAb();
			this.sacarMultiplicadores();
			this.eliminacionGaussiana();
			this.etapaAb += "'";
			if(k < this.A.length-2){
				this.printAb();
			}
			this.cont_i++;
			this.cont_j++;
		}


		this.print("La matriz resultante es:");
		this.printAb(true);

		this.sustitucionRegresiva("A");

	}

	global.prototype.eliminacionGaussianaPivoteo = eliminacionGaussianaPivoteo;
})(Sistema);