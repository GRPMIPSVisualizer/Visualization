"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAND = void 0;
const Logic_1 = __importDefault(require("./Logic"));
class NAND extends Logic_1.default {
    constructor(inputPin1, inputPin2) {
        super(inputPin1, inputPin2);
        this.outpin = NAND.Nand(this.pin1, this.pin2);
    }
    static Nand(inputPin1, inputPin2) {
        return Math.abs((inputPin1 & inputPin2) - 1);
    }
}
exports.NAND = NAND;
//# sourceMappingURL=NAND.js.map