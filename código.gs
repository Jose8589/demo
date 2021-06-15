function doGet(e) {
var html = HtmlService.createTemplateFromFile('Index').evaluate()
  .setTitle('Registro Clientes Estetica').setSandboxMode(HtmlService.SandboxMode.NATIVE);
  return html;
}
var ur1='https://docs.google.com/spreadsheets/d/16dKMOjIExAAkcqiibmhmRUBqxGa5eUcC352DqPAFm0g/edit?usp=sharing';
  var ss = SpreadsheetApp.openByUrl(ur1);

function NuevoC([nombre, apellido, fecha, telefono, codigopostal, comoconoces]) {
  var webAppSheet = ss.getSheetByName("Base");
      webAppSheet.appendRow([new Date(), nombre, apellido, fecha, telefono, codigopostal, comoconoces]);
}

function getSpreadSheet(url, sheetName) {
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = ss.getSheetByName(sheetName);
  return sheet;
}

function receiveForm(menu) {
  var userId = menu.telefonoU;
  return searchData(userId);
}

function searchData(userId) {
  var myGoogleSheetName = "Base2";
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
