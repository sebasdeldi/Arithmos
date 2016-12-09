;(function (global) {

	var funciones = {
		mayor: function (){

			//eliminacion gaussiana pivoteo total
			var temp = 0;
	    	for (i = this.cont_i; i < this.A.length; i++) {
	    		for (j = this.cont_j; j < this.A[i].length; j++) {
	    			if (Math.abs(this.A[i][j]) > temp) {
	    				temp = Math.abs(this.A[i][j]);
	    				this.filaTemp = i+1;
	    				this.columTemp = j+1;
	    			}
	    		}
	    	}



	    	//var text = "Se busca el elemento mayor, en valor absoluto, entre los $a_{i j}$ con $i = "+(this.cont_i+1)+", \\ldots, n$ y $j = "+(this.cont_j+1)+", \\ldots, n$. En este caso el mayor es $|a_{"+(this.filaTemp)+" "+(this.columTemp)+"}| = "+this.round(Math.abs(this.A[this.filaTemp-1][this.columTemp-1]), 1)+"$, entonces se intercambia la columna $"+(this.columTemp)+"$ con la $"+(this.cont_i+1)+"$ y la fila $"+(this.filaTemp)+"$ con la $"+(this.cont_i+1)+"$.";
	    	var text = "";
	    	this.print(text);

	    	return this;
		},

		mayorFila: function(){
			//eliminacion gaussiana pivoteo parcial

			var temp = 0;
			var fila = 0;
			for (var i = this.cont_i; i < this.A[this.cont_j].length; i++) {
				if (Math.abs(this.A[i][this.cont_j])>temp) {
					temp = Math.abs(this.A[i][this.cont_j]);
					fila = i+1;
					this.filaTemp = i+1;
				}
			}

			//var text = "Se busca el elemento mayor, en valor absoluto, entre los $a_{i "+(this.cont_i+1)+"}$ con $i = "+(this.cont_i+1)+", \\ldots, n$. En este caso el mayor es $|a_{"+fila+" "+(this.cont_i+1)+"}| = "+this.round(temp, 1)+"$, entonces se intercambia la fila $"+fila+"$ con la $"+(this.cont_i+1)+"$, obteniendo como resultado:";
	    	var text = "";
	    	this.print(text);

			return this;
		},

		mayoresDeFilas: function(){
			//eliminacion gaussiana pivoteo escalado


			var temp = 0;
			var aux = 0;
			for (var i = 0; i < this.A.length; i++) {
				for (var j = 0; j < this.A[i].length; j++) {
					if (Math.abs(this.A[i][j]) > temp) {
						temp = Math.abs(this.A[i][j]);
					}
				}
				this.mayoresFilas.push(temp);
				temp = 0;
			}

			var text = "Se define un vector, $mayoresFilas$ que almacena los elementos mayores de las filas en valor absoluto:<br>";
			text += "$$mayoresFilas = "+JSON.stringify(this.mayoresFilas)+"$$";
	    	this.print(text);
		},

		resultados: function(){
			//eliminacion gaussiana pivoteo escalado
			var resultados = [];
			var ai = [];
			var aux;

			for (var i = this.cont_i; i < this.A[this.cont_j].length; i++) {
				ai.push(this.round(Math.abs(this.A[i][this.cont_j]), 3));
				aux = Math.abs(this.A[i][this.cont_j])/this.notZero(this.mayoresFilas[i]);
				resultados.push(aux);
			}

			var temp = 0;
			for (var i = 0; i < resultados.length; i++) {
				if (resultados[i] > temp) {
					temp = resultados[i];
					this.filaTemp = this.cont_i+i+1;
				}
			}


			for (var j = 0; j < resultados.length; j++) {
				resultados[j] = this.round(resultados[j], 3);
			}
			var mayoresFilasPrint = [];
			for (var k = this.cont_i; k < this.mayoresFilas.length; k++) {
				mayoresFilasPrint.push(this.mayoresFilas[k]);
			}

			//var text = "Se busca el elemento mayor, en valor absoluto, relativo a sus filas entre los $a_{i "+(this.cont_i+1)+"}$ con $i = "+(this.cont_i+1)+", \\ldots, n$. Para ello, se dividen los elementos $a_{i "+(this.cont_i+1)+"}$ con los correspondientes elementos del vector $mayoresFilas$. Los resultados son: <br>";
			var text = "$$\\frac{|a_{i "+(this.cont_i+1)+"}|} {mayoresFilas} = \\frac{"+JSON.stringify(ai)+"} {"+JSON.stringify(mayoresFilasPrint)+"} = "+JSON.stringify(resultados)+"$$";
	    	this.print(text);

	    	return this;
		},

		cambioFilas: function(type){
			/*eliminacion gaussiana por pivoteo parcial
			eliminacion gaussiana por pivoteo escalado
			ekiminacion gaussiana por pivoteo total
			*/

			//Con type = 1 es para el método LU de eliminación gaussiana


			var aux;
			var auxTerm;

			auxTerm = this.b[this.cont_i];
			this.b[this.cont_i] = this.b[this.filaTemp-1];
			this.b[this.filaTemp-1] = auxTerm;


			for (var j = this.cont_j; j < this.A.length; j++) {
				aux = this.A[this.cont_i][j];
				for (var i = 0; i < this.A[j].length; i++) {
					this.A[this.cont_i][j] = this.A[this.filaTemp-1][j];
				}
				this.A[this.filaTemp-1][j] = aux;
			}


			if (type == 1) {
				//var text = "En este caso la posición $"+(this.filaTemp)+"$ del resultado tiene el número mayor. Entonces se intercambia la fila $"+(this.cont_i+1)+"$ con la $"+(this.filaTemp)+"$. Este cambio también afecta al vector $mayoresFilas$. Obtenemos entonces:<br>";
	    		var text = "";
	    		this.print(text);

				auxTerm = this.mayoresFilas[this.cont_i];
				this.mayoresFilas[this.cont_i] = this.mayoresFilas[this.filaTemp-1];
				this.mayoresFilas[this.filaTemp-1] = auxTerm;

				this.print("$$mayoresFilas = "+JSON.stringify(this.mayoresFilas)+"$$");
	    		this.printAb();
			}

	    	return this;
		},


		cambioColumnas: function(){
			//eliminacion gaussiana por pivoteo total



			var aux;
			var auxColumna;

			auxColumna = this.numeroColumna[this.cont_j];
			this.numeroColumna[this.cont_j] = this.numeroColumna[this.columTemp-1];
			this.numeroColumna[this.columTemp-1] = auxColumna;

			for (i=0; i < this.A.length; i++) {
	    		aux = this.A[i][this.cont_j];
	    		for (j = this.cont_j; j < this.A[i].length; j++) {
	    			this.A[i][this.cont_j] = this.A[i][this.columTemp-1];
	    		}
	    		this.A[i][this.columTemp-1] = aux;
	    	}


	    	//var colChange = "Al intercambiar las columnas las variables del sistema se reordenan del siguiente modo: $";
	    	var colChange = "";
	    	for (var j = 0; j < this.numeroColumna.length; j++) {
	    		colChange += "x_"+this.numeroColumna[j];
	    		if(j < this.numeroColumna.length-1){
	    			colChange += ", ";
	    		}

	    	}
	    	colChange += "$. La matriz resultante después de los intercambios es:";
	    	//this.print(colChange);

	    	return this;
		},

		sacarMultiplicadores: function(){
			/*eliminacion gaussiana simple
			eliminacion gaussiana por pivoteo parcial
			eliminacino gaussiana por pivoteo escalado
			eliminacion gaussiana por pivoteo total
			*/

			//var text = "Se calculan los multiplicadores $m_{i "+(this.cont_j+1)+"}$ con $i = "+(this.cont_i+1+1)+", \\ldots, n$:";
			var text = "";
			var aux;
			for (var i = this.cont_i+1; i < this.A.length; i++) {
				aux = this.A[i][this.cont_j]/this.notZero(this.A[this.cont_i][this.cont_j]);
				this.multiplicadores.push(aux);
				text += "\\begin{matrix}   m_{"+(i+1)+" "+(this.cont_j+1)+"} & = a_{"+(i+1)+" "+(this.cont_j+1)+"} / a_{"+(this.cont_i+1)+" "+(this.cont_j+1)+"} & = &\\frac{"+this.round(this.A[i][this.cont_j], 1)+"}{"+this.round(this.A[this.cont_i][this.cont_j], 1)+"} & = "+this.round(aux, 3)+" \\\\   \\end{matrix}";
			}

			this.print(text);
			return this;
		},

		sacarMatrizL: function(){
			//LU - eliminacion gaussiana simple
			//

			//var text = "Se calculan los multiplicadores $l_{i "+(this.cont_i+1)+"}$ con $i = "+(this.cont_i+2)+", \\ldots, n$:<br>";
			var text ="";
			var arrAux = [];
			var aux;
			for (var i = 0; i < this.A.length; i++) {
				if (i == this.cont_i) {
					arrAux.push(1);
				}
				else if (i >= this.cont_i+1) {
					aux = this.A[i][this.cont_j]/this.notZero(this.A[this.cont_i][this.cont_j]);
					arrAux.push(aux);
					this.multiplicadores.push(aux);

					text += "\\begin{matrix} l_{"+(i+1)+" "+(this.cont_j+1)+"} & = a_{"+(i+1)+" "+(this.cont_j+1)+"} / a_{"+(this.cont_i+1)+" "+(this.cont_j+1)+"} & = & \\frac{"+this.round(this.A[i][this.cont_j],1)+"}{"+this.round(this.A[this.cont_i][this.cont_j], 1)+"} & = "+this.round(aux, 3)+" \\\\ \\end{matrix}"
				}else{
					arrAux.push(0);
				}
			}
			this.print(text);

			for (var i = 0; i < arrAux.length; i++) {
				this.matrizL[i].push(arrAux[i]);
			}

			return this;
		},

		eliminacionGaussiana: function(isLu){
			/*eliminacion gaussiana simple
			eliminacion gaussiana por pivoteo parcial
			eliminacion gaussiana por pivoteo escalado
			eliminacion gaussiana por pivoteo total
			LU - eliminacion gaussiana simple
			*/

			if(isLu){
				//var text = "Se calculan las nuevas filas de la matriz $A$, $F_i = F_i - l_{i "+(this.cont_j+1)+"}F_"+(this.cont_j+1)+"$ con $i = "+(this.cont_i+1+1)+", \\ldots, n$, con las siguientes operaciones:";
				var text = "";
			}else{
				//var text = "Se calculan las nuevas filas de la matriz $Ab$, $F_i = F_i - m_{i "+(this.cont_j+1)+"}F_"+(this.cont_j+1)+"$ con $i = "+(this.cont_i+1+1)+", \\ldots, n$, con las siguientes operaciones:";
				var text = "";
			}

			var aux = 0;
			var auxTerm = 0;
			for (var j = this.cont_j; j < this.A.length; j++) {
				for (var i = this.cont_i+1; i < this.A.length; i++) {
					this.A[i][j] = this.A[i][j] - (this.multiplicadores[aux] * this.A[this.cont_i][j]);
					aux++;

					// Print
					if(j == this.cont_j){
						if(isLu){
							text += "\\begin{matrix}  F_"+(i+1)+" & = & F_"+(i+1)+" - l_{"+(i+1)+" "+(this.cont_j+1)+"}F_"+(this.cont_j+1)+" \\\\  \\end{matrix}";
						}else{
							text += "\\begin{matrix}  F_"+(i+1)+" & = & F_"+(i+1)+" - m_{"+(i+1)+" "+(this.cont_j+1)+"}F_"+(this.cont_j+1)+" \\\\  \\end{matrix}";
						}
					}
				}
				aux = 0;
			}

			if(!isLu){ // LU no modifica b
				for (var i = this.cont_i+1; i < this.b.length; i++) {
					this.b[i] = this.b[i] - (this.b[this.cont_i]*this.multiplicadores[auxTerm]);
					auxTerm++;
				}
			}


	    	this.print(text);
	    	return this;
		},


		sustitucionRegresiva: function(type){ //0
			var matriz;
			if(type == "A"){
				matriz = this.A;
			}else if(type == "U"){
				matriz = this.matrizU;
			}


			var aux = 0;
			var auxAnswer = 1;
			var auxTerm = 0;
			var respuesta;
			var div;

			this.print("<h3>Sustitución regresiva</h3>");
			var sign = "";
			var textAux = "";
			var text = "";


			if(type == "A"){
				this.print("El correspondiente sistema de ecuaciones de la matriz $Ab$ es decir $Ab"+this.etapaAb+"$ es:");
				//this.print("El correspondiente sistema de ecuaciones de la matriz es:");
				this.printAbEcuaciones();
			}else if(type == "U"){
				//this.print("El sistema $Ux=z$ coresponde al siguiente sistema de ecuaciones:");
				this.printUEcuaciones();
			}


			for (var i = matriz.length - 1; i >= 0; i--) {
				if(i == matriz.length - 1){
					//this.print("Para resolver el sistema, se comienza por hallar primero $x_"+this.numeroColumna[i]+"$:");
				}else{
					//this.print("Con el resultado de $x_"+this.numeroColumna[i+1]+"$ y la ecuación $"+(i+1)+"$ se calcula $x_"+this.numeroColumna[i]+"$:");
				}
				text = "<div>$$\\begin{eqnarray} ";
				if(type == "A"){
					text += this.printAbEcuaciones(i) + " \\\\";
				}else if(type == "U"){
					text += this.printUEcuaciones(i) + " \\\\";
				}


				textAux = ""+this.b[i]+"";
				for (var j = matriz[i].length - 1; j >= 0; j--) {

					if(i == j){
						div = matriz[i][j];
					}else{

						aux = aux + matriz[i][j]*this.answer[auxAnswer];

						if(this.answer[auxAnswer] > 0){

							if(matriz[i][j] > 0){
								sign = " - ";
							}else{
								sign = " + ";
							}

							if(matriz[i][j] !== 1){
								if(matriz[i][j] !== 0){
									textAux +=  " "+sign+" "+(Math.abs(matriz[i][j]))+ "("+this.answer[auxAnswer] + ") ";
								}
							}else{
								textAux +=  " "+sign+" ("+this.answer[auxAnswer] + ") ";
							}


						}


						auxAnswer++;

					}
				}
				auxAnswer = 0;
				respuesta = (this.b[i]-aux)/this.notZero(div);
				this.answer[auxTerm] = respuesta;

				if(div != 1){
					text += " x_"+this.numeroColumna[i]+" & = & \\frac{"+textAux+"}{"+div+"}  \\nonumber \\\\ ";
				}else{
					text += " x_"+this.numeroColumna[i]+" & = & "+textAux+"  \\nonumber \\\\ ";
				}
				text += " x_"+this.numeroColumna[i]+" & = & "+respuesta+"  \\nonumber \\\\ ";

				//text += " x_"+(i+1)+" = "+this.b[i]+" - "+ aux + "("+this.answer[auxAnswer-1]+") / "+div+" = "+respuesta+" \\nonumber \\\\ ";
				textAux = "";

				auxTerm++;
				aux = 0;
				text += "\\end{eqnarray}$$</div>";
				this.print(text);


			}
			this.printSolucion(1);
			this.printSolucion(0);

			return this;
		},

		sustitucionProgresiva: function(){ //1
			var aux = 0;
			var auxAnswer = 1;
			var auxTerm = 0;
			var respuesta;
			var div;

			//this.print("<h3>Sustitución regresiva</h3>");
			var sign = "";
			var textAux = "";


			this.print("<h3>Sustitución progresiva</h3>");
			//var text = "El sistema $Lz=B$ es el siguiente sistema de ecuaciones:";
			//this.print(text);
			this.printLEcuaciones();
			var acumExcu = "";
			for (var i = 0; i < this.matrizL.length; i++) {

				if(i == 0){
					//this.print("Para resolver el sistema, se comienza por hallar primero $z_"+(this.numeroColumna[i])+"$:");
				}else{
					//this.print("Con el resultados de "+acumExcu+" y la ecuación $"+(this.numeroColumna[i])+"$ se calcula $z_"+this.numeroColumna[i]+"$:");
				}
				acumExcu += "$z_"+this.numeroColumna[i]+"$, "


				text = "<div>$$\\begin{eqnarray} ";
				text += this.printLEcuaciones(i) + " ";

				textAux = ""+this.b[i]+"";
				for (var j = 0; j < this.matrizL[i].length; j++) {
					if(i == j){
						div = this.matrizL[i][j];
					}else{

						aux = aux + this.matrizL[i][j]*this.b[auxAnswer];

						if(this.b[auxAnswer] !== 0){

							if(this.matrizL[i][j] > 0){
								sign = " - ";
							}else{
								sign = " + ";
							}

							if(this.matrizL[i][j] !== 1){
								if(this.matrizL[i][j] !== 0){
									textAux +=  " "+sign+" "+(Math.abs(this.matrizL[i][j]))+ "("+this.b[auxAnswer] + ") ";
								}
							}else{
								textAux +=  " "+sign+" ("+this.b[auxAnswer] + ") ";
							}


						}


						auxAnswer++;

					}
				}
				auxAnswer = 0;
				respuesta = (this.b[i]-aux)/this.notZero(div);
				this.b[auxTerm] = respuesta;

				if(div != 1){
					text += " z_"+this.numeroColumna[i]+" & = & \\frac{"+textAux+"}{"+div+"}  \\nonumber \\\\ ";
				}else{
					text += " z_"+this.numeroColumna[i]+" & = & "+textAux+"  \\nonumber \\\\ ";
				}
				text += " z_"+this.numeroColumna[i]+" & = & "+respuesta+"  \\nonumber \\\\ ";
				textAux = "";

				auxTerm++;
				aux = 0;

				text += "\\end{eqnarray}$$</div>";
				this.print(text);
			}

			return this;

		},

		croutMatrizL: function(columna){

			var aux = this.cont_j;
			var acum;

			for (var i = columna; i < this.A.length; i++) {
				/*PRINT*/
				//this.print((i-columna+1)+". Para hallar $l_{"+(i+1)+" "+(aux+1)+"}$ se multiplica la fila "+(i+1)+" de $L$ por la columna "+(aux+1)+" de $U$ y se iguala al elemnto $a_{"+(i+1)+" "+(aux+1)+"}$. Entonces,");
				var text = "<div>$$\\begin{eqnarray} ";
				var textAux = "";
				var textAuxNeg = "";
				/*PRINT*/;

				acum = 0;
				for (var j = 0; j < aux; j++) {
					acum = acum + (this.matrizL[i][j]*this.matrizU[j][this.cont_i])

					/*PRINT*/;
					textAux += "("+this.matrizL[i][j]+") * ("+this.matrizU[j][this.cont_i]+")";
					textAuxNeg += "("+this.matrizL[i][j]*-1+") * ("+this.matrizU[j][this.cont_i]*-1+")";
					if(j < aux-1){
						textAux += " + ";
						textAuxNeg += " - ";
					}
					/*PRINT*/
				}
				this.matrizL[i][aux] = this.A[i][aux]-acum;

				/*PRINT*/
				if(textAux != ""){
					text += textAux+"+ l_{"+(i+1)+" "+(aux+1)+"} * 1 & = & "+this.A[i][aux]+"\\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(aux+1)+"} & = & "+this.A[i][aux]+" - "+textAuxNeg+"\\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(aux+1)+"} & = & "+this.matrizL[i][aux]+"\\ " + " \\\\";
				}else{
					text += " l_{"+(i+1)+" "+(aux+1)+"} & = & "+this.A[i][aux]+"\\ " + " \\\\";
				}
				text += "\\end{eqnarray}$$</div>";
				this.print(text);
				/*PRINT*/
			}
			return this;
		},

		croutMatrizU: function(fila){
			var acum;


			for (var i = fila+1; i < this.A.length; i++) {
				if(fila < this.A.length-1){
					//this.print("Dado que la fila "+(i)+" de L ya se conoce completamente, entonces se multiplica la fila "+(i)+" de L con todas las columnas de U.");
				}

				/*PRINT*/
				//this.print((i-fila)+". Para hallar $u_{"+(fila+1)+" "+(i+1)+"}$ se multiplica la fila "+(fila+1)+" de $L$ por la columna "+(i+1)+" de $U$ y se iguala al elemnto $a_{"+(fila+1)+" "+(i+1)+"}$. Entonces,");
				var text = "<div>$$\\begin{eqnarray} ";
				var textAux = "";
				var textAuxNeg = "";
				var textDiv = "";
				/*PRINT*/

				acum = 0;
				for (var j = 0; j < this.cont_i+1; j++) {
					acum = acum + (this.matrizL[this.cont_i][j]*this.matrizU[j][i]);

					/*PRINT*/;
					textAux += "("+this.matrizL[this.cont_i][j]+")";
					if(j < this.cont_i) textAuxNeg += "("+this.matrizL[this.cont_i][j]*-1+")";

					var textMultiplier = this.matrizU[j][i];
					if(textMultiplier != 0){
						textAux += " * ("+textMultiplier+")";
						if(j < this.cont_i) textAuxNeg += " * ("+textMultiplier*-1+")";
					}else{
						textDiv = this.matrizL[this.cont_i][j];
					}

					if(j < this.cont_i){
						textAux += " + ";
						if(j < this.cont_i-1) textAuxNeg += " - ";
					}
					/*PRINT*/

				}
				if (i != this.cont_i) {
					this.matrizU[this.cont_i][i] = (this.A[this.cont_i][i]-acum) / this.notZero(this.matrizL[this.cont_i][this.cont_j]);
			 	}


			 	/*PRINT*/
				text += textAux+" * u_{"+(fila+1)+" "+(i+1)+"} & = & "+this.A[fila][i]+"\\ " + " \\\\";
				text += "u_{"+(fila+1)+" "+(i+1)+"} & = & \\frac{"+this.A[fila][i];
				if(textAuxNeg != ""){
					text += " - "+textAuxNeg;
				}
				text += "}{"+textDiv+"}\\ " + " \\\\";
				text += "u_{"+(fila+1)+" "+(i+1)+"} & = & "+this.matrizU[this.cont_i][i]+"\\ " + " \\\\";
				text += "\\end{eqnarray}$$</div>";
				this.print(text);
				/*PRINT*/
			}
			return this;
		},

		choleskyMatrizL: function(){
			var acum;
			var temp;
			for (var i = this.cont_i; i < this.A.length; i++) {
				/*PRINT*/
				//this.print((i-this.cont_i+1)+". Para hallar $l_{"+(i+1)+" "+(this.cont_i+1)+"}$ se multiplica la fila "+(i+1)+" de $L$ por la columna "+(this.cont_i+1)+" de $U$ y se iguala al elemnto $a_{"+(i+1)+" "+(this.cont_i+1)+"}$. Entonces,");
				var text = "<div>$$\\begin{eqnarray} ";
				var textAux = "";
				var textAuxNeg = "";
				/*PRINT*/

				acum=0;
				for (var j = 0; j < this.A[i].length; j++) {

					/*PRINT*/
					if(this.matrizL[i][j] != 0 && this.matrizU[j][this.cont_i] != 0){
						textAux += "("+this.round(this.matrizL[i][j],4)+") * ("+this.round(this.matrizU[j][this.cont_i], 4)+")";
						textAuxNeg += "("+this.round(this.matrizL[i][j]*-1, 4)+") * ("+this.round(this.matrizU[j][this.cont_i]*-1, 4)+")";
						if(j < this.cont_i-1){
							textAuxNeg += " - ";
							textAux += " + ";
						}

					}
					/*PRINT*/

					acum = acum + (this.matrizL[i][j]*this.matrizU[j][this.cont_i]);
				}

				if (i != this.cont_i) {
					this.matrizL[i][this.cont_j] = (this.A[i][this.cont_j]-acum)/this.notZero(temp);

					/*PRINT*/
					textAuxNeg = (textAuxNeg != "") ? " - "+textAuxNeg : "";
					if(textAux != ""){
						text += textAux+" + l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+"\\ " + " \\\\";
					}
					text += "l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+textAuxNeg+"\ " + " \\\\";
					text += this.matrizL[this.cont_i][this.cont_i]+" * l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+textAuxNeg+"\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & \\frac{"+(this.A[this.cont_i][this.cont_j] - acum)+"}{"+this.matrizL[this.cont_i][this.cont_i]+"} \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.matrizL[i][this.cont_i]+"\\ " + " \\\\";
					/*PRINT*/

				}else{
					temp = Math.pow((this.A[this.cont_i][this.cont_j] - acum),0.5);
					this.matrizL[this.cont_i][this.cont_j] = temp;
					this.matrizU[this.cont_i][this.cont_j] = temp;

					/*PRINT*/
					textAuxNeg = (textAuxNeg != "") ? " - "+textAuxNeg : "";
					if(textAux != ""){
						text += textAux+" + l_{"+(i+1)+" "+(this.cont_i+1)+"} * l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+"\\ " + " \\\\";
					}
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} * l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+textAuxNeg+"\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"}^2 & = & "+this.A[i][this.cont_i]+textAuxNeg+" \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & \\sqrt[2]{"+this.A[i][this.cont_i]+textAuxNeg+"} \\\\";
					if(textAuxNeg != ""){
						text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & \\sqrt[2]{"+(this.A[this.cont_i][this.cont_j] - acum)+"} \\\\";
					}
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.matrizL[i][this.cont_i]+"\\ " + " \\\\";
					/*PRINT*/
				}

				/*PRINT*/
				text += "\\end{eqnarray}$$</div>";
				this.print(text);
				/*PRINT*/


				temp = this.matrizL[this.cont_i][this.cont_j];
			}
			return this;
		},

		choleskyMatrizU: function(){

			var acum;
			var temp = this.matrizU[this.cont_i][this.cont_j];

			for (var i = this.cont_i+1; i < this.A.length; i++) {
				/*PRINT*/
				if(this.cont_i < this.A.length-1){
					//this.print("Dado que la fila "+(i)+" de L ya se conoce completamente, entonces se multiplica la fila "+(i)+" de L con todas las columnas de U.");
				}
				//this.print((i-this.cont_i)+". Para hallar $u_{"+(this.cont_i+1)+" "+(i+1)+"}$ se multiplica la fila "+(this.cont_i+1)+" de $L$ por la columna "+(i+1)+" de $U$ y se iguala al elemnto $a_{"+(this.cont_i+1)+" "+(i+1)+"}$. Entonces,");
				var text = "<div>$$\\begin{eqnarray} ";
				var textAux = "";
				var textAuxNeg = "";
				var textDiv = "";
				/*PRINT*/


				acum = 0;
				for (var j = 0; j < this.cont_i+1; j++) {

					/*PRINT*/;
					if(this.matrizL[this.cont_i][j] != 0 && this.matrizU[j][i] != 0){
						textAux += "("+this.round(this.matrizL[this.cont_i][j],4)+") * ("+this.round(this.matrizU[j][i], 4)+")";
						textAuxNeg += "("+this.round(this.matrizL[this.cont_i][j]*-1, 4)+") * ("+this.round(this.matrizU[j][i]*-1, 4)+")";
						if(j < this.cont_i-1){
							textAuxNeg += " - ";
							textAux += " + ";
						}

					}

					textDiv = this.matrizL[this.cont_i][j];


					/*PRINT*/
					acum = acum + (this.matrizL[this.cont_i][j]*this.matrizU[j][i]);
				}

				if (i != this.cont_i) {
					this.matrizU[this.cont_i][i] = (this.A[this.cont_i][i]-acum)/this.notZero(temp);
			 	}


			 	/*PRINT*/
			 	textAux = (textAux == "") ? "" : textAux+" + ";
			 	textAuxNeg = (textAuxNeg == "") ? "" : " - "+textAuxNeg;
				text += textAux+" l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.A[this.cont_i][i]+"\\ " + " \\\\";
				text += "l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.A[this.cont_i][i]+textAuxNeg+"\\ " + " \\\\";
				text += this.matrizL[this.cont_i][this.cont_i]+" * u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.A[this.cont_i][i]+textAuxNeg+"\\ " + " \\\\";

				text += "u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & \\frac{"+(this.A[this.cont_i][i]-acum)+"}{"+textDiv+"}\\ " + " \\\\";
				text += "u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.matrizU[this.cont_i][i]+"\\ " + " \\\\";
				text += "\\end{eqnarray}$$</div>";
				this.print(text);
				/*PRINT*/

			}
			return this;

		},

		doolittleMatrizL: function(){
			var acum;

			for (var i = this.cont_i+1; i < this.A.length; i++) {
				/*PRINT*/
				//this.print((i-this.cont_i+1)+". Para hallar $l_{"+(i+1)+" "+(this.cont_i+1)+"}$ se multiplica la fila "+(i+1)+" de $L$ por la columna "+(this.cont_i+1)+" de $U$ y se iguala al elemnto $a_{"+(i+1)+" "+(this.cont_i+1)+"}$. Entonces,");
				var text = "<div>$$\\begin{eqnarray} ";
				var textAux = "";
				var textAuxNeg = "";
				/*PRINT*/
				acum = 0;
				for (var j = 0; j < this.cont_i; j++) {
					/*PRINT*/
					textAux += "("+this.matrizL[i][j]+") * ("+this.matrizU[j][this.cont_i]+")";
					textAuxNeg += "("+this.matrizL[i][j]*-1+") * ("+this.matrizU[j][this.cont_i]*-1+")";
					if(j < this.cont_i-1){
						textAux += " + ";
						textAuxNeg += " - ";
					}
					/*PRINT*/

					acum = acum + (this.matrizL[i][j]*this.matrizU[j][this.cont_j]);
				}
				if (i != this.cont_i) {
					this.matrizL[i][this.cont_j] = (this.A[i][this.cont_j]-acum)/this.notZero(this.matrizU[this.cont_i][this.cont_j]);
			 	}

				/*PRINT*/
				if(textAux != ""){
					text += textAux+"+ u_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+"\\ " + " \\\\";
					text += "u_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+" - "+textAuxNeg+"\\ " + " \\\\";
					text += this.matrizU[this.cont_i][this.cont_j]+" * l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+" - "+textAuxNeg+"\\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & \\frac{"+(this.A[i][this.cont_j]-acum)+"}{"+this.matrizU[j][this.cont_j]+"}\\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.matrizL[i][this.cont_i]+"\\ " + " \\\\";
				}else{
					text += "u_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.A[i][this.cont_i]+"\\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & \\frac{"+(this.A[i][this.cont_j]-acum)+"}{"+this.matrizU[j][this.cont_j]+"}\\ " + " \\\\";
					text += "l_{"+(i+1)+" "+(this.cont_i+1)+"} & = & "+this.matrizL[i][this.cont_i]+"\\ " + " \\\\";
				}
				text += "\\end{eqnarray}$$</div>";
				this.print(text);
				/*PRINT*/

			}
			return this;
		},

		doolittleMatrizU: function(){
			var aux = this.cont_j;
			var acum;



			for (var i = this.cont_i; i < this.A.length; i++) {
				acum = 0;

				/*PRINT*/
				//this.print((i-this.cont_i+1)+". Para hallar $u_{"+(this.cont_i+1)+" "+(i+1)+"}$ se multiplica la fila "+(this.cont_i+1)+" de $L$ por la columna "+(i+1)+" de $U$ y se iguala al elemnto $a_{"+(this.cont_i+1)+" "+(i+1)+"}$. Entonces,");
				var text = "<div>$$\\begin{eqnarray} ";
				var textAux = "";
				var textAuxNeg = ""
				var textDiv = "";
				/*PRINT*/

				for (var j = 0; j < this.A[i].length; j++) {
					/*PRINT*/
					if(this.matrizL[this.cont_i][j] != 0 && this.matrizU[j][i] != 0){
						textAux += "("+this.round(this.matrizL[this.cont_i][j],4)+") * ("+this.round(this.matrizU[j][i], 4)+")";
						textAuxNeg += "("+this.round(this.matrizL[this.cont_i][j]*-1, 4)+") * ("+this.round(this.matrizU[j][i]*-1, 4)+")";
						if(j < this.cont_i-1){
							textAuxNeg += " - ";
							textAux += " + ";
						}

					}
					/*PRINT*/

					acum = acum + (this.matrizL[this.cont_i][j]*this.matrizU[j][i]);
				}
				this.matrizU[aux][i] = this.A[aux][i]-acum;

			 	/*PRINT*/
			 	textAux = (textAux == "") ? "" : textAux+" + ";
			 	textAuxNeg = (textAuxNeg == "") ? "" : " - "+textAuxNeg;
				if(textAux != ""){
					text += textAux+" l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.A[this.cont_i][i]+"\\ " + " \\\\";
				}
				text += "l_{"+(this.cont_i+1)+" "+(this.cont_i+1)+"} * u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.A[this.cont_i][i]+textAuxNeg+"\\ " + " \\\\";
				text += this.matrizL[this.cont_i][this.cont_i]+" * u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.A[this.cont_i][i]+textAuxNeg+"\\ " + " \\\\";
				text += "u_{"+(this.cont_i+1)+" "+(i+1)+"} & = & "+this.matrizU[this.cont_i][i]+"\\ " + " \\\\";
				text += "\\end{eqnarray}$$</div>";
				this.print(text);
				/*PRINT*/


			}

			return this;
		},

		round: function (value, precision) {
		    var multiplier = Math.pow(10, precision || 0);
		    return Math.round(value * multiplier) / this.notZero(multiplier);
		},

		notZero: function(n) {
		  n = +n;  // Coerce to number.
		  if (!n) {  // Matches +0, -0, NaN
		    throw new Error('División por cero');
		  }
		  return n;
		}
	}


	global.prototype.mayor = funciones.mayor;
	global.prototype.mayorFila = funciones.mayorFila;
	global.prototype.mayoresDeFilas = funciones.mayoresDeFilas;
	global.prototype.resultados = funciones.resultados;
	global.prototype.cambioFilas = funciones.cambioFilas;
	global.prototype.cambioColumnas = funciones.cambioColumnas;
	global.prototype.sacarMultiplicadores = funciones.sacarMultiplicadores;
	global.prototype.sacarMatrizL = funciones.sacarMatrizL;
	global.prototype.croutMatrizL = funciones.croutMatrizL;
	global.prototype.croutMatrizU = funciones.croutMatrizU;
	global.prototype.eliminacionGaussiana = funciones.eliminacionGaussiana;
	global.prototype.sustitucionProgresiva = funciones.sustitucionProgresiva;
	global.prototype.sustitucionRegresiva = funciones.sustitucionRegresiva;
	global.prototype.createTable = funciones.createTable;
	global.prototype.choleskyMatrizL = funciones.choleskyMatrizL;
	global.prototype.choleskyMatrizU = funciones.choleskyMatrizU;
	global.prototype.doolittleMatrizL = funciones.doolittleMatrizL;
	global.prototype.doolittleMatrizU = funciones.doolittleMatrizU;
	global.prototype.round = funciones.round;
	global.prototype.notZero = funciones.notZero;


})(Sistema)