import {Decoder} from "./Decoder";
import {InstructionJ} from "./InstructionJ";

/**
 * Class for validating and decoding the instruction of type-J into binary code.
 * It contains methods for validating instruction, decoding instruction and getting the error message.
 */
export class DecoderForJ extends Decoder {
    /**
     * The string for error message.
     */
    private errMsg: string = "";
    /**
     * The decoder to validate and decode instructions of type-J.
     */
    private static decoder: DecoderForJ = new DecoderForJ();

    /**
     * Constructor of DecoderForJ.
     */
    private constructor(){
        super();
    }

    /**
     * Method for getting the decoder for instruction of type-J.
     * @returns the decoder to validate and decode instructions of type-J.
     */
    public static getDecoder(): DecoderForJ {
        return this.decoder;
    }

    /**
     * Method for validating the instruction of type-J.
     * @returns true if the instruction is valid, otherwise false.
     */
    public validate(): boolean {
        let posOfSpace: number = this.ins.indexOf(" ");
        let operandADDRESS = this.ins.substring(posOfSpace + 1, this.ins.length);
        let patt1 = /^[0-9]+$/;

        if (!patt1.test(operandADDRESS)) {
            this.errMsg = this.errMsg + "Error 208: Invalid address. -- " + this.getIns() + "\n";
            return false;
        }
        return true;
    }
    
    /**
     * Method for decoding the instruction of type-J into binary code.
     * @returns void
     */
    public decode(): void {
        let instruction: InstructionJ = new InstructionJ(this.ins);
        this.binIns = instruction.getBinIns();
    }

    /**
     * Method for getting the error message of invalid instruction of type-J.
     * @returns a string of error message.
     */
    public getErrMsg(): string {
        return this.errMsg;
    }
}