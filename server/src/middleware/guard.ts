import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const guard = (req: Request, res: Response, 
    next: NextFunction) => {
        const token = req.headers['authorization'];

        if (!token) return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

        jwt.verify(token, process.env.APP_SECRET, (err, user: any) => {
            if (err) {
                // Will it actually log? this - can have wrong Context
                this.logger.error(err.toString());
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }

            req.body.user = user._doc;
            next();

        });
}