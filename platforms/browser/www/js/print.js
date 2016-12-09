;(function (global) {


	var print = function(text) {

		var div = document.createElement('div');
		div.innerHTML = text;
		document.getElementById("solution").appendChild(div);
		return this;
	}

	var printEtapa = function (etapa) {
		this.print("<h3>Etapa "+etapa+"</h3>");
	}

	var printSolucion = function (position) {
		// 0 = bottom
		// 1 = top

		var text = "";
        text +="$$\\begin{eqnarray} ";

		for (var j = 0; j < this.numeroColumna.length; j++) {
			var auxNum = this.numeroColumna.length-1;
			for (var i = 0; i < this.answer.length; i++) {
				numero = this.numeroColumna[auxNum];
				auxNum--;
				if(numero-1 != j) continue;
				text += " x_"+numero+" & = & "+this.answer[i]+"  \\nonumber \\\\ ";
			}
		}

		text += "\\end{eqnarray}$$";

		var div = document.createElement('div');

		if(position === 1){
			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);
		}else{
			//text += '<button id="showSolution">Ver solución paso a paso</button>';
			div.innerHTML = text;
			var d = document.getElementById('results');
	        var li = document.createElement('div');
	            li.appendChild(div);
	        d.insertBefore(li, d.childNodes[0]);
		}

	}

	var printSolucionB = function () {

        var text = "";
        text +="$$\\begin{eqnarray} ";
		var auxNum = this.numeroColumna.length-1;
		for (var i = 0; i < this.b.length; i++) {
			numero = this.numeroColumna[auxNum];
			text += " x_"+numero+" & = & "+this.b[i]+"  \\nonumber \\\\ ";
			auxNum--;
		}
		text += "\\end{eqnarray}$$";

		var div = document.createElement('div');

			div.innerHTML = "<h3>Resultados:</h3>"+text;
			document.getElementById("solution").appendChild(div);


	}

	var printAb = function(full, noPrintB) {

			var div = document.createElement('div');
			var text = "";
			if(noPrintB){
				text = "<div>$$A"+this.etapaAb+"=\\begin{pmatrix}";
			}else{
				text = "<div>$$Ab"+this.etapaAb+"=\\begin{pmatrix}";
			}


			for (var i = 0; i < this.A.length; i++) {
				for (var j = 0; j < this.A[i].length; j++) {
					//text += this.A[i][j];

					if(full){
						text += this.round(this.A[i][j], 3);
					}else{
						text += this.round(this.A[i][j], 1);
					}



					if(j < this.A.length-1){
						text += " & ";
					}else{
						if(!noPrintB){
							if(full){
								text += " & \\vdots & "+this.round(this.b[i], 3);
							}else{
								text += " & \\vdots & "+this.round(this.b[i], 1);
							}
						}
					}

				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}

			for (var k = 0; k < this.b.length; k++) {
				this.b[k]
			}

			text += "\\end{pmatrix}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);

		return this;
	}


	var printL = function(full) {

			var matrizLSimb = [];
			for (var i = 0; i < this.matrizL.length; i++) {
				matrizLSimb.push([]);
				for (var j = 0; j < this.matrizL.length; j++) {
					matrizLSimb[i][j] = 0;
					if(i == j){
						matrizLSimb[i][j] = 1;
					}else if(i > j){
						matrizLSimb[i][j] = "l_{"+(i+1)+" "+(j+1)+"}";
					}else{
						matrizLSimb[i][j] = 0;
					}
				}
			}



			var div = document.createElement('div');
			var text = "<div>$$L = \\begin{pmatrix}";


			for (var i = 0; i < matrizLSimb.length; i++) {
				for (var j = 0; j < matrizLSimb[i].length; j++) {
					//text += this.A[i][j];

					text += matrizLSimb[i][j];

					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}


			text += "\\end{pmatrix} = \\begin{pmatrix}";

			for (var i = 0; i < this.matrizL.length; i++) {
				for (var j = 0; j < this.matrizL[i].length; j++) {
					//text += this.A[i][j];

					text += this.round(this.matrizL[i][j], 3);

					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}


			text += "\\end{pmatrix}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);



		return this;
	}

	var printALUCrout = function(colfil) {

			var matrizLSimb = [];
			for (var i = 0; i < this.matrizL.length; i++) {
				matrizLSimb.push([]);
				for (var j = 0; j < this.matrizL.length; j++) {
					if(j <= (colfil)){
						matrizLSimb[i][j] = this.round(this.matrizL[i][j], 3);
					}else{
						matrizLSimb[i][j] = 0;
						if(i >= j){
							matrizLSimb[i][j] = "l_{"+(i+1)+" "+(j+1)+"}";
						}else{
							matrizLSimb[i][j] = 0;
						}
					}

				}
			}

			var matrizUSimb = [];
			for (var i = 0; i < this.matrizU.length; i++) {
				matrizUSimb.push([]);
				for (var j = 0; j < this.matrizU.length; j++) {
					if(i <= (colfil)){
						matrizUSimb[i][j] = this.round(this.matrizU[i][j], 3);
					}else{
						matrizUSimb[i][j] = 0;
						if(i == j){
							matrizUSimb[i][j] = 1;
						}else if(i < j){
							matrizUSimb[i][j] = "u_{"+(i+1)+" "+(j+1)+"}";
						}else{
							matrizUSimb[i][j] = 0;
						}
					}
				}
			}



			var div = document.createElement('div');
			var text = "<div>$$\\begin{pmatrix}";

			for (var i = 0; i < this.A.length; i++) {
				for (var j = 0; j < this.A[i].length; j++) {
					text += this.A[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}

			text += "\\end{pmatrix} = \\begin{pmatrix}";

			for (var i = 0; i < matrizLSimb.length; i++) {
				for (var j = 0; j < matrizLSimb[i].length; j++) {
					text += matrizLSimb[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}

			text += "\\end{pmatrix}\\begin{pmatrix}";
			for (var i = 0; i < matrizUSimb.length; i++) {
				for (var j = 0; j < matrizUSimb[i].length; j++) {
					text += matrizUSimb[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}


			text += "\\end{pmatrix}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);



		return this;
	}


	var printALUDoolittle = function(colfil) {

			var matrizLSimb = [];
			for (var i = 0; i < this.matrizL.length; i++) {
				matrizLSimb.push([]);
				for (var j = 0; j < this.matrizL.length; j++) {
					if(j <= (colfil)){
						matrizLSimb[i][j] = this.round(this.matrizL[i][j], 3);
					}else{
						matrizLSimb[i][j] = 0;
						if(i == j){
							matrizLSimb[i][j] = 1;
						}else if(i > j){
							matrizLSimb[i][j] = "l_{"+(i+1)+" "+(j+1)+"}";
						}else{
							matrizLSimb[i][j] = 0;
						}
					}

				}
			}

			var matrizUSimb = [];
			for (var i = 0; i < this.matrizU.length; i++) {
				matrizUSimb.push([]);
				for (var j = 0; j < this.matrizU.length; j++) {
					if(i <= (colfil)){
						matrizUSimb[i][j] = this.round(this.matrizU[i][j], 3);
					}else{
						matrizUSimb[i][j] = 0;
						if(i <= j){
							matrizUSimb[i][j] = "u_{"+(i+1)+" "+(j+1)+"}";
						}else{
							matrizUSimb[i][j] = 0;
						}
					}
				}
			}



			var div = document.createElement('div');
			var text = "<div>$$\\begin{pmatrix}";

			for (var i = 0; i < this.A.length; i++) {
				for (var j = 0; j < this.A[i].length; j++) {
					text += this.A[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}

			text += "\\end{pmatrix} = \\begin{pmatrix}";

			for (var i = 0; i < matrizLSimb.length; i++) {
				for (var j = 0; j < matrizLSimb[i].length; j++) {
					text += matrizLSimb[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}

			text += "\\end{pmatrix}\\begin{pmatrix}";
			for (var i = 0; i < matrizUSimb.length; i++) {
				for (var j = 0; j < matrizUSimb[i].length; j++) {
					text += matrizUSimb[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}


			text += "\\end{pmatrix}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);



		return this;
	}


	var printALUCholesky = function(colfil) {

			var matrizLSimb = [];
			for (var i = 0; i < this.matrizL.length; i++) {
				matrizLSimb.push([]);
				for (var j = 0; j < this.matrizL.length; j++) {
					if(j <= (colfil)){
						matrizLSimb[i][j] = this.round(this.matrizL[i][j], 3);
					}else{
						matrizLSimb[i][j] = 0;
						if(i >= j){
							matrizLSimb[i][j] = "l_{"+(i+1)+" "+(j+1)+"}";
						}else{
							matrizLSimb[i][j] = 0;
						}
					}

				}
			}

			var matrizUSimb = [];
			for (var i = 0; i < this.matrizU.length; i++) {
				matrizUSimb.push([]);
				for (var j = 0; j < this.matrizU.length; j++) {
					if(i <= colfil){
						matrizUSimb[i][j] = this.round(this.matrizU[i][j], 3);
					}else{
						if(i == j){
							if(j == colfil){
								matrizUSimb[i][j] = this.round(this.matrizU[i][j], 3);
							}else{
								matrizUSimb[i][j] = "l_{"+(i+1)+" "+(j+1)+"}";
							}
						}else if(i < j){
							matrizUSimb[i][j] = "u_{"+(i+1)+" "+(j+1)+"}";
						}else{
							matrizUSimb[i][j] = 0;
						}
					}
				}
			}



			var div = document.createElement('div');
			var text = "<div>$$\\begin{pmatrix}";

			for (var i = 0; i < this.A.length; i++) {
				for (var j = 0; j < this.A[i].length; j++) {
					text += this.A[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}

			text += "\\end{pmatrix} = \\begin{pmatrix}";

			for (var i = 0; i < matrizLSimb.length; i++) {
				for (var j = 0; j < matrizLSimb[i].length; j++) {
					text += matrizLSimb[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}

			text += "\\end{pmatrix}\\begin{pmatrix}";
			for (var i = 0; i < matrizUSimb.length; i++) {
				for (var j = 0; j < matrizUSimb[i].length; j++) {
					text += matrizUSimb[i][j];
					if(j < this.A.length-1){
						text += " & ";
					}
				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}


			text += "\\end{pmatrix}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);



		return this;
	}


	var printLEcuaciones = function(fila) {
		/**
		 * fila: número de fila que se desea RETORNAR unicamente.
		 */
			//fila = (fila >= 0) ? fila : false;

			var div = document.createElement('div');
			var text = "<div>$$\\begin{eqnarray} ";
			if(fila >= 0){
				text = "";
			}

			for (var i = 0; i < this.matrizL.length; i++) {
				if(fila >= 0 && fila != i) continue;

				var isFirst = true;
				for (var j = 0; j < this.matrizL[i].length; j++) {

					if(this.matrizL[i][j] != 0){
						if(!isFirst){
							if(this.matrizL[i][j] > 0){
								text += " + ";
							}else{
								text += " - ";
							}
							text += this.round(Math.abs(this.matrizL[i][j]), 3) + "z_"+(j+1);
						}else{
							text += this.round(this.matrizL[i][j], 3) + "z_"+(j+1);
						}
						isFirst = false;


					}


					if(j == this.matrizL.length-1){
						text += " & = & "+this.round(this.b[i], 3) + "\\nonumber";
					}

				}

				if(i < this.matrizL.length){
					text += "\\\\";
				}
			}


			if(fila >= 0){
				return text;
			}

			text += "\\end{eqnarray}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);

		return this;
	}

	var printAbEcuaciones = function(fila) {
		/**
		 * fila: número de fila que se desea RETORNAR unicamente.
		 */

			//fila = (fila >= 0) ? fila : false;

			var div = document.createElement('div');
			var text = "<div>$$\\begin{eqnarray} ";
			if(fila >= 0){
				text = "";
			}

			for (var i = 0; i < this.A.length; i++) {
				if(fila >= 0 && fila != i) continue;

				var isFirst = true;
				for (var j = 0; j < this.A[i].length; j++) {

					if(this.A[i][j] != 0){
						if(!isFirst){
							if(this.A[i][j] > 0){
								text += " + ";
							}else{
								text += " - ";
							}
							text += this.round(Math.abs(this.A[i][j]), 3) + "x_"+this.numeroColumna[j];
						}else{
							text += this.round(this.A[i][j], 3) + "x_"+this.numeroColumna[j];
						}
						isFirst = false;


					}


					if(j == this.A.length-1){
						text += " & = & "+this.round(this.b[i], 3) + "\\nonumber";
					}

				}

				if(i < this.A.length-1){
					text += "\\\\";
				}
			}


			if(fila >= 0){
				return text;
			}

			text += "\\end{eqnarray}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);

		return this;
	}

	var printUEcuaciones = function(fila) {
		/**
		 * fila: número de fila que se desea RETORNAR unicamente.
		 */
			//fila = (fila >= 0) ? fila : false;

			var div = document.createElement('div');
			var text = "<div>$$\\begin{eqnarray} ";
			if(fila >= 0){
				text = "";
			}

			for (var i = 0; i < this.matrizU.length; i++) {
				if(fila >= 0 && fila != i) continue;

				var isFirst = true;
				for (var j = 0; j < this.matrizU[i].length; j++) {

					if(this.matrizU[i][j] != 0){
						if(!isFirst){
							if(this.matrizU[i][j] > 0){
								text += " + ";
							}else{
								text += " - ";
							}
							text += this.round(Math.abs(this.matrizU[i][j]), 3) + "x_"+(j+1);
						}else{
							text += this.round(this.matrizU[i][j], 3) + "x_"+(j+1);
						}
						isFirst = false;


					}


					if(j == this.matrizU.length-1){
						text += " & = & "+this.round(this.b[i], 3) + "\\nonumber";
					}

				}

				if(i < this.matrizU.length-1){
					text += "\\\\";
				}
			}


			if(fila >= 0){
				return text;
			}

			text += "\\end{eqnarray}$$</div>";

			div.innerHTML = text;
			document.getElementById("solution").appendChild(div);

		return this;
	}

	global.prototype.printAb = printAb;
	global.prototype.printEtapa = printEtapa;
	global.prototype.print = print;
	global.prototype.printL = printL;
	global.prototype.printAbEcuaciones = printAbEcuaciones;
	global.prototype.printSolucion = printSolucion;
	global.prototype.printLEcuaciones = printLEcuaciones;
	global.prototype.printALUCrout = printALUCrout;
	global.prototype.printUEcuaciones = printUEcuaciones;
	global.prototype.printSolucionB = printSolucionB;
	global.prototype.printALUCholesky = printALUCholesky;
	global.prototype.printALUDoolittle = printALUDoolittle;







})(Sistema);