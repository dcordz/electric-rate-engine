import Validator from './_Validator';

class GenericValidator extends Validator {
  validate() {
    return this;
  }
}

export default GenericValidator;
