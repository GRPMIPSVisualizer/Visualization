import {Decoder} from "./Decoder";
import {InstructionR} from "./InstructionR";
import {MapForRegister} from "./MapForRegister";

export class DecoderForR extends Decoder {

    private static decoder: DecoderForR = new DecoderForR();

    private constructor(){
        super();
    }

    public static getDecoder(): DecoderForR {
        return this.decoder;
    }

    public validate(): boolean {
        let posOfSpace: number = this.ins.indexOf(" ");
        let operandRS: string = "";
        let operandRT: string = "";
        let operandRD: string = "";
        let SHAMT: string = "";
        if (this.operator == "jr") {
            operandRS = this.ins.substring(posOfSpace + 1, this.ins.length);
        } else if (this.operator == "sll" || this.operator == "srl") {
            let operands: string[] = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRD = operands[0];
            operandRT = operands[1];
            SHAMT = operands[2];
        } else {
            let operands: string[] = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRD = operands[0];
            operandRS = operands[1];
            operandRT = operands[2]; 
        }

        let patt1 = /^[0-9]+$/;
        let patt2 = /^[a-z0-9]+$/;

        if((!(SHAMT == "" || patt1.test(SHAMT))) || (patt1.test(SHAMT) && +SHAMT >= 32)) {
            console.log("Error 1 in DecoderForR. Invalid shift amount.");
            return false;
        }
 
        let operands: Array<string> = [operandRS, operandRT, operandRD];
        let i: number;
        for (i = 0; i < operands.length; i++) {
            let operand: string = operands[i].substring(1,operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                console.log("Error 2 in DecoderForR. Invalid operand.");
                return false;
            } else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                break;
            } else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister.getMap().has(operand)) {
                    let operandID: string | undefined = MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        console.log("Error 3 in DecoderForR. Invalid operand.");
                        return false;
                    } else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                }
            } else {
                console.log("Error 4 in DecoderForR. Invalid operand.");
                return false;
            }
        }
        
        return true;
    }

    public decode(): void {
        let instruction: InstructionR = new InstructionR(this.ins);
        this.binIns = instruction.getBinIns();
    }
}