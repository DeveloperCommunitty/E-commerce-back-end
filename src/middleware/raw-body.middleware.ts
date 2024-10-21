// src/middleware/raw-body.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { RequestWithRawBody } from './raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: RequestWithRawBody, res: Response, next: NextFunction) {
    // Define o parser raw para capturar o corpo da requisição como Buffer
    bodyParser.raw({ type: 'application/json' })(req, res, (err) => {
      if (err) {
        return next(err);
      }

      // Armazena o corpo bruto na requisição
      req.rawBody = req.body;
      next();
    });
  }
}
