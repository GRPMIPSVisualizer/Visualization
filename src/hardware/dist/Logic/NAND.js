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
exports.NAND = void 0;
var Logic_1 = __importDefault(require("./Logic"));
var NAND = /** @class */ (function (_super) {
    __extends(NAND, _super);
    function NAND(inputPin1, inputPin2) {
        var _this = _super.call(this, inputPin1, inputPin2) || this;
        _this.outpin = NAND.Nand(_this.pin1, _this.pin2);
        return _this;
    }
    NAND.Nand = function (inputPin1, inputPin2) {
        return Math.abs((inputPin1 & inputPin2) - 1);
    };
    return NAND;
}(Logic_1.default));
exports.NAND = NAND;
//# sourceMappingURL=NAND.js.map