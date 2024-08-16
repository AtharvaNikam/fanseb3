export const transformProductsInput = (inputData, statusInput) => {
  const outputData = [];

  if (inputData.length < 2) {
    // Input data must have at least header and one data row
    return outputData;
  }

  const headers = inputData[0];
  for (let i = 1; i < inputData.length; i += 1) {
    const data = inputData[i];
    // Check if the data row has the expected length
    if (data.length !== headers.length) {
      // Skip this data row if its length doesn't match headers length
      // eslint-disable-next-line no-continue
      continue;
    }
    outputData.push({
      name: data[headers.indexOf('name')],
      description: data[headers.indexOf('description')],
      price: parseFloat(data[headers.indexOf('price')]),
      sale_price: parseFloat(data[headers.indexOf('sale_price')]),
      min_price: parseFloat(data[headers.indexOf('min_price')]),
      max_price: parseFloat(data[headers.indexOf('max_price')]),
      sku: data[headers.indexOf('sku')],
      quantity: parseInt(data[headers.indexOf('quantity')], 10),
      inStock: Boolean(parseInt(data[headers.indexOf('inStock')], 10)),
      isTaxable: Boolean(parseInt(data[headers.indexOf('isTaxable')], 10)),
      status: statusInput,
      product_type: data[headers.indexOf('product_type')],
      unit: data[headers.indexOf('unit')],
      height: parseFloat(data[headers.indexOf('height')]).toString(),
      width: parseFloat(data[headers.indexOf('width')]).toString(),
      length: parseFloat(data[headers.indexOf('length')]).toString(),
    });
  }

  return outputData;
};
