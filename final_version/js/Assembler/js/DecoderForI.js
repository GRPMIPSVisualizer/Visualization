"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoderForI = void 0;
const Decoder_1 = require("./Decoder");
const InstructionI_1 = require("./InstructionI");
const MapForRegister_1 = require("./MapForRegister");
/**
 * Class for validating and decoding the instruction of type-I into binary code.
 * It contains methods for validating instruction, decoding instruction and getting the error message.
 */
class DecoderForI extends Decoder_1.Decoder {
    /**
     * Constructor of DecoderForI.
     */
    constructor() {
        super();
        /**
         * The string for error message.
         */
        this.errMsg = "";
    }
    /**
     * Method for getting the decoder for instruction of type-I.
     * @returns the decoder to validate and decode instructions of type-I.
     */
    static getDecoder() {
        return this.decoder;
    }
    /**
     * Method for validating the instruction of type-I.
     * @returns true if the instruction is valid, otherwise false.
     */
    validate() {
        let posOfSpace = this.ins.indexOf(" ");
        let operandRS = "";
        let operandRT = "";
        let IMM = "";
        if (this.operator == "lui") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 2);
            operandRT = operands[0];
            IMM = operands[1];
        }
        else if (this.operator == "beq" || this.operator == "bne") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRS = operands[0];
            operandRT = operands[1];
            IMM = operands[2];
        }
        else if (this.operator == "addi" ||
            this.operator == "addiu" ||
            this.operator == "andi" ||
            this.operator == "ori" ||
            this.operator == "slti" ||
            this.operator == "sltiu") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRT = operands[0];
            operandRS = operands[1];
            IMM = operands[2];
        }
        else { // lbu, lhu, ll, lw, sb, sc, sh, sw
            let numLeftBracket = this.ins.split("(").length - 1;
            let numRightBracket = this.ins.split(")").length - 1;
            if (!(numLeftBracket == 1 && numRightBracket == 1)) {
                this.errMsg = this.errMsg + "Error 201: Invalid instruction format. -- " + this.getIns() + "\n";
                return false;
            }
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 2);
            let leftBracket = operands[1].indexOf("(");
            let rightBracket = operands[1].indexOf(")");
            operandRT = operands[0];
            operandRS = operands[1].substring(leftBracket + 1, rightBracket);
            IMM = operands[1].substring(0, leftBracket);
        }
        let patt1 = /^[0-9]+$/;
        let patt2 = /^[a-z0-9]+$/;
        let patt3 = /^(\-|\+)?\d+$/;
        if (!patt3.test(IMM)) {
            this.errMsg = this.errMsg + "Error 202: Invalid immediate number. -- " + this.getIns() + "\n";
            return false;
        }
        else if (+IMM <= -32768 || +IMM >= 32767) {
            this.errMsg = this.errMsg + "Error 203: Invalid immediate number. Out of range. -- " + this.getIns() + "\n";
            return false;
        }
        let operands = [operandRS, operandRT];
        let i;
        for (i = 0; i < operands.length; i++) {
            let operand = operands[i].substring(1, operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                this.errMsg = this.errMsg + "Error 204: Invalid operand. -- " + this.getIns() + "\n";
                return false;
            }
            else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                continue;
            }
            else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister_1.MapForRegister.getMap().has(operand)) {
                    let operandID = MapForRegister_1.MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        this.errMsg = this.errMsg + "Error 205: Invalid operand. -- " + this.getIns() + "\n";
                        return false;
                    }
                    else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                }
                else {
                    this.errMsg = this.errMsg + "Error 206: Invalid operand. -- " + this.getIns() + "\n";
                    return false;
                }
            }
            else {
                this.errMsg = this.errMsg + "Error 207: Invalid operand. -- " + this.getIns() + "\n";
                return false;
            }
        }
        return true;
    }
    /**
     * Method for decoding the instruction of type-I into binary code.
     * @returns void
     */
    decode() {
        let instruction = new InstructionI_1.InstructionI(this.ins);
        this.binIns = instruction.getBinIns();
    }
    /**
     * Method for getting the error message of invalid instruction of type-I.
     * @returns a string of error message.
     */
    getErrMsg() {
        return this.errMsg;
    }
}
exports.DecoderForI = DecoderForI;
/**
 * The decoder to validate and decode instructions of type-I.
 */
DecoderForI.decoder = new DecoderForI();
