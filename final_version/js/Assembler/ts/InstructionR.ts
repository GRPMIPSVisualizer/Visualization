import {decimalToBinary} from "./DecimalToBinary";
import {Instruction} from "./Instruction";
import {MapForR} from "./MapForR";

export class InstructionR extends Instruction{

    private operandRS: string;
    private operandRT: string;
    private operandRD: string;
    private op: string;
    private rs: string;
    private rt: string;
    private rd: string;
    private shamt: string;
    private funct: string;

    //The ins should be in the form like "add $8,$16,$17".
    //There should be only one space between the operator and the first operand, no other space existing.
    //The register should be in dollar sign and a number.
    constructor(ins: string) {
        super(ins);
        this.op = "000000";
        let functBin: string | undefined = MapForR.getMap().get(this.operator);
        if (functBin == undefined) {
            this.funct = "XXXXXX";
            console.log("Error in constructor for InstructionR.");
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
        } else if (this.operator == "sll" || this.operator == "srl") {
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
}