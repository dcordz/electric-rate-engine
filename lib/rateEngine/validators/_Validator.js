"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = /** @class */ (function () {
    function Validator() {
        this._errors = [];
    }
    Validator.prototype.reportErrors = function () {
        this._errors.forEach(function (_a) {
            var label = _a.label, errors = _a.errors;
            console.groupCollapsed(label);
            errors.forEach(function (_a) {
                var english = _a.english;
                return console.error(english);
            });
            console.groupEnd();
        });
    };
    Validator.prototype.allErrors = function () {
        return this._errors.map(function (_a) {
            var errors = _a.errors;
            return errors;
        }).flat();
    };
    Validator.prototype.hasErrors = function () {
        return this._errors.length > 0;
    };
    Validator.prototype.addError = function (label, errors) {
        this._errors.push({
            label: label,
            errors: errors,
        });
    };
    return Validator;
}());
exports.default = Validator;
