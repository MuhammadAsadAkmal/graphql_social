import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: any, context?: string) {
    console.log(`[${this.context || context || 'Application'}] ${message}`);
  }

  error(message: any, trace?: string, context?: string) {
    console.error(
      `[${this.context || context || 'Application'}] ERROR: ${message}`,
    );
    if (trace) {
      console.error(`Trace: ${trace}`);
    }
  }

  warn(message: any, context?: string) {
    console.warn(`[${this.context || context || 'Application'}] WARN: ${message}`);
  }

  debug(message: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(
        `[${this.context || context || 'Application'}] DEBUG: ${message}`,
      );
    }
  }

  verbose(message: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[${this.context || context || 'Application'}] VERBOSE: ${message}`,
      );
    }
  }
} 