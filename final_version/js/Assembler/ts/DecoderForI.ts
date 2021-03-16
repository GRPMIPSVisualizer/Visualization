import {Decoder} from "./Decoder";
import {InstructionI} from "./InstructionI";
import {MapForRegister} from "./MapForRegister";

export class DecoderForI extends Decoder {
    
    private static decoder: DecoderForI = new DecoderForI();

    private constructor(){
        super();
    }

    public static getDecoder(): DecoderForI {
        return this.decoder;
    }

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
        } else {
            let numLeftBracket = this.ins.split("(").length - 1;
            let numRightBracket = this.ins.split(")").length - 1;
            if (!(numLeftBracket == 1 && numRightBracket == 1)) {
                console.log("Error 1 in DecoderForI. Invalid instruction format.");
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

         
        if (!patt1.test(IMM.charAt(0)) && IMM.charAt(0) != "+" && IMM.charAt(0) != "-") {
            console.log("Error 2 in DecoderForI. Invalid immediate number.");
        } else if (+IMM <= -32768|| +IMM >= 32767) {
            console.log("Error 3 in DecoderForI. Invalid immediate number. Out of range.");
        }
        

        let operands: Array<string> = [operandRS, operandRT];
        let i: number;
        for (i = 0; i < operands.length; i++) {
            let operand: string = operands[i].substring(1,operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                console.log("Error 4 in DecoderForI. Invalid operand.");
                return false;
            } else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                break;
            } else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister.getMap().has(operand)) {
                    let operandID: string | undefined = MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        console.log("Error 5 in DecoderForI. Invalid operand.");
                        return false;
                    } else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                }
            } else {
                console.log("Error 6 in DecoderForR. Invalid operand.");
                return false;
            }
        }
        
        return true;
    }
    
    public decode(): void {
        let instruction: InstructionI = new InstructionI(this.ins);
        this.binIns = instruction.getBinIns();
    }
}