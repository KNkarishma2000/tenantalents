import { Router } from 'express';
import {
  manualInvoiceGeneration,
  getInvoiceDownloadUrl,
} from '../controllers/invoice.controller';

const router = Router();

router.post('/generate/:orderId', manualInvoiceGeneration);
router.get('/download/:invoiceId', getInvoiceDownloadUrl);

export default router;
