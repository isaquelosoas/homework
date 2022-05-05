import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtHelper } from '../helpers/jwt.helper';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
    }

    const [bearer, token] = req.headers.authorization.split(' ');
    const isAuthenticated = bearer === 'Bearer' && JwtHelper.verifyToken(token);
    if (!isAuthenticated) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
    } else {
      const isAdmin = JwtHelper.decodeToken(token).isAdmin;
      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: 'Unauthorized',
        });
      }
      next();
    }
  }
}
