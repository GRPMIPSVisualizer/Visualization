import {decimalToBinary} from "./DecimalToBinary";
import {Instruction} from "./Instruction";
import {MapForI} from "./MapForI";

/**
 * Class for decoding the instruction of type-I into binary code.
 * It contains a constructor and a method to get the error message.
 */
export class InstructionI extends Instruction{

    /**
     * The register of the rs operand of the instruction.
     */
    private operandRS: string;
    /**
     * The register of the rt operand of the instruction.
     */
    private operandRT: string;
    /**
     * The immediate number of the instruction.
     */
    private operandIMM: string;
    /**
     * The 6 bits opcodes of the type-I instruction.
     */
    private op: string;
    /**
     * The 5 bits rscodes of the type-I instruction.
     */
    private rs: string;
    /**
     * The 5 bits rtcodes of the type-I instruction.
     */
    private rt: string;
    /**
     * The 16 bits code of the immediate number of the type-I instruction.
     */
    private imm: string;
    /**
     * The string of the error message.
     */
    private errMsg: string = "";

    /**
     * Constructor of InstructionI.
     * Translate the type-I instruction into binary format.
     * @param ins the type-I instruction to be translated. It should be in the form like "addi $8,$16,10".
     * There should be only one space between the operator and the first operand, no other space existing.
     * The register should be in dollar sign and a number.
     */
    constructor(ins: string) {
        super(ins);
        let opBin: string | undefined = MapForI.getMap().get(this.operator);
        if (opBin == undefined) {
            this.op = "XXXXXX";
            this.errMsg = this.errMsg + "Error 101: Failed to construct type-I instruction. -- " + ins + "\n";
        } else {
            this.op = opBin;
        }

        let posOfSpace: number = ins.indexOf(" ");
        if (this.operator == "lui") {
            let operands: string[] = ins.substring(posOfSpace + 1, ins.length).split(",", 2);
            this.operandRS = "";
            this.operandRT = operands[0];
            this.operandIMM = operands[1];
            this.rs = "00000";
            this.rt = decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = decimalToBinary(+this.operandIMM, 16);
        } else if (this.operator == "beq" || this.operator == "bne") {
            let operands: string[] = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = operands[0];
            this.operandRT = operands[1];
            this.operandIMM = operands[2];
            this.rs = decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = decimalToBinary(+this.operandIMM, 16);
        } else if (this.operator == "addi" ||
                   this.operator == "addiu" ||
                   this.operator == "andi" ||
                   this.operator == "ori" ||
                   this.operator == "slti" ||
                   this.operator == "sltiu" ) {
            let operands: string[] = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = operands[1];
            this.operandRT = operands[0];
            this.operandIMM = operands[2];
            this.rs = decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = decimalToBinary(+this.operandIMM, 16);
        } else {
            let operands: string[] = ins.substring(posOfSpace + 1, ins.length).split(",", 2);
            let leftBracket: number = operands[1].indexOf("(");
            let rightBracket: number = operands[1].indexOf(")");
            this.operandRS = operands[1].substring(leftBracket + 1, rightBracket);
            this.operandRT = operands[0];
            this.operandIMM = operands[1].substring(0, leftBracket);
            this.rs = decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = decimalToBinary(+this.operandIMM, 16);
        }
        this.binIns = this.op + this.rs + this.rt + this.imm;
    }

    /**
     * Method for getting the error message of type-I instruction.
     * @returns a string of error message.
     */
    public getErrMsg(): string {
        return this.errMsg;
    }
}