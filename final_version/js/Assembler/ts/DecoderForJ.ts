import {Decoder} from "./Decoder";
import {InstructionJ} from "./InstructionJ";
import {MapForRegister} from "./MapForRegister";

export class DecoderForJ extends Decoder {
    
    private static decoder: DecoderForJ = new DecoderForJ();

    private constructor(){
        super();
    }

    public static getDecoder(): DecoderForJ {
        return this.decoder;
    }

    public validate(): boolean {
        let posOfSpace: number = this.ins.indexOf(" ");
        let operandADDRESS = this.ins.substring(posOfSpace + 1, this.ins.length);
        let patt1 = /^[0-9]+$/;

        if(!patt1.test(operandADDRESS)) {
            console.log("Error 1 in DecoderForJ. Invalid address.");
            return false;
        }
        return true;
    }
    
    public decode(): void {
        let instruction: InstructionJ = new InstructionJ(this.ins);
        this.binIns = instruction.getBinIns();
    }
}