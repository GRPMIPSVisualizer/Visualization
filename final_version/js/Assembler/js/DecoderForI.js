"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoderForI = void 0;
const Decoder_1 = require("./Decoder");
const InstructionI_1 = require("./InstructionI");
const MapForRegister_1 = require("./MapForRegister");
class DecoderForI extends Decoder_1.Decoder {
    constructor() {
        super();
    }
    static getDecoder() {
        return this.decoder;
    }
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
        else {
            let numLeftBracket = this.ins.split("(").length - 1;
            let numRightBracket = this.ins.split(")").length - 1;
            if (!(numLeftBracket == 1 && numRightBracket == 1)) {
                console.log("Error 1 in DecoderForI. Invalid instruction format.");
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
        if (!patt1.test(IMM.charAt(0)) && IMM.charAt(0) != "+" && IMM.charAt(0) != "-") {
            console.log("Error 2 in DecoderForI. Invalid immediate number.");
        }
        else if (+IMM <= -32768 || +IMM >= 32767) {
            console.log("Error 3 in DecoderForI. Invalid immediate number. Out of range.");
        }
        let operands = [operandRS, operandRT];
        let i;
        for (i = 0; i < operands.length; i++) {
            let operand = operands[i].substring(1, operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                console.log("Error 4 in DecoderForI. Invalid operand.");
                return false;
            }
            else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                break;
            }
            else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister_1.MapForRegister.getMap().has(operand)) {
                    let operandID = MapForRegister_1.MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        console.log("Error 5 in DecoderForI. Invalid operand.");
                        return false;
                    }
                    else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                }
            }
            else {
                console.log("Error 6 in DecoderForR. Invalid operand.");
                return false;
            }
        }
        return true;
    }
    decode() {
        let instruction = new InstructionI_1.InstructionI(this.ins);
        this.binIns = instruction.getBinIns();
    }
}
exports.DecoderForI = DecoderForI;
DecoderForI.decoder = new DecoderForI();
