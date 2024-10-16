import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            res.status( 500).json({
                success: false,
                message: error.message
            });
        }
    };

export { asyncHandler };