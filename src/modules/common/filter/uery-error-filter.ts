//https://stackoverflow.com/questions/48851140/how-to-handle-typeorm-entity-field-unique-validation-error-in-nestjs

import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const detail = exception.detail;
    if (typeof detail === 'string' && detail.includes('already exists')) {
      const messageStart = exception.table.split('_').join(' ') + ' with';
      throw new BadRequestException(
        exception.detail.replace('Key', messageStart),
      );
    }
    return super.catch(exception, host);
  }
}
