"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AND = void 0;
const Logic_1 = __importDefault(require("./Logic"));
const NAND_1 = require("./NAND");
class AND extends Logic_1.default {
    constructor(inputPin1, inputPin2) {
        super(inputPin1, inputPin2);
        this.outpin = AND.And(this.pin1, this.pin2);
    }
    static And(inputPin1, inputPin2) {
        let nand = new NAND_1.NAND(inputPin1, inputPin2);
        return NAND_1.NAND.Nand(nand.outpin, nand.outpin);
    }
}
exports.AND = AND;
//# sourceMappingURL=AND.js.map