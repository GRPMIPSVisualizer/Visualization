import {decimalToBinary} from "./DecimalToBinary";
import {Instruction} from "./Instruction";
import {MapForJ} from "./MapForJ";

/**
 * Class for decoding the instruction of type-J into binary code.
 * It contains a constructor and a method to get the error message.
 */
export class InstructionJ extends Instruction{

    /**
     * The address of the operand in the type-J instruction.
     */
    private operandADDRESS: string;
    /**
     * The 6 bits opcodes of the type-J instruction.
     */
    private op: string;
    /**
     * The 26 bits binary code of the address in the type-J instruction.
     */
    private address: string;
    /**
     * The string of the error message.
     */
    private errMsg: string = "";

    /**
     * Constructor of InstructionJ.
     * Translate the type-J instruction into binary format.
     * @param ins the type-J instruction to be translated. It should be in the form like "j 10000".
     * There should be only one space between the operator and the first operand, no other space existing.
     * The address should be represented by a decimal number.
     */
    constructor(ins: string) {
        super(ins);
        let opBin: string | undefined = MapForJ.getMap().get(this.operator);
        if (opBin == undefined) {
            this.op = "XXXXXX";
            this.errMsg = this.errMsg + "Error 102: Failed to construct type-J instruction. -- " + ins + "\n";
        } else {
            this.op = opBin;
        }

        let posOfSpace: number = ins.indexOf(" ");
        this.operandADDRESS = ins.substring(posOfSpace + 1, ins.length);
        this.address = decimalToBinary(+this.operandADDRESS, 26);
 
        this.binIns = this.op + this.address;
    }

    /**
     * Method for getting the error message of type-J instruction.
     * @returns a string of error message.
     */
    public getErrMsg(): string {
        return this.errMsg;
    }
}