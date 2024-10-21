import { Request } from 'express';

// Extende o tipo Request para incluir o rawBody
export interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}
