onload=inicio;

let urlServicio = 'http://localhost:49700/api/';

let comboNF = document.getElementById("nombreArchivoNF");

class Accion {
	
	constructor(elNombreRepo,laRutaRepo, elTipoRepo, elTipoAccion, elDetalle) {
		this.nombreRepo=elNombreRepo;
		this.rutaRepo= laRutaRepo;
		this.tipoRepo= elTipoRepo;
		this.tipoAccion = elTipoAccion;
		this.detalle = elDetalle;
	}
	
	toJSON(){
		return '{"NombreRepo": "' +  this.nombreRepo + '",' +
				'"RutaRepo": "' + this.rutaRepo + '",'+ 
				'"TipoRepo": "' + this.tipoRepo + '",' + 
				'"TipoAccion": "' + this.tipoAccion + '",' +
				'"Detalle": "' + this.detalle + '"'
				+ '}';				
	}
	
};

class Funcion {
	constructor(elNombreArchivo, elNombreFuncion, laLinea, laColumna){
		this.nombreArchivo = elNombreArchivo;
		this.nombreFuncion = elNombreFuncion;
		this.linea = laLinea;
		this.columna = laColumna;
	}

	toJSON(){
		return '{"Linea": "' +  this.linea + '",' +
				'"Columna": "' + this.columna + '",'+ 
				'"NombreArchivo": "' + this.nombreArchivo + '",' + 
				'"NombreFuncion": "' + this.nombreFuncion + '",' 
				+ '}';		
	}
}

class Relacion {
	constructor(elNombreArchivo, laLinea, laColumna){
		this.nombreArchivo = elNombreArchivo;
		this.linea = laLinea;
		this.columna = laColumna;
	}

	toJSON(){
		return '{"Linea": "' +  this.linea + '",' +
				'"Columna": "' + this.columna + '",'+ 
				'"NombreArchivo": "' + this.nombreArchivo + '",' 
				+ '}';		
	}
}

function inicio(){
	document.getElementById("btnInsertarAccion").addEventListener("click", insertarAccion);
	document.getElementById("btnConsultarAcciones").addEventListener("click", consultarAcciones);

	document.getElementById("home").addEventListener("click", mostrarHome);
	document.getElementById("feedAcciones").addEventListener("click", mostrarFeedAcciones);
	document.getElementById("navegacionCodigo").addEventListener("click", mostrarNavegacionCodigo);
	document.getElementById("btnAgregarAccion").addEventListener("click", agregarAccionLista);
	document.getElementById("btnInsertar").addEventListener("click", mostrarOpciones);

	document.getElementById("btnAgregarArchivoGrafo").addEventListener("click", insertarArchivo);
	document.getElementById("btnAgregarFuncionGrafo").addEventListener("click", insertarFuncion); 
	document.getElementById("btnAgregarRelacionGrafo").addEventListener("click", insertarRelacion); 

	document.getElementById("btnConsultarCodigoInvocaciones").addEventListener("click", consultarInvocaciones);
	document.getElementById("btnConsultarCodigoIrDefinicion").addEventListener("click", consultaIrDefinicion);

	
	mostrarHome();

	$("tablaAcciones").empty();
	$("tablaConsInvocaciones1").empty();
}

function mostrarHome(){
	document.getElementById("divOk").innerHTML = ""
	document.getElementById("divError").innerHTML = ""
	document.getElementById("divhome").style.display = "block";
	document.getElementById("divFeedAcciones").style.display = "none";
	document.getElementById("divGestionCodigo").style.display= "none"
	document.getElementById("DivInsertarAccion").style.display= "none";
	document.getElementById("DivConsultarAcciones").style.display= "none";
	document.getElementById("comboGrafosAcciones").style.display="none";
	document.getElementById("divNA").style.display = "none";
	document.getElementById("divNF").style.display = "none";
	document.getElementById("divNR").style.display = "none";
	document.getElementById("divConsultaInvocaciones").style.display = "none";
	document.getElementById("divConsultaIrDefinicion").style.display = "none";
}

function mostrarFeedAcciones(){
	document.getElementById("divOk").innerHTML = ""
	document.getElementById("divError").innerHTML = ""
	document.getElementById("divhome").style.display = "none";
	document.getElementById("divFeedAcciones").style.display = "block";
	document.getElementById("divGestionCodigo").style.display= "none"
	document.getElementById("DivInsertarAccion").style.display= "none";
	document.getElementById("DivConsultarAcciones").style.display= "none";
	document.getElementById("comboGrafosAcciones").style.display="none";
	document.getElementById("divNA").style.display = "none";
	document.getElementById("divNF").style.display = "none";
	document.getElementById("divNR").style.display = "none";
	document.getElementById("divConsultaInvocaciones").style.display = "none";
	document.getElementById("divConsultaIrDefinicion").style.display = "none";
}

function mostrarNavegacionCodigo(){
	document.getElementById("divOkG").innerHTML = ""
	document.getElementById("divErrorG").innerHTML = ""
	document.getElementById("divhome").style.display = "none";
	document.getElementById("divFeedAcciones").style.display = "none";
	document.getElementById("divGestionCodigo").style.display= "block";
	document.getElementById("DivInsertarAccion").style.display= "none";
	document.getElementById("DivConsultarAcciones").style.display= "none";
	document.getElementById("comboGrafosAcciones").style.display="none";
	document.getElementById("divNA").style.display = "none";
	document.getElementById("divNF").style.display = "none";
	document.getElementById("divNR").style.display = "none";
	document.getElementById("divConsultaInvocaciones").style.display = "none";
	document.getElementById("divConsultaIrDefinicion").style.display = "none";
}

function insertarAccion(){
	document.getElementById("divOk").innerHTML = ""
	document.getElementById("divError").innerHTML = ""
	var usuario = document.getElementById("username").value;
	if (usuario.length === 0)
	{
		document.getElementById("divError").innerHTML = "<div class='alert alert-warning' role='alert'>" + 
		"Debe ingresar el usuario </div>"
	}
	else{
		document.getElementById("DivInsertarAccion").style.display= "block";
		document.getElementById("DivConsultarAcciones").style.display= "none";					
	}
}

function agregarAccionLista()
{
	document.getElementById("divOk").innerHTML = ""
	document.getElementById("divError").innerHTML = ""
	var usuario = document.getElementById("username").value;
	var nombreRepo = document.getElementById("nombrerepo").value;
	var rutaRepo = document.getElementById("rutarepo").value;
	var tipoRepo = "";
	var tiposRepos = document.getElementsByName("tipoRepoCombo");
	for (var i=0; i<tiposRepos.length; i++) { 
		if (tiposRepos[i].selected) { 
			tipoRepo = tiposRepos[i].value;
		}
	}
	var tipoAccion = document.getElementById("tipoAccion").value;
	var detalle = document.getElementById("detalleaccion").value;

	var accion = new Accion(nombreRepo, rutaRepo, tipoRepo, tipoAccion, detalle);

    $.ajax({
        url: urlServicio + 'values?username=' + usuario ,
        type: 'POST',
        contentType: 'application/json',
        data: accion.toJSON(),
        crossDomain : false,
        success: function() {
        	document.getElementById("divOk").innerHTML = "<div class='alert alert-success' role='alert'> "
        	+ "Se agrego la acción correctamente. </div>";
        	window.scrollTo(0,0);
        },
        error: function() {
        	document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
    });

   	document.getElementById("tipoAccion").value = "";
	document.getElementById("detalleaccion").value = "";
}


function consultarAcciones(){
	document.getElementById("divOk").innerHTML = ""
	document.getElementById("divError").innerHTML = ""
	var usuario = document.getElementById("username").value;
	if (usuario.length === 0)
	{
		document.getElementById("divError").innerHTML = "<div class='alert alert-warning' role='alert'>" + 
		"Debe ingresar el usuario </div>"
	}
	else{
		document.getElementById("DivInsertarAccion").style.display= "none";
		document.getElementById("DivConsultarAcciones").style.display= "block";
		$.ajax({
	        url: urlServicio + 'values?username='+usuario,
	        type: 'GET',
	        crossDomain : false,
	        success: function(respuesta) {
	           	if (respuesta !== null){
	           		existe = true;
	           		$("tablaAcciones").empty();
	           		cargarTabla(respuesta);	
	           	}
	           	else
				{
					document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
					"No existe el usuario ingresado </div>";
					window.scrollTo(0,0);
				}
	        },
	        error: function() {
	            document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"No es posible completar la operación </div>";
				window.scrollTo(0,0);
	        }
    	});
		
	}
}

function cargarTabla(acciones)
{
	let  tablaA = document.getElementById("tablaAcciones");

	limpiarTabla(tablaA);

	let accionesJson = JSON.parse(acciones);

	for (var j = 0; j < accionesJson.length; j++) {
		let  fila = tablaA.insertRow();
	    var accionAux = accionesJson[j];
	    
	    let celdas = ["", "", "", "", "", ""]
		for (var i = 0; i<6; i++)
		{
			celdas[i] = fila.insertCell();	
		}

		celdas[0].innerHTML= accionAux.NombreRepo;
		celdas[1].innerHTML= accionAux.RutaRepo;
		celdas[2].innerHTML= accionAux.TipoRepo;
		celdas[3].innerHTML= accionAux.TipoAccion;
		celdas[4].innerHTML= accionAux.Fecha;
		celdas[5].innerHTML= accionAux.Detalle;

	}
}

function mostrarOpciones ()
{
	document.getElementById("comboGrafosAcciones").style.display = "block";
	document.getElementById("divNF").style.display = "block";
	//limpiarComboArchivos();
	cargarComboArchivos();
	cargarComboArchivosFuncion();
	cargarComboArchivosFuncionI();
	document.getElementById("comboFuncionNR").style.display="none";
	document.getElementById("divConsultaInvocaciones").style.display = "none";
	document.getElementById("divConsultaIrDefinicion").style.display = "none";
	document.getElementById("id_nf").selected = true;
}
	//cargarComboFuncionInvocada();


function cargarComboArchivos (){
	let select = document.getElementById("comboArchivosNF");
	limpiarCombo("comboArchivosNF");

	$.ajax({
        url: urlServicio + 'Archivo',
        type: 'GET',
        crossDomain : false,
        success: function(respuesta) {
           	if (respuesta !== null){
           		let archivosJSON = JSON.parse(respuesta);

           		for (let i =0; i < archivosJSON.length; i++) {
				  var option = document.createElement("option");
				  option.text = archivosJSON[i];
				  option.className  = "comboArchivosNFclassname";
				  select.add(option);
				 // selectNRArchivos.add(option);
				 }
           	}
           	else
			{
				document.getElementById("divErrorG").innerHTML = "<div class='alert alert-info' role='alert'>" + 
				"No se encontraron archivos </div>";
				document.getElementById("divNF").style.display ="block";
				window.scrollTo(0,0);
			}
        },
        error: function() {
            document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
	});
}

function cargarComboArchivosFuncion (){
	let selectNRArchivos = document.getElementById("comboArchivosNR");

	limpiarCombo("comboArchivosNR");

	$.ajax({
        url: urlServicio + 'Archivo',
        type: 'GET',
        crossDomain : false,
        success: function(respuesta) {
           	if (respuesta !== null){
           		let archivosJSON = JSON.parse(respuesta);
           		var option = document.createElement("option");
				option.text = "Seleccione un archivo";
				option.className  = "comboArchivosNRclassname";
				selectNRArchivos.add(option);
           		
           		for (let i =0; i < archivosJSON.length; i++) {
				  var option = document.createElement("option");
				  option.text = archivosJSON[i];
				  option.className  = "comboArchivosNRclassname";
				  selectNRArchivos.add(option);
				 }
           	}
           	else
			{
				document.getElementById("divErrorG").innerHTML = "<div class='alert alert-info' role='alert'>" + 
				"No se encontraron archivos </div>";
				document.getElementById("divNF").style.display ="block";
				window.scrollTo(0,0);
			}
        },
        error: function() {
            document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
	});
}

function cargarComboFuncionInvocada (nombreArchivo){
	let selectNRFuncion = document.getElementById("comboFuncionNR");

	limpiarCombo("comboFuncionNR");

	$.ajax({
        url: urlServicio + 'Funcion?archivo=' + nombreArchivo,
        type: 'GET',
        crossDomain : false,
        success: function(respuesta) {
           	if (respuesta !== null){
           		let funcionesJSON = JSON.parse(respuesta);
           		for (let i =0; i < funcionesJSON.length; i++) {
				  var option = document.createElement("option");
				  option.text = funcionesJSON[i];
				  option.className  = "comboFuncionNRclassname";
				  selectNRFuncion.add(option);
				 }
           	}
           	else
			{
				document.getElementById("divErrorG").innerHTML = "<div class='alert alert-info' role='alert'>" + 
				"No se encontraron funciones </div>";
				document.getElementById("divNF").style.display ="block";
				window.scrollTo(0,0);
			}
        },
        error: function() {
            document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
	});
}


function archivoSeleccionadoNR (){

	limpiarCombo ("comboFuncionNR");
	let comboarchivosI = document.getElementsByClassName("comboArchivosNRclassname");
	
	let nombreArchivo = "";

	for (let i = 0; i< comboarchivosI.length; i++){
		if (comboarchivosI[i].selected) { 
			nombreArchivo = comboarchivosI[i].text;
		}
	}

	if (nombreArchivo !== "Seleccione un archivo" ){
		document.getElementById("comboFuncionNR").style.display="block";
		cargarComboFuncionInvocada(nombreArchivo);
	}

}

function limpiarCombo (idCombo){
	let select = document.getElementById(idCombo);
	for (let i = 0; i< select.length; i){
		select.remove(0);
	}

}

function verOpcionSeleccionado ()
{
	let id_naSeleccionado = document.getElementById("id_na").selected;
	let id_nfSeleccionado = document.getElementById("id_nf").selected;
	let id_nrSeleccionado = document.getElementById("id_nr").selected;

	cargarComboArchivos();
	cargarComboArchivosFuncion();
	cargarComboArchivosFuncionI();
	cargarComboFuncionInvocada();


	document.getElementById("divOkG").innerHTML = "";
	document.getElementById("divErrorG").innerHTML = "";
	
	if (id_naSeleccionado === true){
		document.getElementById("divNA").style.display = "block";
		document.getElementById("divNF").style.display = "none";
		document.getElementById("divNR").style.display = "none";
		//insertarArchivo();
	}
	else{
		if (id_nfSeleccionado === true){
			document.getElementById("divNA").style.display = "none";
			document.getElementById("divNF").style.display = "block";
			document.getElementById("divNR").style.display = "none";
		}
		else{
			document.getElementById("divNA").style.display = "none";
			document.getElementById("divNF").style.display = "none";
			document.getElementById("divNR").style.display = "block";
		}
	}
}

function insertarArchivo(){
	document.getElementById("divOkG").innerHTML = "";
	document.getElementById("divErrorG").innerHTML = "";
	
	let nombreArchivo = document.getElementById("nombreArchivoNA").value;
	if (nombreArchivo === ""){
		document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"Debe ingresar un nombre para el archivo</div>";
	}
	else{
		$.ajax({
	        url: urlServicio + 'Archivo?nombre='+nombreArchivo,
	        type: 'POST',
	        contentType: 'application/json',
	        crossDomain : false,
	        success: function() {
	        	document.getElementById("divOkG").innerHTML = "<div class='alert alert-success' role='alert'> "
	        	+ "Se agrego el archivo correctamente. </div>";
	        	window.scrollTo(0,0);
	        	document.getElementById("nombreArchivoNA").value = "";
	        },
	        error: function() {
	        	document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"No es posible completar la operación </div>";
				window.scrollTo(0,0);
	        }
		});
	}

	
}

function insertarFuncion(){
	document.getElementById("divOkG").innerHTML = "";
	document.getElementById("divErrorG").innerHTML = "";
	

	let combosArchivos = document.getElementsByClassName('comboArchivosNFclassname');
	var nombreArchivo = "";

	for (let i = 0; i< combosArchivos.length; i++){
		if (combosArchivos[i].selected) { 
			nombreArchivo = combosArchivos[i].text;
		}
	}
	
	var nombreFuncion = document.getElementById("nombreFuncionNF").value;
	var linea = document.getElementById("lineaNF").value;
	var columna = document.getElementById("coumnaNF").value;

	if (nombreArchivo === "" || nombreFuncion === "" || linea === 0 || columna === 0){
		document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"Debe completar todos los datos de la función </div>";
	}
	else{
		let funcion = new Funcion(nombreArchivo, nombreFuncion, linea, columna);
	
		$.ajax({
	        url: urlServicio + 'Funcion',
	        type: 'POST',
	        contentType: 'application/json',
	        crossDomain : false,
	        data: funcion.toJSON(),
	        success: function() {
	        	document.getElementById("divOkG").innerHTML = "<div class='alert alert-success' role='alert'> "
	        	+ "Se agrego la función correctamente. </div>";
	        	window.scrollTo(0,0);
	        	document.getElementById("lineaNF").value = 0;
				document.getElementById("coumnaNF").value = 0;
				document.getElementById("nombreFuncionNF").value = "";

	        },
	        error: function() {
	        	document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"No es posible completar la operación </div>";
				window.scrollTo(0,0);
	        }
		});
	}

}

function insertarRelacion(){
	document.getElementById("divOkG").innerHTML = "";
	document.getElementById("divErrorG").innerHTML = "";

	let combosArchivosQVaInvocar = document.getElementsByClassName('comboArchivosIclassname');
	var nombreArchivoI = "";

	for (let i = 0; i< combosArchivosQVaInvocar.length; i++){
		if (combosArchivosQVaInvocar[i].selected) { 
			nombreArchivoI = combosArchivosQVaInvocar[i].text;
		}
	}
	
	var linea = document.getElementById("lineaI").value;
	var columna = document.getElementById("coumnaI").value;

	//Combo archivo de la funcion a invocar 

	let comboArchivoAInvocar = document.getElementsByClassName('comboArchivosNRclassname');
	var nombreArchivoAI = "";

	for (let i = 0; i< comboArchivoAInvocar.length; i++){
		if (comboArchivoAInvocar[i].selected) { 
			nombreArchivoAI = comboArchivoAInvocar[i].text;
		}
	}

	//Combo funcion a invocar 

	let comboFuncionAInvocar = document.getElementsByClassName('comboFuncionNRclassname');
	var nombreFuncionAI = "";

	for (let i = 0; i< comboFuncionAInvocar.length; i++){
		if (comboFuncionAInvocar[i].selected) { 
			nombreFuncionAI = comboFuncionAInvocar[i].text;
		}
	}

	if (nombreFuncionAI === "" || nombreArchivoAI === "" || linea === 0 || columna === 0 || nombreArchivoI === ""){
		document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"Debe completar todos los datos </div>";
	}
	else{
		let relacion = new Relacion(nombreArchivoI, linea, columna);
	
		$.ajax({
	        url: urlServicio + 'Archivo?nombreFuncion=' + nombreFuncionAI + '&nombreArchivoFuncion=' + nombreArchivoAI,
	        type: 'POST',
	        contentType: 'application/json',
	        crossDomain : false,
	        data: relacion.toJSON(),
	        success: function() {
	        	document.getElementById("divOkG").innerHTML = "<div class='alert alert-success' role='alert'> "
	        	+ "Se agrego la invocación correctamente. </div>";
	        	window.scrollTo(0,0);
	        	document.getElementById("lineaI").value = 0;
				document.getElementById("coumnaI").value = 0;
	        },
	        error: function() {
	        	document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"No es posible completar la operación </div>";
				window.scrollTo(0,0);
	        }
		});
	}
}



function limpiarTabla(tabla){
	while (tabla.rows.length > 1){
		tabla.deleteRow(1);
	}
}


function cargarComboArchivosFuncionI (){
	let selectNRArchivos = document.getElementById("comboArchivosI");

	limpiarCombo("comboArchivosI");

	$.ajax({
        url: urlServicio + 'Archivo',
        type: 'GET',
        crossDomain : false,
        success: function(respuesta) {
           	if (respuesta !== null){
           		let archivosJSON = JSON.parse(respuesta);
                 		
           		for (let i =0; i < archivosJSON.length; i++) {
				  var option = document.createElement("option");
				  option.text = archivosJSON[i];
				  option.className  = "comboArchivosIclassname";
				  selectNRArchivos.add(option);
				 }
           	}
           	else
			{
				document.getElementById("divErrorG").innerHTML = "<div class='alert alert-info' role='alert'>" + 
				"No se encontraron archivos </div>";
				document.getElementById("divNF").style.display ="block";
				window.scrollTo(0,0);
			}
        },
        error: function() {
            document.getElementById("divErrorG").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
	});
}


function consultarInvocaciones(){
	document.getElementById("divOkG").innerHTML = "";
	document.getElementById("divErrorG").innerHTML = "";

	document.getElementById("divNA").style.display = "none";
	document.getElementById("divNF").style.display = "none";
	document.getElementById("divNR").style.display = "none";
	document.getElementById("comboGrafosAcciones").style.display = "none";
	document.getElementById("divConsultaInvocaciones").style.display = "block";
	document.getElementById("divConsultaIrDefinicion").style.display = "none";
	document.getElementById("divInvocacionesCons2").style.display = "none";


	//Cargar primer tabla de invocaciones archivo - funcion 

	$.ajax({
        url: urlServicio + 'Funcion',
        type: 'GET',
        crossDomain : false,
        success: function(respuesta) {
           	if (respuesta !== null){
           		$("tablaConsInvocaciones1").empty();
           		cargarTablaInvocaciones1(respuesta);
           	}
           	else
			{
				document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"No existe el usuario ingresado </div>";
				window.scrollTo(0,0);
			}
        },
        error: function() {
            document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
	});

	// *******************************************************


}

function consultaIrDefinicion(){
	document.getElementById("divOkG").innerHTML = "";
	document.getElementById("divErrorG").innerHTML = "";

	document.getElementById("divNA").style.display = "none";
	document.getElementById("divNF").style.display = "none";
	document.getElementById("divNR").style.display = "none";	
	document.getElementById("comboGrafosAcciones").style.display = "none";
	document.getElementById("divConsultaInvocaciones").style.display = "none";
	document.getElementById("divConsultaIrDefinicion").style.display = "block";
	document.getElementById("divfuncioninvocada").style.display = "none";


	//cargar tabla invocaciones

	$.ajax({ 
        url: urlServicio + 'Archivo?correccionesdeultimahora=1',
        type: 'GET',
        crossDomain : false,
        success: function(respuesta) {
           	if (respuesta !== null){
           		$("tablaConsInvocacionesCons2").empty();
           		
           		let  tablaA = document.getElementById("tablaConsInvocacionesCons2");

				limpiarTabla(tablaA);

				let invocacionesJson = JSON.parse(respuesta);

				for (var j = 0; j < invocacionesJson.length; j++) {
					let  fila = tablaA.insertRow();
				    var invAux = invocacionesJson[j];
				    
				    let celdas = ["", "", "", ""]
					for (var i = 0; i<4; i++)
					{
						celdas[i] = fila.insertCell();	
					}

					celdas[1].innerHTML= invAux.NombreArchivo;
					celdas[2].innerHTML= invAux.Linea;
					celdas[3].innerHTML= invAux.Columna;
					celdas[0].innerHTML = "<i class='fas fa-eye colorVerde' aria-hidden='true'></i>";

				}	


				$(".fa-eye").on("click", function(){
				    let tr = $(this).closest("tr");     
				    let tds = tr.find("td");   

				    let archivo = tds[1].textContent;
				    let linea = tds[2].textContent; 
					let columna = tds[3].textContent;    

					$.ajax({
				        url: urlServicio + 'Funcion?nombreArchivo=' + archivo + '&linea=' + linea + '&columna=' + columna,
				        type: 'GET',
				        crossDomain : false,
				        success: function(respuesta) {
				           	if (respuesta !== null){
				           		document.getElementById("divfuncioninvocada").style.display = "block";
				           		let defJson = JSON.parse(respuesta);
				           		document.getElementById("divfuncioninvocada").innerHTML='<div class="card" > <div class="card-header" style="background-color: #d9f8b4; color: #49a04b">'
				           		+ 'Definición de la función</div><ul class="list-group list-group-flush"><li class="list-group-item">'
				           		+ 'Función: ' + defJson[0].NombreFuncion + ' - Linea: ' + defJson[0].Linea + ' - Columna: ' + defJson[0].Columna + '</li> </ul></div>';
				           	}
				        },
				        error: function() {
				            document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
							"No es posible completar la operación </div>";
							window.scrollTo(0,0);
				        }
					});	

				 });
           	}
           	else
			{
				document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"No existen datos ingresados </div>";
				window.scrollTo(0,0);
			}
        },
        error: function() {
            document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
	});

}

function cargarTablaInvocaciones1(invocaciones)
{
	let  tablaA = document.getElementById("tablaConsInvocaciones1");

	limpiarTabla(tablaA);

	let invocacionesJson = JSON.parse(invocaciones);

	for (var j = 0; j < invocacionesJson.length; j++) {
		let  fila = tablaA.insertRow();
	    var invAux = invocacionesJson[j];
	    
	    let celdas = ["", "", "", "", ""]
		for (var i = 0; i<5; i++)
		{
			celdas[i] = fila.insertCell();	
		}

		celdas[1].innerHTML= invAux.NombreFuncion;
		celdas[2].innerHTML= invAux.NombreArchivo;
		celdas[3].innerHTML= invAux.Linea;
		celdas[4].innerHTML= invAux.Columna;
		celdas[0].innerHTML = "<i class='fas fa-eye colorVerde' aria-hidden='true'></i>";

	}

	$(".fa-eye").on("click", function(){
	    let tr = $(this).closest("tr");     
	    let tds = tr.find("td");   

	    let archivo = tds[2].textContent;
	    let funcion = tds[1].textContent;   

	    cargartablaInvocaciones2(archivo, funcion);       

	 });
}

function cargartablaInvocaciones2(archivo, funcion){
	let tablaI2 = document.getElementById("tablaConsInvocacionesTabla2");
	limpiarTabla(tablaI2);

	document.getElementById("divInvocacionesCons2").style.display="block";
	$.ajax({
		//Archivo?nombreFuncion=NuevaFuncion&nombreArchivoFuncion=NuevoArchivo
        url: urlServicio + 'Archivo?nombreFuncion=' + funcion + '&nombreArchivoFuncion=' + archivo,
        type: 'GET',
        crossDomain : false,
        success: function(respuesta) {
           	if (respuesta !== null){
           		$("tablaConsInvocacionesTabla2").empty();
           		
           		limpiarTabla(tablaI2);

				let invocacionesJson = JSON.parse(respuesta);

				for (var j = 0; j < invocacionesJson.length; j++) {
					let  fila = tablaI2.insertRow();
				    var invAux = invocacionesJson[j];
				    
				    let celdas = ["", "", ""]
					for (var i = 0; i<3; i++)
					{
						celdas[i] = fila.insertCell();	
					}

					celdas[0].innerHTML= invAux.NombreArchivo;
					celdas[1].innerHTML= invAux.Linea;
					celdas[2].innerHTML= invAux.Columna;
	
				}

           	}
           	else
			{
				document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
				"No existe datos ingresados </div>";
				window.scrollTo(0,0);
			}
        },
        error: function() {
            document.getElementById("divError").innerHTML = "<div class='alert alert-danger' role='alert'>" + 
			"No es posible completar la operación </div>";
			window.scrollTo(0,0);
        }
	});
}