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
exports.XOR = void 0;
var Logic_1 = __importDefault(require("./Logic"));
var NAND_1 = require("./NAND");
var OR_1 = require("./OR");
var AND_1 = require("./AND");
/**
 * This is not Logic
 */
var XOR = /** @class */ (function (_super) {
    __extends(XOR, _super);
    function XOR(inputPin1, inputPin2) {
        var _this = _super.call(this, inputPin1, inputPin2) || this;
        _this.outpin = XOR.Xor(_this.pin1, _this.pin2);
        return _this;
    }
    XOR.Xor = function (inputPin1, inputPin2) {
        var nand = new NAND_1.NAND(inputPin1, inputPin2);
        var or = new OR_1.OR(inputPin1, inputPin2);
        return AND_1.AND.And(nand.outpin, or.outpin);
    };
    return XOR;
}(Logic_1.default));
exports.XOR = XOR;
//# sourceMappingURL=XOR.js.map