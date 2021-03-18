"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = void 0;
/**
 * Abstract Decoder class for validating the instruction and decoding the instruction into binary code.
 * It contains methods for setting and getting the instruction, getting the binary code, validate instruction and decode instruction.
 */
class Decoder {
    constructor() {
        /**
         * The instruction to be decoded.
         */
        this.ins = "";
        /**
         * The operator of the instruction.
         */
        this.operator = "";
        /**
         * The binary code of the instruction.
         */
        this.binIns = "";
    }
    /**
     * Set the strings called ins and operator in the class Decoder.
     * @param ins the instruction to be decoded.
     * @returns void
     */
    setIns(ins) {
        this.ins = ins;
        var posOfSpace = this.ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }
    /**
     * Method for getting the instruction.
     * @returns a string of the instruction.
     */
    getIns() {
        return this.ins;
    }
    /**
     * Method for getting the binary code of the instruction.
     * @returns a string of the binary code of the instruction.
     */
    getBinIns() {
        return this.binIns;
    }
}
exports.Decoder = Decoder;
