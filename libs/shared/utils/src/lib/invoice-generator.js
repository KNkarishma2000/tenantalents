"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceAndUpload = generateInvoiceAndUpload;
const pdfkit_1 = __importDefault(require("pdfkit"));
const stream_1 = __importDefault(require("stream"));
const logger_1 = require("@shared/logger");
const minio_1 = require("@shared/minio");
async function generateInvoiceAndUpload(orderId) {
    const fileName = (0, minio_1.generateFilename)(`invoice-${orderId}`, '.pdf');
    const objectName = `${minio_1.MinioFolderPaths.INVOICE_PDFS}${fileName}`;
    const bucket = minio_1.MinioBuckets.INVOICE;
    const doc = new pdfkit_1.default();
    const bufferStream = new stream_1.default.PassThrough();
    const chunks = [];
    doc.pipe(bufferStream);
    doc.fontSize(20).text(`🧾 Invoice #${orderId}`, { underline: true });
    doc.moveDown().text('📦 Thank you for your order!');
    doc.end();
    bufferStream.on('data', (chunk) => chunks.push(chunk));
    return new Promise((resolve, reject) => {
        bufferStream.on('end', async () => {
            try {
                const finalBuffer = Buffer.concat(chunks);
                await (0, minio_1.uploadFileToMinIO)({
                    bucketName: bucket,
                    objectName,
                    content: finalBuffer,
                    contentType: 'application/pdf',
                });
                resolve(objectName);
            }
            catch (err) {
                logger_1.logger.error(`[invoice-generator] ❌ Failed to upload invoice:`, err);
                reject(err);
            }
        });
        bufferStream.on('error', (err) => {
            logger_1.logger.error(`[invoice-generator] ❌ Stream error:`, err);
            reject(err);
        });
    });
}
//# sourceMappingURL=invoice-generator.js.map