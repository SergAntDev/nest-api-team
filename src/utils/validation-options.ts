import {
  flatten,
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

const prependConstraintsWithParentProp = (
  error: ValidationError,
): ValidationError => {
  const constraints = {};
  for (const key in error.constraints) {
    constraints[error.property] = `${error.constraints[key]}`;
  }
  return {
    ...error,
    constraints,
  };
};

const prepareErrors = (error: ValidationError): ValidationError[] => {
  if (!(error.children && error.children.length)) {
    return [error];
  }
  const validationErrors = [];
  for (const item of error.children) {
    if (item.children && item.children.length) {
      validationErrors.push(...prepareErrors(item));
    }
    validationErrors.push(prependConstraintsWithParentProp(item));
  }
  return validationErrors;
};

const validationOptions: ValidationPipeOptions = {
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[] = []) => {
    const deepErrorsArray = flatten(errors.map((e) => prepareErrors(e))).filter(
      (e) => !!e.constraints,
    );

    return new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: deepErrorsArray.reduce((accumulator, currentValue) => {
          return {
            ...accumulator,
            [currentValue.property]: Object.values(
              currentValue.constraints,
            ).join(', '),
          };
        }, {}),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  },
};

export default validationOptions;
