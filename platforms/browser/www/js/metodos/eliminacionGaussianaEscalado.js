;(function (global) {

	var eliminacionGaussianaEscalado = function(){

		//Este es el metodo principal para la eliminacion gaussiana por pivoteo escalado
		/*Los metodos utilizados para la eliminación gaussiana con pivoteo escalado son:
		-mayoresDeFilas();
		-resultados();
		-cambioFilas();
		-sacarMultiplicadores()
		-eliminación gausiana()
		-solución()
		*/

		for (var i = 0; i < this.A.length; i++) {
			this.answer.push(0);
		}


		this.mayoresDeFilas();
		for (var k = 0; k < this.A.length-1; k++) {
			this.printEtapa(k+1);
			this.multiplicadores = [];

			this.resultados(k);
			this.cambioFilas(1);
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

	global.prototype.eliminacionGaussianaEscalado = eliminacionGaussianaEscalado;
})(Sistema);