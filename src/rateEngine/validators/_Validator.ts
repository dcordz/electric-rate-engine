export interface Error {
  english: string,
  type: string,
  data: {},
}

interface LabeledError {
  label: string
  errors: Array<Error>
} 

abstract class Validator {
  protected _errors: Array<LabeledError> = [];

  reportErrors(): void {
    this._errors.forEach(({label, errors}) => {
      console.groupCollapsed(label);
      errors.forEach(({english}) => console.error(english));
      console.groupEnd();
    });
  }

  allErrors(): Array<Error> {
    return this._errors.map(({errors}) => errors).flat();
  }

  hasErrors(): Boolean {
    return this._errors.length > 0;
  }

  protected addError(label: string, errors: Array<Error>): void {
    this._errors.push({
      label,
      errors,
    });
  }

  abstract validate(): Validator;
}

export default Validator;
