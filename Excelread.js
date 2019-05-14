const XLSX = require('xlsx');
function ec(r, c){
    return XLSX.utils.encode_cell({r:r,c:c});
  }
  function delete_row(ws, row_index){
    var variable = XLSX.utils.decode_range(ws["!ref"])
    for(var R = row_index; R < variable.e.r; ++R){
      for(var C = variable.s.c; C <= variable.e.c; ++C){
        ws[ec(R,C)] = ws[ec(R+1,C)];
      }
    }
    variable.e.r--
    ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
  }

  var filename = 'AD_Schedular_AD_Schedular1.xlsx'
  var workbook = XLSX.readFile(filename)
  var worksheet = workbook.Sheets[workbook.SheetNames[0]]
  delete_row(worksheet, 1)
  XLSX.writeFile(workbook, filename)