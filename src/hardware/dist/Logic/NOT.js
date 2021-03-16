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
exports.NOT = void 0;
var Logic_1 = __importDefault(require("./Logic"));
var NAND_1 = require("./NAND");
/**
 * This is NOT Logic
 */
var NOT = /** @class */ (function (_super) {
    __extends(NOT, _super);
    function NOT(inputPin1) {
        var _this = _super.call(this, inputPin1, 0) || this;
        _this.outpin = NOT.Not(_this.pin1);
        return _this;
    }
    NOT.Not = function (inputPin1) {
        var nand = new NAND_1.NAND(inputPin1, inputPin1);
        return nand.outpin;
    };
    return NOT;
}(Logic_1.default));
exports.NOT = NOT;
//# sourceMappingURL=NOT.js.map