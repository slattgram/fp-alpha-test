import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

interface ErrorConfig {
  key: 'required' | 'minlength' | 'email';
  message: string;
  formatValue?: (err: any) => string;
}
const ERROR_MESSAGES: ErrorConfig[] = [
  { key: 'required', message: `This field is required` },
  {
    key: 'minlength',
    message: `Minimum /placeholder/ characters`,
    formatValue: (error) => error.requiredLength,
  },
  { key: 'email', message: `Please enter a valid email address` },
];

function formatError(errors: ValidationErrors): string {
  const errorConfig = ERROR_MESSAGES.find((config) => errors[config.key]);
  if (errorConfig.formatValue) {
    return errorConfig.message.replace(
      '/placeholder/',
      errorConfig.formatValue(errors[errorConfig.key]),
    );
  }
  return errorConfig.message;
}

@Pipe({
  name: 'error',
})
export class ErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors): string {
    return errors ? formatError(errors) : '';
  }
}
