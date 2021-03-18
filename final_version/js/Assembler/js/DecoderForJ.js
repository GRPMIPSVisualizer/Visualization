"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoderForJ = void 0;
const Decoder_1 = require("./Decoder");
const InstructionJ_1 = require("./InstructionJ");
/**
 * Class for validating and decoding the instruction of type-J into binary code.
 * It contains methods for validating instruction, decoding instruction and getting the error message.
 */
class DecoderForJ extends Decoder_1.Decoder {
    /**
     * Constructor of DecoderForJ.
     */
    constructor() {
        super();
        /**
         * The string for error message.
         */
        this.errMsg = "";
    }
    /**
     * Method for getting the decoder for instruction of type-J.
     * @returns the decoder to validate and decode instructions of type-J.
     */
    static getDecoder() {
        return this.decoder;
    }
    /**
     * Method for validating the instruction of type-J.
     * @returns true if the instruction is valid, otherwise false.
     */
    validate() {
        let posOfSpace = this.ins.indexOf(" ");
        let operandADDRESS = this.ins.substring(posOfSpace + 1, this.ins.length);
        let patt1 = /^[0-9]+$/;
        if (!patt1.test(operandADDRESS)) {
            this.errMsg = this.errMsg + "Error 208: Invalid address. -- " + this.getIns() + "\n";
            return false;
        }
        return true;
    }
    /**
     * Method for decoding the instruction of type-J into binary code.
     * @returns void
     */
    decode() {
        let instruction = new InstructionJ_1.InstructionJ(this.ins);
        this.binIns = instruction.getBinIns();
    }
    /**
     * Method for getting the error message of invalid instruction of type-J.
     * @returns a string of error message.
     */
    getErrMsg() {
        return this.errMsg;
    }
}
exports.DecoderForJ = DecoderForJ;
/**
 * The decoder to validate and decode instructions of type-J.
 */
DecoderForJ.decoder = new DecoderForJ();
