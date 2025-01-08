import Validator from './_Validator.ts';

class GenericValidator extends Validator {
  validate() {
    return this;
  }
}

export default GenericValidator;
