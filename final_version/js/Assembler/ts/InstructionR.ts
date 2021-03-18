import {decimalToBinary} from "./DecimalToBinary";
import {Instruction} from "./Instruction";
import {MapForR} from "./MapForR";

/**
 * Class for decoding the instruction of type-R into binary code.
 * It contains a constructor and a method to get the error message.
 */
export class InstructionR extends Instruction{

    /**
     * The register of the rs operand of the instruction.
     */
    private operandRS: string;
    /**
     * The register of the rt operand of the instruction.
     */
    private operandRT: string;
    /**
     * The register of the rd operand of the instruction.
     */
    private operandRD: string;
    /**
     * The 6 bits opcodes of the type-R instruction.
     */
    private op: string;
    /**
     * The 5 bits rscodes of the type-R instruction.
     */
    private rs: string;
    /**
     * The 5 bits rtcodes of the type-R instruction.
     */
    private rt: string;
    /**
     * The 5 bits rdcodes of the type-R instruction.
     */
    private rd: string;
    /**
     * The 5 bits shamt codes of the type-R instruction.
     */
    private shamt: string;
    /**
     * The 6 bits funct codes of the type-R instruction.
     */
    private funct: string;
    /**
     * The string of the error message.
     */
    private errMsg: string = "";

    /**
     * Constructor of InstructionR.
     * Translate the type-R instruction into binary format.
     * @param ins the type-R instruction to be translated. It should be in the form like "add $8,$16,$17".
     * There should be only one space between the operator and the first operand, no other space existing.
     * The register should be in dollar sign and a number.
     */
    constructor(ins: string) {
        super(ins);
        this.op = "000000";
        let functBin: string | undefined = MapForR.getMap().get(this.operator);
        if (functBin == undefined) {
            this.funct = "XXXXXX";
            this.errMsg = this.errMsg + "Error 103: Failed to construct type-R instruction. -- " + ins + "\n";
        } else {
            this.funct = functBin;
        }

        let posOfSpace: number = ins.indexOf(" ");
        if (this.operator == "jr") {
            this.operandRS = ins.substring(posOfSpace + 1, ins.length);
            this.operandRD = "";
            this.operandRT = "";
            this.rs = decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = "00000";
            this.rd = "00000";
            this.shamt = "00000";
        } else if (this.operator == "sll" || this.operator == "srl" || this.operator == "sra") {
            let operands: string[] = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = "";
            this.operandRD = operands[0];
            this.operandRT = operands[1];
            this.shamt = decimalToBinary(+operands[2], 5);
            this.rs = "00000";
            this.rt = decimalToBinary(+this.operandRT.substring(1), 5);
            this.rd = decimalToBinary(+this.operandRD.substring(1), 5);
        } else {
            let operands: string[] = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRD = operands[0];
            this.operandRS = operands[1];
            this.operandRT = operands[2]; 
            this.rs = decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = decimalToBinary(+this.operandRT.substring(1), 5);
            this.rd = decimalToBinary(+this.operandRD.substring(1), 5);
            this.shamt = "00000";
        }
        this.binIns = this.op + this.rs + this.rt + this.rd + this.shamt + this.funct;
    }

    /**
     * Method for getting the error message of type-R instruction.
     * @returns a string of error message.
     */
    public getErrMsg(): string {
        return this.errMsg;
    }
}