function doGet(e) {
var html = HtmlService.createTemplateFromFile('Index').evaluate()
  .setTitle('Programa de lealtad TIERNITOS').setSandboxMode(HtmlService.SandboxMode.NATIVE);
  return html;
}
var ur1='https://docs.google.com/spreadsheets/d/1CZkBDbTVp6jkgm7scBdXijONCSGVILVfTJLFXeoHKz8/edit?usp=sharing';


  var ss = SpreadsheetApp.openByUrl(ur1);

function NuevoC([nombre, apellido, fecha, telefono, codigopostal, instagram, facebook]) {

  var webAppSheet = ss.getSheetByName("Base");
      webAppSheet.appendRow([new Date(), nombre, apellido, fecha, telefono, codigopostal, instagram, facebook]);
}
function AReferido([telefono1, codigoR, montoR]) {

  var webAppSheet = ss.getSheetByName("Referidos");
      webAppSheet.appendRow([codigoR, telefono1, montoR, new Date()]);
}
function ALealtad([numcompuesto, montoL]) {

  var webAppSheet = ss.getSheetByName("Lealtad");
      webAppSheet.appendRow([numcompuesto, new Date(), montoL]);
}




function receiveForm(menu) {
  // Obtenemos el valor del campo userId
  var userId = menu.telefonoU;

  // Llama a la funcion para buscar datos, pasandole el parametro
  return searchData(userId);
}

/**
 * Busca en la hoja de calculos los datos del usuario
 * @param userId ID del usuario que queremos buscar
 */
function searchData(userId) {
  var myGoogleSheetName = "Base2";
  // Obtiene la hoja de calculos
  var sheet = getSpreadSheet(ur1, myGoogleSheetName);

  // Recorre todas las filas buscando la coincidencia del userID con el valor
  // de la columna 0
  var rowsResult = sheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .getValues()
    .filter(function (row) {
      return row[0] === userId;
    });

  // Obtiene el resultado
  var firstRow = rowsResult[0];

  // Parsea cada uno de los campos
  var user = {
    id: firstRow[0],
    nombrec: firstRow[2],
    telefonob:firstRow[5],
    creferidos: firstRow[9],
     tiernipuntos: firstRow[16],
  };

  // Serializa el OBJ para enviar la respuesta al frontend
  var result = JSON.stringify(user);
  return result;
}


function receiveForm1(menu) {
  var userId = menu.telefonoU;
  return searchData1(userId);
}
function searchData1(userId) {
  var myGoogleSheetName = "busquedaR1";
  var sheet = getSpreadSheet(ur1, myGoogleSheetName);
  var rowsResult = sheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .getValues()
    .filter(function (row) {
      return row[0] === userId;
    });
  var firstRow = rowsResult[0];
  var user = {
  id: firstRow[0],
    nombrec: firstRow[2],
    telefonob:firstRow[5],
    creferidos: firstRow[9],
     tiernipuntos: firstRow[16],
  };
  var result = JSON.stringify(user);
  return result;
}

function receiveForm3(menu) {
  var userId = menu.codigoV;
  return searchData3(userId);
}
function searchData3(userId) {
  var myGoogleSheetName = "prueba";
  var sheet = getSpreadSheet(ur1, myGoogleSheetName);
  var rowsResult = sheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .getValues()
    .filter(function (row) {
      return row[0] === userId;
    });
  var firstRow = rowsResult[0];
  var user = {
  id: firstRow[0],
    nombrec: firstRow[2],
    telefonob:firstRow[5],
    creferidos: firstRow[9],
     tiernipuntos: firstRow[16],
  };
  var result = JSON.stringify(user);
  return result;
}



/**
 * Obtiene una hoja de calculo según la URL y nombre de la hoja especificados
 */
function getSpreadSheet(url, sheetName) {
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = ss.getSheetByName(sheetName);
  return sheet;
}
