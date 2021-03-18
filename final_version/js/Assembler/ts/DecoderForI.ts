import {Decoder} from "./Decoder";
import {InstructionI} from "./InstructionI";
import { MapForRegister } from "./MapForRegister";

/**
 * Class for validating and decoding the instruction of type-I into binary code.
 * It contains methods for validating instruction, decoding instruction and getting the error message.
 */
export class DecoderForI extends Decoder {
    /**
     * The string for error message.
     */
    private errMsg: string = "";
    /**
     * The decoder to validate and decode instructions of type-I.
     */
    private static decoder: DecoderForI = new DecoderForI();

    /**
     * Constructor of DecoderForI.
     */
    private constructor(){
        super();
    }

    /**
     * Method for getting the decoder for instruction of type-I.
     * @returns the decoder to validate and decode instructions of type-I.
     */
    public static getDecoder(): DecoderForI {
        return this.decoder;
    }

    /**
     * Method for validating the instruction of type-I.
     * @returns true if the instruction is valid, otherwise false.
     */
    public validate(): boolean {
        let posOfSpace: number = this.ins.indexOf(" ");
        let operandRS: string = "";
        let operandRT: string = "";
        let IMM: string = "";
        if (this.operator == "lui") {
            let operands: string[] = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 2);
            operandRT = operands[0];
            IMM = operands[1];
        } else if (this.operator == "beq" || this.operator == "bne") {
            let operands: string[] = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRS = operands[0];
            operandRT = operands[1];
            IMM = operands[2];
        } else if (this.operator == "addi" ||
                   this.operator == "addiu" ||
                   this.operator == "andi" ||
                   this.operator == "ori" ||
                   this.operator == "slti" ||
                   this.operator == "sltiu" ) {
            let operands: string[] = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRT = operands[0];
            operandRS = operands[1];
            IMM = operands[2];
        } else { // lbu, lhu, ll, lw, sb, sc, sh, sw
            let numLeftBracket = this.ins.split("(").length - 1;
            let numRightBracket = this.ins.split(")").length - 1;
            if (!(numLeftBracket == 1 && numRightBracket == 1)) {
                this.errMsg = this.errMsg + "Error 201: Invalid instruction format. -- " + this.getIns() + "\n";
                return false;
            }
            let operands: string[] = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 2);
            let leftBracket: number = operands[1].indexOf("(");
            let rightBracket: number = operands[1].indexOf(")");
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
        } else if (+IMM <= -32768 || +IMM >= 32767) {
            this.errMsg = this.errMsg + "Error 203: Invalid immediate number. Out of range. -- " + this.getIns() + "\n";
            return false;
        }
        

        let operands: Array<string> = [operandRS, operandRT];
        let i: number;
        for (i = 0; i < operands.length; i++) {
            let operand: string = operands[i].substring(1, operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                this.errMsg = this.errMsg + "Error 204: Invalid operand. -- " + this.getIns() + "\n";
                return false;
            } else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                continue;
            } else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister.getMap().has(operand)) {
                    let operandID: string | undefined = MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        this.errMsg = this.errMsg + "Error 205: Invalid operand. -- " + this.getIns() + "\n";
                        return false;
                    } else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                } else {
                    this.errMsg = this.errMsg + "Error 206: Invalid operand. -- " + this.getIns() + "\n";
                    return false;
                }
            } else {
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
    public decode(): void {
        let instruction: InstructionI = new InstructionI(this.ins);
        this.binIns = instruction.getBinIns();
    }

    /**
     * Method for getting the error message of invalid instruction of type-I.
     * @returns a string of error message.
     */
    public getErrMsg(): string {
        return this.errMsg;
    }
}