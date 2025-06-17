// Keep this if you’re not using ESM
import fs from 'fs';
import path from 'path';
import readXlsxFile from 'read-excel-file/node';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';


export const generatePayroll = async (req, res) => {
  try {
    const xlsxPath = path.join('public/upload', 'payroll.xlsx');
    const ghostPath = path.join('public/image', 'cygnonex_ghost.png');
    const outputDir = path.join('output');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const rows = await readXlsxFile(xlsxPath);
    const headers = rows[0];
    const dataRows = rows.slice(1);
    const ghostImageBytes = fs.readFileSync(ghostPath);

    for (const row of dataRows) {
      const rowData = {};
      headers.forEach((header, idx) => {
        rowData[header] = row[idx];
      });

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4

      const ghostImage = await pdfDoc.embedPng(ghostImageBytes);
      page.drawImage(ghostImage, { x: 0, y: 0, width: 595, height: 842 });

      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const drawText = (text, x, y, size = 12) => {
        if (text !== undefined && text !== null) {
          page.drawText(String(text), {
            x,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
          });
        }
      };



      // Pay Period:
      drawText('Pay Period:', 40, 650);
      drawText(rowData['Pay Period'], 100, 650);

      //Effective Working Days
      drawText('Effective Working Days:', 40, 625);
      drawText(rowData['Effective Working Days'], 165, 625);

      //Employee Name
      drawText('Employee Name:', 40, 600);
      drawText(rowData['Employee Name'], 130, 600);




      //Designation
      drawText('Designation:', 300, 650);
      drawText(rowData['Designation'], 365, 650);

      //Department
      drawText('Department:', 300, 625);
      drawText(rowData['Department'], 365, 625);




      //Earning1 Amount1     
      drawText(rowData['Earning1'], 50, 530);
      drawText(rowData['Amount1'], 510, 530);

      //Earning2 Amount2     
      drawText(rowData['Earning2'], 50, 511);
      drawText(rowData['Amount2'], 510, 511);

      //Earning3 Amount3     
      drawText(rowData['Earning3'], 50, 494);
      drawText(rowData['Amount3'], 510, 494);

      //Earning4 Amount4     
      drawText(rowData['Earning4'], 50, 475);
      drawText(rowData['Amount4'], 510, 475);

      //Earning5 Amount5     
      drawText(rowData['Earning5'], 50, 459);
      drawText(rowData['Amount5'], 510, 459);




      //Total   
      drawText(rowData['Total'], 510, 442);




      //Deduction1 Amount1     
      drawText(rowData['Deduction1'], 50, 380);
      drawText(rowData['Amount1'], 510, 380);

      //Deduction2 Amount2     
      drawText(rowData['Deduction2'], 50, 362);
      drawText(rowData['Amount2'], 510, 362);

      //Deduction3 Amount3     
      drawText(rowData['Deduction3'], 50, 345);
      drawText(rowData['Amount3'], 510, 345);

      //Deduction4 Amount4     
      drawText(rowData['Deduction4'], 50, 327);
      drawText(rowData['Amount4'], 510, 327);





      
     //Total Deductions   
      drawText(rowData['Total Deductions'], 510, 308);

      //Net Pay   
      drawText(rowData['Net Pay'], 510, 290);




      const fileName = `${rowData['Employee Name']?.replace(/\s+/g, '_') || 'employee'}.pdf`;
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(path.join(outputDir, fileName), pdfBytes);
    }

    res.status(200).json({
      success: true,
      message: 'Payroll PDFs generated successfully',
      count: dataRows.length,
    });
  } catch (error) {
    console.error('Error generating payroll:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate payroll',
      error: error.message,
    });
  }
};
