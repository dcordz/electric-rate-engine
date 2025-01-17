"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EnergyTimeOfUseValidator_1 = __importDefault(require("./validators/EnergyTimeOfUseValidator"));
var GenericValidator_1 = __importDefault(require("./validators/GenericValidator"));
var BlockedTiersValidator_1 = __importDefault(require("./validators/BlockedTiersValidator"));
var ValidatorFactory = /** @class */ (function () {
    function ValidatorFactory() {
    }
    ValidatorFactory.make = function (type, args, loadProfile) {
        switch (type) {
            case 'EnergyTimeOfUse':
                return new EnergyTimeOfUseValidator_1.default(args, loadProfile);
            case 'BlockedTiersInDays':
            case 'BlockedTiersInMonths':
                return new BlockedTiersValidator_1.default(args, loadProfile);
            default:
                return new GenericValidator_1.default();
        }
    };
    return ValidatorFactory;
}());
exports.default = ValidatorFactory;
