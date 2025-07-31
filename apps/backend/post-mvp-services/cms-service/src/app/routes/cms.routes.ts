import { Router } from 'express';
import {
  createPage,
  getPageBySlug,
  updatePage,
  deletePage,
  listPages,
} from '../controllers/cms.controller';

const router = Router();

router.post('/', createPage);
router.get('/', listPages);
router.get('/:slug', getPageBySlug);
router.put('/:slug', updatePage);
router.delete('/:slug', deletePage);

export default router;
