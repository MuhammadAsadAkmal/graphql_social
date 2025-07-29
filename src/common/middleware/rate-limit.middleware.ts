import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests = new Map<string, { count: number; resetTime: number }>();

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 100;

    const clientRequests = this.requests.get(ip);

    if (!clientRequests || now > clientRequests.resetTime) {
      this.requests.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (clientRequests.count >= maxRequests) {
      return res.status(429).json({
        message: 'Too many requests, please try again later.',
        retryAfter: Math.ceil((clientRequests.resetTime - now) / 1000),
      });
    } else {
      clientRequests.count++;
    }

    next();
  }
} 