"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionI = void 0;
const DecimalToBinary_1 = require("./DecimalToBinary");
const Instruction_1 = require("./Instruction");
const MapForI_1 = require("./MapForI");
/**
 * Class for decoding the instruction of type-I into binary code.
 * It contains a constructor and a method to get the error message.
 */
class InstructionI extends Instruction_1.Instruction {
    /**
     * Constructor of InstructionI.
     * Translate the type-I instruction into binary format.
     * @param ins the type-I instruction to be translated. It should be in the form like "addi $8,$16,10".
     * There should be only one space between the operator and the first operand, no other space existing.
     * The register should be in dollar sign and a number.
     */
    constructor(ins) {
        super(ins);
        /**
         * The string of the error message.
         */
        this.errMsg = "";
        let opBin = MapForI_1.MapForI.getMap().get(this.operator);
        if (opBin == undefined) {
            this.op = "XXXXXX";
            this.errMsg = this.errMsg + "Error 101: Failed to construct type-I instruction. -- " + ins + "\n";
        }
        else {
            this.op = opBin;
        }
        let posOfSpace = ins.indexOf(" ");
        if (this.operator == "lui") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 2);
            this.operandRS = "";
            this.operandRT = operands[0];
            this.operandIMM = operands[1];
            this.rs = "00000";
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        else if (this.operator == "beq" || this.operator == "bne") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = operands[0];
            this.operandRT = operands[1];
            this.operandIMM = operands[2];
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        else if (this.operator == "addi" ||
            this.operator == "addiu" ||
            this.operator == "andi" ||
            this.operator == "ori" ||
            this.operator == "slti" ||
            this.operator == "sltiu") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = operands[1];
            this.operandRT = operands[0];
            this.operandIMM = operands[2];
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        else {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 2);
            let leftBracket = operands[1].indexOf("(");
            let rightBracket = operands[1].indexOf(")");
            this.operandRS = operands[1].substring(leftBracket + 1, rightBracket);
            this.operandRT = operands[0];
            this.operandIMM = operands[1].substring(0, leftBracket);
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        this.binIns = this.op + this.rs + this.rt + this.imm;
    }
    /**
     * Method for getting the error message of type-I instruction.
     * @returns a string of error message.
     */
    getErrMsg() {
        return this.errMsg;
    }
}
exports.InstructionI = InstructionI;
