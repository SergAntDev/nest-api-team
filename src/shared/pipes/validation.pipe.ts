import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: this.buildError(errors),
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return value;
  }

  private buildError(errors: any) {
    const result = {};
    errors.forEach((el) => {
      const prop = el.property;
      Object.entries(el.constraints).forEach((constraint) => {
        result[prop] = `${constraint[1]}`;
      });
    });
    return result;
  }

  private toValidate(metatype: Type<any> | undefined): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
