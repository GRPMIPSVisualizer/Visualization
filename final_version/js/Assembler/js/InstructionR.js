"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionR = void 0;
const DecimalToBinary_1 = require("./DecimalToBinary");
const Instruction_1 = require("./Instruction");
const MapForR_1 = require("./MapForR");
class InstructionR extends Instruction_1.Instruction {
    //The ins should be in the form like "add $8,$16,$17".
    //There should be only one space between the operator and the first operand, no other space existing.
    //The register should be in dollar sign and a number.
    constructor(ins) {
        super(ins);
        this.op = "000000";
        let functBin = MapForR_1.MapForR.getMap().get(this.operator);
        if (functBin == undefined) {
            this.funct = "XXXXXX";
            console.log("Error in constructor for InstructionR.");
        }
        else {
            this.funct = functBin;
        }
        let posOfSpace = ins.indexOf(" ");
        if (this.operator == "jr") {
            this.operandRS = ins.substring(posOfSpace + 1, ins.length);
            this.operandRD = "";
            this.operandRT = "";
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = "00000";
            this.rd = "00000";
            this.shamt = "00000";
        }
        else if (this.operator == "sll" || this.operator == "srl") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = "";
            this.operandRD = operands[0];
            this.operandRT = operands[1];
            this.shamt = DecimalToBinary_1.decimalToBinary(+operands[2], 5);
            this.rs = "00000";
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.rd = DecimalToBinary_1.decimalToBinary(+this.operandRD.substring(1), 5);
        }
        else {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRD = operands[0];
            this.operandRS = operands[1];
            this.operandRT = operands[2];
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.rd = DecimalToBinary_1.decimalToBinary(+this.operandRD.substring(1), 5);
            this.shamt = "00000";
        }
        this.binIns = this.op + this.rs + this.rt + this.rd + this.shamt + this.funct;
    }
}
exports.InstructionR = InstructionR;
