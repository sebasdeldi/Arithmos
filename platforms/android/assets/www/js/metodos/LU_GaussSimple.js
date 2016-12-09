;(function (global) {

	var LU_GaussSimple = function(){

		//Este es el metodo principal para la eliminacion gaussiana simple por LU
		/*Los metodos utilizados para el método LU de eliminación gaussiana simple son:
		-sacarMatrizL()
		-eliminacionGaussiana()
		-solucion(); pasandole como parametro 1
		-solucion(); pasandole como parametro 0
		*/
		for (var i = 1; i <= this.A.length; i++) {
			this.numeroColumna.push(i);
		}

		var lastMatrizL = [];
		for (var i = 0; i < this.A.length; i++) {
			this.matrizL.push([]);
			lastMatrizL.push(0);
			this.answer.push(0);
		}
		lastMatrizL[this.A.length-1] = 1;

		for (var k = 0; k < this.A.length-1; k++) {
			this.printEtapa(k+1);

			this.multiplicadores = [];
			this.sacarMatrizL();
			this.eliminacionGaussiana(true);

			this.etapaAb += "'";
			if(k < this.A.length-2){
				this.printAb(false, true);
			}

			this.cont_i++;
			this.cont_j++;
		}


		this.print("La matriz resultante es:");
		this.printAb(true, true);

		for (var i = 0; i < this.matrizL.length; i++) {
			this.matrizL[i].push(lastMatrizL[i]);
		}

		this.print("En conclusión, la matriz $U$ es la matriz $A"+this.etapaAb+"$ resultante de la fase de eliminación. La matriz $L$ se completa con $1$ en la diagonal y los multiplicadores:");
		this.printL();

		this.print("<h3>Solución para $Lz=B$</h3>");
		this.sustitucionProgresiva();

		this.print("<h3>Solución para $Ux=z$</h3>");
		this.sustitucionRegresiva("A");
	}

	global.prototype.LU_GaussSimple = LU_GaussSimple;
})(Sistema);