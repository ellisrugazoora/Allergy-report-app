const excel = require('exceljs'); 
const workbook = new excel.Workbook();

function handlefile(e){
    let excelfile = e.target.files[0]
    let sheet;
    console.log("File name: " + e.target.files[0].name)
    workbook.xlsx.load(excelfile).then(() => {
        sheet = workbook.worksheets[0]

    })
}

export default handlefile