interface Error {
  label: string
  errors: Array<string>
} 

abstract class Validator {
  protected _errors: Array<Error> = [];

  reportErrors(): void {
    this._errors.forEach(({label, errors}) => {
      console.groupCollapsed(label);
      errors.forEach(error => console.error(error));
      console.groupEnd();
    }); 
  }

  hasErrors(): Boolean {
    return this._errors.length > 0;
  }

  protected addError(label: string, errors: Array<string>): void {
    this._errors.push({
      label,
      errors,
    });
  }

  abstract validate(): Validator;
}

export default Validator;
