import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly code?: string,
  ) {
    super(
      {
        message,
        code,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}

export class EntityNotFoundException extends CustomException {
  constructor(entity: string, id: string | number) {
    super(
      `${entity} with id ${id} not found`,
      HttpStatus.NOT_FOUND,
      'ENTITY_NOT_FOUND',
    );
  }
}

export class ValidationException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR');
  }
} 