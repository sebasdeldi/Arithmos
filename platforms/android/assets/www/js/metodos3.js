

require(["jquery", "Sistema", "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML"], function($) {
	MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});

	function read_matrix(num){
		if(!$("#matrix-"+num).length){
			return false;
		}

		var cols = $("#matrix-"+num).attr('data-cols');
		var rows = $("#matrix-"+num).attr('data-rows');

		var mat = [];
		for(var i=0; i<rows; i++){
			var arr = [];
		    for(var j=0; j<cols; j++){
		    	arr.push(Number($("#matr-"+num+"-"+i+"-"+j).val()));
		    }
		    mat.push(arr);
		}

		return mat;
	}


	function gen_matrix(num, cols, rows, def){
		var html = '<div class="matrix" id="matrix-'+num+'" data-cols="'+cols+'" data-rows="'+rows+'">';

		var value = "";


		if(rows == 4 && !def){
			//var def = [[[2, -3, 4, 1], [-4, 2, 1, -2], [1, 3, -5, 3], [-3, -1, 1, -1]], [10, -10, 32, -21]];
			var def = [[[20, -1, 3, 4], [6, 23, 4, 3], [7, 21, 46, 9], [-3, -9, 12, 38]], [30, -10, 20, -14]]; // Crout
		}


		for(var i=0; i<rows; i++){
		    for(var j=0; j<cols; j++){

		    	//if(rows == 4){
		    	if(def){
		    		if(num == 0){
			    		value = def[num][i][j]
			    	}else{
			    		value = def[num][i];
			    	}
		    	}

		    	//}


		        html += '<input size="3" id="matr-'+num+'-'+i+'-'+j+'" name="matr['+num+']['+i+']['+j+']" value="'+value+'"/>';
		    }
		    html += '<br/>';
		}
		html += '</div><br>';
		return html;
	}


	function render_input(){
		var inputs = '<div class="inputs" id="inputs">';
		inputs += '	<div class="md-form"><input size="1" class="matr-config form-control" type="text" id="matr-num" name="matr-num" value="4"/><label for="matr-num" class="active">M X N</label></div>';
		inputs += '</div><div id="matr-container"></div><p><input class= "btn btn-primary btn-sm" id="submit" name="submit" type="button"  value="Calcular"><input class= "btn btn-primary btn-sm" id="simular" type="button"  value="Simular" data-toggle="modal" data-target="#simularModal"><input class= "btn btn-primary btn-sm" id="guia" type="button"  value="Guía" data-toggle="modal" data-target="#guiaModal"></p><br><br>';
		return inputs;
	}






	function rerender(def){ //def = valores por default
		$( "#matr-container" ).html("");
		var nums = $("#matr-num").val();
		var inputs = "<table><tr><td>"+gen_matrix(0,nums,nums,def)+"</td><td>&nbsp; &nbsp; &nbsp;</td><td>"+gen_matrix(1,1,nums,def)+"</td></tr></table>";

		$( "#matr-container" ).append(inputs);
	}



	var metodos = [
		// Name: nombre a mostrar, file: nombre del archivo, sin .js, id: id usado para el data-metodo al cargar con algo por default.

		{
			name: "Eliminación Gaussiana (EG) simple",
			file: "eliminacionGaussianaSimple",
			id: "eliminacionGaussianaSimple",
			desc: "El método de eliminación Gaussiana simple parte de transforma la matriz original ($Ax = b$), por medio de un proceso de eliminación progresiva de variables que busca tener sólo una ecuación con una incógnita ($Ux = b$), de forma que terminado dicho proceso se proceda hacer sustitución regresiva para así poder hallar todos los valores de $x$; esto se logra a través de operaciones básicas llamadas operaciones de renglón, que son intercambio de filas, multiplicación de una fila por un escalar y  sustitución de una fila."
		},
		{
			name: "EG Simple con Pivoteo Parcial",
			file: "eliminacionGaussianaParcial",
			id: "eliminacionGaussianaParcial",
			desc: "El método de eliminación Gaussiana con pivoteo parcial permite evitar los errores de redondeo por números cercanos a cero, de forma que busca que el elemento de la diagonal principal sea el mayor posible, en caso de no serlo usa el intercambio de filas hasta hallar el mayor y así convertirlo en el elemento pivote, con el fin de que al realizar la división por dicho término no sea cero o próxima a este.Luego de obtener el elemento pivote se procede con el método de eliminación Gaussiana Simple para obtener los valores de todas las variables."
		},
		{
			name: "EG Simple con Pivoteo Total",
			file: "eliminacionGaussianaPivoteo",
			id: "eliminacionGaussianaPivoteo",
			desc: "El método de eliminación Gaussiana con pivoteo total busca que en la diagonal principal queden los mayores valores absolutos de cada submatriz, es decir que los multiplicadores sean los más pequeños posible, en caso de no tener el mayor valor en la diagonal se procede con el intercambio de filas (intercambia $A$ y $b$) o columnas (intercambia solo $A$) hasta hallar el mayor y así convertirlo en el elemento pivote. Al igual que pivoteo parcial se reduce el error de redondeo."
		},
		{
			name: "EG Simple con Pivoteo Escalado",
			file: "eliminacionGaussianaEscalado",
			id: "eliminacionGaussianaEscalado",
			desc: "El método de eliminación Gaussiana con pivoteo escalado busca que el elemento pivote sea aquel con el mayor valor absoluto con respecto a los elementos de la fila en la que se encuentra. es decir usar un factor de escala para cada fila, $s_{k} = max |a_{kj} | 1 <=j <=n$"
		},
		{
			name: "LU con EG Simple",
			file: "LU_GaussSimple",
			id: "LU_GaussSimple",
			desc: "El método de factorización $LU$ con eliminación Gaussian simple busca que el sistema de ecuaciones $Ax = b$ sea representado como $LUx = b$, es decir factorizar la matriz original $A$ como el producto de una matriz triangular inferior ($L$) y una matriz triangular superior ($U$). Los fundamentos teóricos son los mismos que los de eliminación gaussiana, es decir, las operaciones de fila y de columna son aplicados igualmente. Este método también es usado para encontrar la inversa de una matriz."
		},
		{
			name: "LU Crout",
			file: "crout",
			id: "crout",
			desc: "El método de factorización de Crout busca factorizar la matriz original $A$ como $A = LU$, es decir como el producto de una matriz triangular inferior ($L$) y una matriz triangular superior ($U$), para esto se debe reemplazar la diagonal principal de la matriz $U$ por unos, matemáticamente $U_{i i} = 1$ simpre que $L_{i i}$ sea diferente de cero para $i>0$."
		},
		{
			name: "LU Cholesky",
			file: "cholesky",
			id: "cholesky",
			desc: "El método de factorización de Cholesky establece que si la matriz original $A$ es simétrica $A^t =A$ y positiva definida (sus valores propios son positivos) puede ser factorizada por medio de una matriz triangular inferior ($L$) y una matriz triangular superior ($U$), es decir $U = L^t$, para esto  las diagonales de las matrices $U$ y $L$ deben ser iguales, matemáticamente $U_{i i} = L_{i i}$ donde $i > 0$."
		},
		{
			name: "LU Doolittle",
			file: "doolittle",
			id: "doolittle",
			desc: "El método de factorización de Doolittle busca factorizar la matriz original $A$ como $A = LU$, es decir como el producto de una matriz triangular inferior ($L$) y una matriz triangular superior ($U$), para esto se debe reemplazar la diagonal principal de la matriz $L$ por unos, matemáticamente $L_{i i} = 1$ simpre que $U_{i i}$ sea diferente de cero para $i>0$."
		},
	];

	function getDefault(){
		return ($("#metodo-unidad-3").attr("data-metodo")) ? $("#metodo-unidad-3").attr("data-metodo") : metodos[0].id;
	};

	function getDefault2(){
		return ($("#metodo-unidad-3-7").attr("data-metodo")) ? $("#metodo-unidad-3-7").attr("data-metodo") : metodos[0].id;
	};


	function renderSelectMetodos(id){
		if($("#metodo-unidad-3").attr("data-lista") !== undefined && $("#metodo-unidad-3").attr("data-lista") == "true"){
		    for (var i = 0; i < metodos.length; i++) {
		    	if(metodos[i].id == id){
		    		$('<option value="'+metodos[i].file+'" selected="selected">'+metodos[i].name+'</option>').appendTo("#alk-selmetodo");
		    	}else{
		    		$('<option value="'+metodos[i].file+'">'+metodos[i].name+'</option>').appendTo("#alk-selmetodo");
		    	}

		    }
		}else{
			$("#alk-tdselmetodo").html("");
		}

	};

	function renderSelectMetodos(id){
		if($("#metodo-unidad-3-7").attr("data-lista") !== undefined && $("#metodo-unidad-3-7").attr("data-lista") == "true"){
		    for (var i = 0; i < metodos.length; i++) {
		    	if(metodos[i].id == id){
		    		$('<option value="'+metodos[i].file+'" selected="selected">'+metodos[i].name+'</option>').appendTo("#alk-selmetodo");
		    	}else{
		    		$('<option value="'+metodos[i].file+'">'+metodos[i].name+'</option>').appendTo("#alk-selmetodo");
		    	}

		    }
		}else{
			$("#alk-tdselmetodo").html("");
		}

	};

	function getMetodo() {
		//var metodoID = $("#alk-selmetodo").val();
		var metodoID = $("#metodo-unidad-3").attr("data-metodo");
		var metodo;
		for (var i = 0; i < metodos.length; i++) {
        	if(metodos[i].id == metodoID){
        		metodo = metodos[i];
        	}
        }
        if(!metodo){
        	console.error("Metodo solicitado no existe, se procede a cargar el primero de la lista.");
        	metodo = metodos[0];
        }

        return metodo;
	}

	$(document).on('change', '.matr-config', function() {
		rerender();
	});

	$(document).on('click', '#save', function() {
		if(!confirm("¿Seguro deseas guardar el A y b actuales?\n\nSi ya has guardado otros datos, serán sobreescritos y no se podrán recuperar.\nRecuerda que los datos se guardan en el navegador que estas usando actualmente.")){
			return false;
		}

		var data = [];
		data.push(read_matrix(0));
		var bTmp = read_matrix(1);
		var b = [];
		for (var i = 0; i < bTmp.length; i++) {
			b.push(bTmp[i][0]);
		}
		data.push(b);
		localStorage.setItem("matriz", JSON.stringify(data));
		console.log(data);
	});

	$(document).on('click', '#load', function() {
		if(!localStorage.matriz){
			alert("No tienes datos guardados para escribir. Primero guarda A y b.");
			return false;
		}
		if(!confirm("¿Seguro deseas escribir el A y b que tenías guardado? El A y b actuales serán eliminados.")){
			return false;
		}

		var data = JSON.parse(localStorage.getItem("matriz"));
		$("#matr-num").val(data[0].length);
		rerender(data);
		console.log(data);
	});


	if (typeof(Storage) == "undefined") {
	} else {
	    $("#save").hide();
	    $("#load").hide();
	}

	function showDescription() {
		var metodo = getMetodo();
		$("#alk-desc").html(metodo.desc);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}

	$(document).on('change', '#alk-selmetodo', function() {
		showDescription();
	});

	require(["funciones", "print"], function() {
		showDescription();
		$(document).on('click', '#showSolution', function() {
			$("#solution").show();
		});
		$(document).on('click', '#submit', function() {
			var metodo = getMetodo();

	        $("#resultsPasoAPaso").html("<div id='solution'></div>");
	        $("#solution").hide();


			var data = Sistema(read_matrix(0), read_matrix(1));
			//$("#solution").append("<h2>"+metodo.name+"</h2>")
			require(["metodos/"+metodo.file], function() {
				try{
				 	data[metodo.id]();
		        }catch(e){
		        	console.log(e);
		        	if(e == 'Error: División por cero'){
		        		$("#results").prepend("<p style='color:red'><b>Error:</b> Se ha encontrado una división por cero. Revise el procedimiento a continuación:</p>");
			        	$("#solution").append("<p style='color:red'><b>Se ha encontrado una división por cero al ejecutar el siguiente paso.</b><br>Por favor, revise los valores de la matriz y que el tipo de método que está usando sea el adecuado.</p>");
				    	$("#solution").show();
		        	}

		        }
		        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	        });

	        $("form").hide();
	        $(".tabs-wrapper").show();
		});
	});

	$( "#metodo-unidad-3" ).append(render_input());
	renderSelectMetodos(getDefault());
	rerender();


});
