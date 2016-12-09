;(function (global) {
	var Sistema = function (A, b) {
		return new Sistema.init(A, b);
	}

	Sistema.init = function (A, b) {
		var self = this;
		self.A = A || '';
		self.b = b || '';

		self.numeroColumna = [];
		self.multiplicadores = [];
		self.matrizL = [];
		self.matrizU = [];
		self.mayoresFilas = [];
		self.answer = [];
		self.filaTemp = 0;
		self.columTemp = 0;
		self.cont_i = 0;
		self.cont_j = 0;
		self.etapaAb = ""; // Guarda las primas


		for (var i = 1; i <= this.A.length; i++) {
			this.numeroColumna.push(i);
		}

		this.printAb();
	}


	Sistema.init.prototype = Sistema.prototype;
	global.Sistema = Sistema;
})(window)