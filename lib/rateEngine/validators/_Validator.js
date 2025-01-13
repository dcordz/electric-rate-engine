class Validator {
    constructor() {
        this._errors = [];
    }
    reportErrors() {
        this._errors.forEach(({ label, errors }) => {
            console.groupCollapsed(label);
            errors.forEach(({ english }) => console.error(english));
            console.groupEnd();
        });
    }
    allErrors() {
        return this._errors.map(({ errors }) => errors).flat();
    }
    hasErrors() {
        return this._errors.length > 0;
    }
    addError(label, errors) {
        this._errors.push({
            label,
            errors,
        });
    }
}
export default Validator;
