"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OR = void 0;
var Logic_1 = __importDefault(require("./Logic"));
var NAND_1 = require("./NAND");
/**
 * This is OR Logic
 */
var OR = /** @class */ (function (_super) {
    __extends(OR, _super);
    function OR(inputPin1, inputPin2) {
        var _this = _super.call(this, inputPin1, inputPin2) || this;
        _this.outpin = OR.Or(_this.pin1, _this.pin2);
        return _this;
    }
    OR.Or = function (inputPin1, inputPin2) {
        var nand1 = new NAND_1.NAND(inputPin1, inputPin1);
        var nand2 = new NAND_1.NAND(inputPin2, inputPin2);
        return NAND_1.NAND.Nand(nand1.outpin, nand2.outpin);
    };
    return OR;
}(Logic_1.default));
exports.OR = OR;
//# sourceMappingURL=OR.js.map