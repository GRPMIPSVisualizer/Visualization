"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XOR = void 0;
const Logic_1 = __importDefault(require("./Logic"));
const NAND_1 = require("./NAND");
const OR_1 = require("./OR");
const AND_1 = require("./AND");
/**
 * This is not Logic
 */
class XOR extends Logic_1.default {
    constructor(inputPin1, inputPin2) {
        super(inputPin1, inputPin2);
        this.outpin = XOR.Xor(this.pin1, this.pin2);
    }
    static Xor(inputPin1, inputPin2) {
        let nand = new NAND_1.NAND(inputPin1, inputPin2);
        let or = new OR_1.OR(inputPin1, inputPin2);
        return AND_1.AND.And(nand.outpin, or.outpin);
    }
}
exports.XOR = XOR;
//# sourceMappingURL=XOR.js.map