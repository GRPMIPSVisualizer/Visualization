"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoderForR = void 0;
const Decoder_1 = require("./Decoder");
const InstructionR_1 = require("./InstructionR");
const MapForRegister_1 = require("./MapForRegister");
/**
 * Class for validating and decoding the instruction of type-R into binary code.
 * It contains methods for validating instruction, decoding instruction and getting the error message.
 */
class DecoderForR extends Decoder_1.Decoder {
    /**
     * Constructor of DecoderForR.
     */
    constructor() {
        super();
        /**
         * The string for error message.
         */
        this.errMsg = "";
    }
    /**
     * Method for getting the decoder for instruction of type-R.
     * @returns the decoder to validate and decode instructions of type-R.
     */
    static getDecoder() {
        return this.decoder;
    }
    /**
     * Method for validating the instruction of type-R.
     * @returns true if the instruction is valid, otherwise false.
     */
    validate() {
        let posOfSpace = this.ins.indexOf(" ");
        let operandRS = "";
        let operandRT = "";
        let operandRD = "";
        let SHAMT = "";
        if (this.operator == "jr") {
            operandRS = this.ins.substring(posOfSpace + 1, this.ins.length);
        }
        else if (this.operator == "sll" || this.operator == "srl" || this.operator == "sra") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRD = operands[0];
            operandRT = operands[1];
            SHAMT = operands[2];
        }
        else {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRD = operands[0];
            operandRS = operands[1];
            operandRT = operands[2];
        }
        let patt1 = /^[0-9]+$/;
        let patt2 = /^[a-z0-9]+$/;
        let patt3 = /^(\+)?\d+$/;
        if ((!(SHAMT == "" || patt3.test(SHAMT))) || (patt3.test(SHAMT) && +SHAMT >= 32)) {
            this.errMsg = this.errMsg + "Error 209: Invalid shift amount. -- " + this.getIns() + "\n";
            return false;
        }
        let operands = [operandRS, operandRT, operandRD];
        let i;
        for (i = 0; i < operands.length; i++) {
            let operand = operands[i].substring(1, operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                this.errMsg = this.errMsg + "Error 210: Invalid operand. -- " + this.getIns() + "\n";
                return false;
            }
            else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                continue;
            }
            else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister_1.MapForRegister.getMap().has(operand)) {
                    let operandID = MapForRegister_1.MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        this.errMsg = this.errMsg + "Error 211: Invalid operand. -- " + this.getIns() + "\n";
                        return false;
                    }
                    else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                }
                else {
                    this.errMsg = this.errMsg + "Error 212: Invalid operand. -- " + this.getIns() + "\n";
                    return false;
                }
            }
            else {
                this.errMsg = this.errMsg + "Error 213: Invalid operand. -- " + this.getIns() + "\n";
                return false;
            }
        }
        return true;
    }
    /**
     * Method for decoding the instruction of type-R into binary code.
     * @returns void
     */
    decode() {
        let instruction = new InstructionR_1.InstructionR(this.ins);
        this.binIns = instruction.getBinIns();
    }
    /**
     * Method for getting the error message of invalid instruction of type-R.
     * @returns a string of error message.
     */
    getErrMsg() {
        return this.errMsg;
    }
}
exports.DecoderForR = DecoderForR;
/**
 * The decoder to validate and decode instructions of type-R.
 */
DecoderForR.decoder = new DecoderForR();
