"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruction = void 0;
/**
 * Abstract Instruction class for translating the instruction into binary code.
 * It contains a constructor and a method to get the binary code.
 */
class Instruction {
    /**
     * Constructor of Instruction.
     * @param ins the instruction to be decoded.
     */
    constructor(ins) {
        this.ins = ins;
        this.binIns = "";
        let posOfSpace = ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }
    /**
 * Method for getting the instruction in binary format.
 * @returns a string of the instruction in binary format.
 */
    getBinIns() {
        return this.binIns;
    }
}
exports.Instruction = Instruction;
