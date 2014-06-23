var alfabeto =[];
	var estados = [];
	var gamma = [];
	var transiciones = [];
	var testCadena;
	var inicial;
	var aceptacion;
	var rechazo;
	var numEstados;
	var inicioIndex;
	var aceptacionIndex;
	var rechazoIndex;
	var estadoIngresado = false;
	var alfabetoIngresado = false;
	var controlInput = 0;
	var controlHelp1 = 0;
	var controlHelp2 = 0;
	
	$( "div.hidden2" ).hide();
	$( "div.help1" ).hide();
	$( "div.help2" ).hide();
	
	$( "#alfabeto" ).keyup(function(event) {
	console.log("El tamanio es de: " + document.getElementById("alfabeto").value.length);
	if(event.which == 13)
	{
		var value = document.getElementById("alfabeto").value;
		var size = value.length;
		
		if(checkLength(size) === true)
		{
			if(validateRepetition(value) === true)
			{
				if(bannedChar(value) === true)
				{
					alfabetoIngresado = true;
					alfabeto.push(document.getElementById("alfabeto").value);
					gamma = alfabeto.slice(0);
					gamma.push("_");
					gamma.push("x");
					console.log("Los valores de gamma son: " + gamma);
					document.getElementById("alfabeto").value = "";
					alfabetoString();
					cintaString();
					if( (estadoIngresado === true) && (alfabetoIngresado === true) )
					{
						resetArray();
						actualizarTabla();
					}
					
					
					console.log(alfabeto);
				}
				else
				{
					alert("El caracter " + value + " no es valido!" );
					document.getElementById("alfabeto").value = "";
				}
			}
			else
			{
				alert("El valor " + value + " ya esta en el alfabeto!");
				document.getElementById("alfabeto").value = "";
			}
		}
		else
		{
			alert("Solo se puede ingresar un caracter!");
			document.getElementById("alfabeto").value = "";
		}
	}
	
	
	
	});
	
	$( "#numEstados" ).keyup(function(event) {
	if(event.which === 13)
	{
		var num = parseInt(document.getElementById("numEstados").value);
		if(isNaN(num) === false)
		{
			if(num > 2)
			{
				estadoIngresado = true;
				crearEstados(num);
				inicial = estados[0];
				console.log("Inicial 1: " + inicial);
				populateMenu();
				estadosString();
				if( (estadoIngresado === true) && (alfabetoIngresado === true) )
				{
					resetArray();
					actualizarTabla();
				}
			}
			else
			{
				alert("La maquina debe de tener mas de 2 estados!");
				document.getElementById("numEstados").value = "";
			}
		}
		else
		{
			alert("Numero de estados invalido!");
			document.getElementById("numEstados").value = "";
		}
		
	}
	
	});
	$( "#transicion2" ).keyup(function(event) {
		if(event.which === 13)
		{
			if( (estadoIngresado === true) && (alfabetoIngresado === true) )
			{
				var tempCadena1 = document.getElementById("transicion1").value;
				var tempCadena2 = document.getElementById("transicion2").value;
				var cadena1 = tempCadena1.split(' ').join('');
				var cadena2 = tempCadena2.split(' ').join('');
				console.log("La cadena1 sin espacios es: " + cadena1);
				console.log("La cadena2 sin espacios es: " + cadena2);
				verificarTransicion(cadena1, cadena2, 0);
			}
			else
			{
				alert("Ingresar el numero de estados y el alfabeto de la maquina!");
				document.getElementById("transicion1").value = "";
				document.getElementById("transicion2").value = "";
			}
			
		}
		
	});
	$( "#cadena" ).keyup(function(event) {
	
	if(event.which === 13)
	{	
		if( (alfabetoIngresado === true) && (estadoIngresado === true) )
		{
			if(transicionesVacias() === false)
			{
				if(valCadena() === true)
				{
					configuracion();
				}
				else
				{
					alert("La cadena es invalida!");
				}
			}
		}
		else
		{
			alert("Ingresar el numero de estados y el alfabeto de la maquina!");
			document.getElementById("cadena").value = "";
		}
		
	}
	});
	function checkLength(size)
	{
		console.log("check value = " + size);
		if(size === 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function validateRepetition(valor)
	{
		for(var i = 0; i < alfabeto.length; i++)
		{
			if(valor === alfabeto[i])
			{
				i = alfabeto.length;
				return false;
			}
		}
		return true;
	}
	
	function bannedChar(valor)
	{
		switch(valor)
		{
			case " ":
				return false;
				break;
			case "x":
				return false;
				break;
			case "_":
				return false;
				break;
			default:
				return true;
				break;
		}
	}
	
	function crearEstados(num)
	{
		estados = [];
		for(var i = 1; i < (num + 1); i++)
		{
			estados.push("q" + i)
		}
		document.getElementById("numEstados").value = "";
		console.log(estados);
	}
	
	function populateMenu()
	{
		document.getElementById("menuEstados").options.length = 0;	
		document.getElementById("menuAceptacion").options.length = 0;
		document.getElementById("menuRechazo").options.length = 0;
		for(var i = 0; i < estados.length; i++)
		{
			var select = document.getElementById("menuEstados");
			var select2 = document.getElementById("menuAceptacion");
			var select3 = document.getElementById("menuRechazo");
			select.options[select.options.length] = new Option(estados[i]);
			select2.options[select2.options.length] = new Option(estados[i]);
			select3.options[select3.options.length] = new Option(estados[i]);
		}
		inicioIndex = 0;
		aceptacionIndex = estados.length-2;
		document.getElementById("menuAceptacion").selectedIndex = aceptacionIndex;
		inicial = estados[0];
		aceptacion = estados[estados.length-2];
		rechazo = estados[estados.length-1];
		rechazoIndex = estados.length-1;
		document.getElementById("menuRechazo").selectedIndex = rechazoIndex;
		document.getElementById("inicialString").innerHTML = estados[0];
		document.getElementById("aceptacionString").innerHTML = estados[estados.length-2];
		document.getElementById("rechazoString").innerHTML = estados[estados.length-1];
	}
	
	function setInicio(valor)
	{
		var a;
		var b;
		var tempIndex;
		switch(valor)
		{
			case 1:
				 a = document.getElementById("menuEstados");
				 inicial = a.options[a.selectedIndex].value;
				 document.getElementById("inicialString").innerHTML = inicial;
				 console.log("El valor inicial es: " + inicial);
				 break;
			case 2:
				a = document.getElementById("menuAceptacion");
				b = a.value;
				if(b !== rechazo)
				{
					console.log("El estado de rechazo es: " + rechazo + " con valor b de: " + b);
					console.log("ENTRO A CONDICION");
					aceptacion = a.options[a.selectedIndex].value;
					document.getElementById("aceptacionString").innerHTML = aceptacion;
					aceptacionIndex = a.selectedIndex;
					console.log("El estado de aceptacion es: " + aceptacion);
				}
				else
				{
					alert("El estado de aceptacion no puede ser el mismo que el de rechazo!");
					a.selectedIndex = aceptacionIndex;
				}
				break;
				
			case 3:
				a = document.getElementById("menuRechazo");
				b = a.value;
				if(b !== aceptacion)
				{
					rechazo = a.options[a.selectedIndex].value;
					document.getElementById("rechazoString").innerHTML = rechazo;
					rechazoIndex = a.selectedIndex;
					console.log("El estado de rechazo es: " + rechazo);
				}
				else
				{
					alert("El estado de rechazo no puede ser el mismo que el de aceptacion!")
					a.selectedIndex = rechazoIndex;
				}
				break;
		}
		
		
	}
	
	function estadosString()
	{
		var cadena = "{";
		for(var i = 0; i < estados.length; i++)
		{
			if(i === estados.length-1)
			{
				cadena = cadena + estados[i];
			}
			else
			{
				cadena = cadena + estados[i] + ", ";
			}
		}
		cadena += "}";
		console.log("La cadena es: " + cadena);
		document.getElementById("estadosString").innerHTML = cadena;	
	}
	
	function alfabetoString()
	{
		var cadena = "{";
		for(var i = 0; i < alfabeto.length; i++)
		{
			if(i === alfabeto.length-1)
			{
				cadena = cadena + alfabeto[i];
			}
			else
			{
				cadena = cadena + alfabeto[i] + ", ";
			}
		}
		cadena += "}";
		console.log("La cadena es: " + cadena);
		document.getElementById("alfabetoString").innerHTML = cadena;	
	}
	
	function cintaString()
	{
		var cadena = "{";
		for(var i = 0; i < gamma.length; i++)
		{
			if(i === gamma.length-1)
			{
				cadena = cadena + gamma[i];
			}
			else
			{
				cadena = cadena + gamma[i] + ", ";
			}
		}
		cadena += "}";
		console.log("La cadena es: " + cadena);
		document.getElementById("cintaString").innerHTML = cadena;
	}
	
	function resetArray()
	{
		transiciones = [];
		var tempArray = [];
		for(var i =0; i < gamma.length; i++)
		{
			tempArray.push("~");
		}
		
		for(var i = 0; i < estados.length; i++)
		{
			var array2 =tempArray.slice(0);
			transiciones.push(array2);
		}
		console.log("El arreglo bidimensional es: " + transiciones);
		/*
		transiciones[4][4] = "$";
		transiciones[4][3] = "%";
		transiciones[0][0] = "&"
		console.log("El arreglo bidimensional esta incializado en: " + transiciones);
		console.log("Primer valor: " + transiciones[0][0]);
		*/
	}
	
	function verificarTransicion(cadena1, cadena2, tipo)
	{
		var arrCadena1 = cadena1.split(",");
		var arrCadena2 = cadena2.split(",");
		var errorMessage = "";
		var posEstado;
		var posGamma;
		var error = false;
		var resultado1 = false;
		var resultado2 = false;
		var resultado3 = false;
		var resultado4 = false;
		var resultado5 = false;
		
		for(var i = 0; i < estados.length; i++)
		{
			if(arrCadena1[0] === estados[i])
			{
				posEstado = i;
				resultado1 = true;
			}
			
			if(arrCadena2[0] === estados[i])
			{
				resultado3 = true;
			}
		}
		
		for(var i = 0; i < gamma.length; i++)
		{
			if(arrCadena1[1] === gamma[i])
			{
				posGamma = i;
				resultado2 = true;
			}
			
			if(arrCadena2[1] === gamma[i])
			{
				resultado4 = true;
			}
		}
		
		console.log("El arreglo es: " + arrCadena2);
		if( (arrCadena2[2] === "r") || (arrCadena2[2] === "l") )
		{
			resultado5 = true;
		}
		
		if(resultado1 === false)
		{
			errorMessage = errorMessage + arrCadena1[0] + ", ";
			error = true;
		}
		if(resultado2 === false)
		{
			errorMessage = errorMessage + arrCadena1[1] + ", ";
			error = true;
		}
		if(resultado3 === false)
		{
			errorMessage = errorMessage + arrCadena2[0] + ", ";
			error = true;
		}
		if(resultado4 === false)
		{
			errorMessage = errorMessage + arrCadena2[1] + ", ";
			error = true;
		}
		if(resultado5 === false)
		{
			errorMessage = errorMessage + arrCadena2[2];
			error = true;
		}
		
		console.log("El error es: " + errorMessage);
		
		if(error === true)
		{
			if(tipo === 0)
			{
				alert("Los caracteres " + errorMessage + " no son validos!");
				return false;
			}
			else
			{
				return false;
			}
			
		}
		else
		{
			transiciones[posEstado][posGamma] = cadena2;
			var tabla = document.getElementById("tablaTransiciones");
			console.log("Las transiciones son: " + transiciones);
			tabla.rows[posEstado+1].cells[posGamma+1].innerHTML = cadena2;
			document.getElementById("transicion1").value = "";
			document.getElementById("transicion2").value = "";
			return true;
		}
	}
	
	function actualizarTabla()
	{
		var table = document.getElementById("tablaTransiciones");
		table.innerHTML = "";
		for (var r = 0; r < estados.length+1; r++) 
		{
			var row = table.insertRow(-1);
			for (var c = 0; c < gamma.length+1; c++) 
			{
				var cell = row.insertCell(-1);
				cell.appendChild(document.createTextNode("-----"));
			}
		}
		table.rows[0].cells[0].innerHTML = "";
		for(var i = 0; i < estados.length; i++)
		{
			table.rows[i+1].cells[0].innerHTML = estados[i];
		}
		for(var j = 0; j < gamma.length; j++)
		{
			table.rows[0].cells[j+1].innerHTML = gamma[j];
		}

	}
	
	function valCadena()
	{
		var cadena = document.getElementById("cadena").value;
		var count = 0;
		for(var i = 0; i < cadena.length; i++)
		{
			count = 0;
			for(var j = 0; j < gamma.length-2; j++)
			{
				if(cadena[i] !== gamma[j])
				{
					count++;
				}
				
				if( count === gamma.length -2 )
				{
					return false;
				}
			}
		}
		testCadena = cadena;
		return true;
	}
	
	function configuracion()
	{
		var puntero = 2;
		var estadoActual = 1;
		var nuevoEstado;
		var nuevoGamma;
		var direccion;
		var cadenaFinal = "";
		var continuar = true;
		var conf = [];
		var resultados = [];
		var cordI;
		var cordJ;
		conf.push("_");
		conf.push(inicial);
		cadenaFinal +=  "_" + inicial;
		for(var i = 0; i < testCadena.length; i++)
		{
			conf.push(testCadena[i]);
			cadenaFinal += testCadena[i];
		}
		conf.push("_");
		cadenaFinal += "_";
		resultados.push(cadenaFinal);
		
		while(continuar)
		{
			coordI = buscarCoord(conf[estadoActual], 1);
			coordJ = buscarCoord(conf[puntero], 2);
			var tempCadena = transiciones[coordI][coordJ];
			var tempArr = tempCadena.split(",");
			nuevoEstado = tempArr[0];
			nuevoGamma = tempArr[1];
			direccion = tempArr[2];
			
			switch(direccion)
			{
				case "r":
					conf[estadoActual] = nuevoEstado;
					conf[puntero] = nuevoGamma;
					var tempValor = conf[puntero];
					conf[puntero] = conf[estadoActual];
					conf[estadoActual] = tempValor;
					puntero++;
					estadoActual++;
					cadenaFinal = "";
					for(var i = 0; i < conf.length; i++)
					{
						cadenaFinal += conf[i];
					}
					resultados.push(cadenaFinal);
					break;
				case "l":
					conf[estadoActual] = nuevoEstado;
					conf[puntero] = nuevoGamma;
					var tempValor = conf[estadoActual-1];
					conf[estadoActual-1] = conf[estadoActual];
					conf[estadoActual] = tempValor;
					puntero--;
					estadoActual--;
					cadenaFinal = "";
					for(var i = 0; i < conf.length; i++)
					{
						cadenaFinal += conf[i];
					}
					resultados.push(cadenaFinal);
					break;
					
			}
			
			if( (conf[estadoActual] === estados[buscarCoord(aceptacion,1)])  || (conf[estadoActual] === estados[buscarCoord(rechazo,1)]) )
			{
				continuar = false;
				console.log("La lista de resultados es: " + resultados);
				imprimirResultados(resultados);
			}
		}
		if(conf[estadoActual] === aceptacion)
		{
			alert("La cadena es aceptada por la maquina!");
		}
		else
		{
			alert("La cadena no es aceptada por la maquina!")
		}
	}
	
	function buscarCoord(valor, tipo)
	{
		switch(tipo)
		{
			case 1: 
				for(var i = 0; i < estados.length; i++)
				{
					if(valor === estados[i])
					{
						return i;
					}
				}
				break;
				
			case 2:
				for(var j = 0; j < gamma.length; j++)
				{
					if(valor === gamma[j])
					{
						return j;
					}
				}
				break;
		}
	}
	
	function imprimirResultados(resultados)
	{
		/*
		var list = document.getElementById("listaCadenas");
		list.innerHTML = "";
		for(var i =0; i < resultados.length; i++)
		{
			var entry = document.createElement('li');
			entry.appendChild(document.createTextNode(resultados[i]));
			list.appendChild(entry);
		}
		*/
		var resultadoCadena = "";
		for(var i = 0; i < resultados.length; i++)
		{
			resultadoCadena += (i+1) + ". " + resultados[i] + "\n"; 
		}
		document.getElementById("resultadosArea").value = resultadoCadena;
	}
	
	function resetAlfabeto()
	{
		alfabetoIngresado = false;
		alfabeto = [];
		gamma = [];
		document.getElementById("alfabetoString").innerHTML = "";
		document.getElementById("cintaString").innerHTML = "";
		document.getElementById("tablaTransiciones").innerHTML = "";
		console.log("Alfabeto despues de reset: " + alfabeto);
		console.log("Alfabeto cinta despues de reset: " + gamma);
	}
	
	function transicionesVacias()
	{
		var contador = 0;
		
		for(var i = 0; i < estados.length; i++)
		{
			for(var j = 0; j < gamma.length; j++)
			{
				if(transiciones[i][j] === "~")
				{
					contador++;
				}
			}
		}
		
		var tamanio = gamma.length * 2;
		
		if(contador > tamanio)
		{
			var valor = contador - tamanio;
			alert("Hacen falta " + valor + " transiciones!");
			document.getElementById("cadena").value = "";
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function stringArea()
	{
		resetArray();
		document.getElementById("tablaTransiciones").innerHTML = "";
		actualizarTabla();
		var cadena = document.getElementById("transicionesArea").value;
		var tempValor = cadena.split(' ').join('');
		tempValor = tempValor.split('\n').join('');
		console.log("La cadena sin espacios es: " + tempValor);
		var arrayCadena = tempValor.split(",");
		var transitions1 = [];
		var transitions2 = [];
		var contador = 0;
		var tempVariable;
		console.log("Tamanio de cadena es: " + arrayCadena.length);
		for(var i = 0; i < arrayCadena.length; i++)
		{
			console.log("Contador: " + contador);
			switch(contador)
			{
				case 0:
					console.log("ENTRO");
					tempVariable = arrayCadena[i] + "," + arrayCadena[i+1];
					transitions1.push(tempVariable);
					contador++;
					break;
				case 2:
					tempVariable = arrayCadena[i] + "," + arrayCadena[i+1] + "," + arrayCadena[i+2] ;
					transitions2.push(tempVariable);
					contador++;
					break;
				case 4:
					contador = 0;
					break;
				default:
					contador++;
					break;
			}
		}
		console.log("Los valores de las transiciones son: " + arrayCadena);
		console.log("Las transiciones input son: " + transitions1);
		console.log("Las transiones output son: " + transitions2);
		console.log("La primera transicion es: " + transitions1[0]);
		console.log("Num input: " + transitions1.length + " Num output: " + transitions2.length);
		
		for(var i = 0; i < transitions1.length; i++)
		{
			if(verificarTransicion(transitions1[i],transitions2[i],1) === false)
			{
				alert("Se encontraron caracteres invalido(s) en la transicion numero: " + (i+1));
				i = transitions1.length;
				document.getElementById("tablaTransiciones").innerHTML = "";
				resetArray();
				actualizarTabla();
				document.getElementById("transicionesArea").value = "";
			}
		}
		
		
	}
	
	function cambiarInput()
	{
		if(controlInput === 0)
		{
			controlInput = 1;
			$( "div.hidden1" ).hide( "fast" );
			$( "div.hidden2" ).show( "fast" );
		}
		else
		{
			controlInput = 0;
			$( "div.hidden2" ).hide( "fast" );
			$( "div.hidden1" ).show( "fast" );
		}
	}
	
	function mostrarHelp(tipo)
	{
		switch(tipo)
		{
			case 1:
				if(controlHelp1 === 0)
				{
					controlHelp1 = 1;
					$( "div.help1" ).show( "fast" );
				}
				else
				{
					controlHelp1 = 0;
					$( "div.help1" ).hide( "fast" );
				}
				break;
			case 2:
				if(controlHelp2 === 0)
				{
					controlHelp2 = 1;
					$( "div.help2" ).show( "fast" );
				}
				else
				{
					controlHelp2 = 0;
					$( "div.help2" ).hide( "fast" );
				}
				break;
		}
	}