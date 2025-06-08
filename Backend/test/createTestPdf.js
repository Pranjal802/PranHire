import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, in this case to a file
doc.pipe(fs.createWriteStream(path.join(__dirname, 'data', '05-versions-space.pdf')));

// Add some content to the PDF
doc.fontSize(25).text('Test Resume', { align: 'center' });

doc.moveDown();
doc.fontSize(12).text('John Doe', { align: 'center' });
doc.fontSize(10).text('Software Engineer', { align: 'center' });
doc.text('john.doe@email.com | (555) 123-4567', { align: 'center' });

doc.moveDown();
doc.fontSize(14).text('Professional Summary');
doc.fontSize(10).text('Experienced software engineer with expertise in full-stack development, cloud computing, and agile methodologies. Proven track record of delivering high-quality solutions and leading successful development teams.');

doc.moveDown();
doc.fontSize(14).text('Skills');
doc.fontSize(10).text('• Programming Languages: JavaScript, Python, Java\n• Web Technologies: React, Node.js, Express\n• Database: MongoDB, PostgreSQL\n• Tools: Git, Docker, AWS');

doc.moveDown();
doc.fontSize(14).text('Experience');
doc.fontSize(12).text('Senior Software Engineer - Tech Corp');
doc.fontSize(10).text('2020 - Present');
doc.fontSize(10).text('• Led development of microservices architecture\n• Implemented CI/CD pipeline\n• Mentored junior developers');

// Finalize PDF file
doc.end(); 