import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function exportJsonToXlsx<T extends object>(jsonData: T[], fileName = 'dados.xlsx') {
  if (jsonData.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Adiciona header (cabeçalho) baseado nas chaves do primeiro objeto
  const columns = Object.keys(jsonData[0]).map(key => ({
    header: key,
    key,
    width: 20, // largura padrão
  }));
  worksheet.columns = columns;

  // Adiciona as linhas
  jsonData.forEach(item => {
    worksheet.addRow(item);
  });

  // Gera o arquivo XLSX em buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Cria blob e dispara download
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, fileName);
}
