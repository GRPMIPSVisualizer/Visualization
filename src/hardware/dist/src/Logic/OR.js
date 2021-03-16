"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OR = void 0;
const Logic_1 = __importDefault(require("./Logic"));
const NAND_1 = require("./NAND");
/**
 * This is OR Logic
 */
class OR extends Logic_1.default {
    constructor(inputPin1, inputPin2) {
        super(inputPin1, inputPin2);
        this.outpin = OR.Or(this.pin1, this.pin2);
    }
    static Or(inputPin1, inputPin2) {
        let nand1 = new NAND_1.NAND(inputPin1, inputPin1);
        let nand2 = new NAND_1.NAND(inputPin2, inputPin2);
        return NAND_1.NAND.Nand(nand1.outpin, nand2.outpin);
    }
}
exports.OR = OR;
//# sourceMappingURL=OR.js.map