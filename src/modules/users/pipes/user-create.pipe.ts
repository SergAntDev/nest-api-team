import { ValidationPipe } from 'src/shared/pipes/validation.pipe';

const PASSWORD_RULE = /^(?=.*?[0-9]).{8,}$/;

const PASSWORD_RULE_MESSAGE = 'Incorrect password';

const VALIDATION_PIPE = new ValidationPipe();

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
