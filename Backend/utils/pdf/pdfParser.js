import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const parsePDF = async (dataBuffer) => {
  try {
    const data = await pdfParse(dataBuffer);
    return data;
  } catch (error) {
    throw new Error(`Error parsing PDF: ${error.message}`);
  }
};