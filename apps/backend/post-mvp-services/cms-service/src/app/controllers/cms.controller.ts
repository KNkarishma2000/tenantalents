import { Request, Response, NextFunction } from 'express';
import { cmsService } from '../services/cms.service';
import { sendSuccess } from '@shared/utils/lib/response';

export const createPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = await cmsService.createPage(req.body);
    sendSuccess(res, 'Page created', page);
  } catch (err) {
    next(err);
  }
};

export const getPageBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = await cmsService.getPageBySlug(req.params.slug);
    sendSuccess(res, 'Page details', page);
  } catch (err) {
    next(err);
  }
};

export const updatePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = await cmsService.updatePage(req.params.slug, req.body);
    sendSuccess(res, 'Page updated', page);
  } catch (err) {
    next(err);
  }
};

export const deletePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = await cmsService.deletePage(req.params.slug);
    sendSuccess(res, 'Page deleted', page);
  } catch (err) {
    next(err);
  }
};

export const listPages = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pages = await cmsService.listPages();
    sendSuccess(res, 'Pages list', pages);
  } catch (err) {
    next(err);
  }
};
