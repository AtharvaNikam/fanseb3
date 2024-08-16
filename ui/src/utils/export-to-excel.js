// eslint-disable-next-line import/no-extraneous-dependencies
import { utils, writeFile } from 'xlsx';

export const excelExport = (dataFiltered, name) => {
  // Create a worksheet
  const ws = utils.json_to_sheet(dataFiltered);

  // Create a workbook with the worksheet
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');

  // Save the workbook as an Excel file
  writeFile(wb, `${name}.xlsx`);
};
