// eslint-disable-next-line import/no-extraneous-dependencies
import csv from 'csvtojson';

export const excelImport = async (filePath) => {
  try {
    // Read the CSV file and convert it to JSON
    const jsonArray = await csv().fromFile(filePath);

    // Log the JSON data
    console.log(jsonArray);

    // Return the JSON data
    return jsonArray;
  } catch (error) {
    console.error('Error importing CSV:', error);
    throw error;
  }
};
