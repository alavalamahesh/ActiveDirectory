const XLSX = require('xlsx');

//const workbook = XLSX.readFile('EmployeeMaster.xlsx');
const workbook = XLSX.readFile('AD_Schedular_AD_Schedular.xlsx');
const sheetName =workbook.SheetNames;
console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]))
//var dataPresent = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
//console.log("data present holding following values "+JSON.stringify(dataPresent))

//console.log("Name of emplyee "+dataPresent[1].Designation)


