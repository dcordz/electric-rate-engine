import { ValidatorError, LabeledError } from '../types';
declare abstract class Validator {
    protected _errors: Array<LabeledError>;
    reportErrors(): void;
    allErrors(): Array<ValidatorError>;
    hasErrors(): boolean;
    protected addError(label: string, errors: Array<ValidatorError>): void;
    abstract validate(): Validator;
}
export default Validator;
