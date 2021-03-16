"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT = void 0;
const Logic_1 = __importDefault(require("./Logic"));
const NAND_1 = require("./NAND");
/**
 * This is NOT Logic
 */
class NOT extends Logic_1.default {
    constructor(inputPin1) {
        super(inputPin1, 0);
        this.outpin = NOT.Not(this.pin1);
    }
    static Not(inputPin1) {
        let nand = new NAND_1.NAND(inputPin1, inputPin1);
        return nand.outpin;
    }
}
exports.NOT = NOT;
//# sourceMappingURL=NOT.js.map