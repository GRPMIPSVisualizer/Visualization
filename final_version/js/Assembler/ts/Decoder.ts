/**
 * Abstract Decoder class for validating the instruction and decoding the instruction into binary code.
 * It contains methods for setting and getting the instruction, getting the binary code, validate instruction and decode instruction.
 */
export abstract class Decoder {
    /**
     * The instruction to be decoded.
     */
    protected ins: string = "";
    /**
     * The operator of the instruction.
     */
    protected operator: string = "";
    /**
     * The binary code of the instruction.
     */
    protected binIns: string = "";

    /**
     * Set the strings called ins and operator in the class Decoder.
     * @param ins the instruction to be decoded.
     * @returns void
     */
    public setIns(ins: string): void {
        this.ins = ins;
        
        var posOfSpace: number = this.ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }

    /**
     * Method for getting the instruction.
     * @returns a string of the instruction.
     */
    public getIns(): string {
        return this.ins;
    }

    /**
     * Method for getting the binary code of the instruction.
     * @returns a string of the binary code of the instruction.
     */
    public getBinIns(): string {
        return this.binIns;
    }

    /**
     * Method for validating the instruction.
     * @returns true if the instruction is valid, otherwise false.
     */
    public abstract validate(): boolean;

    /**
     * Method for decoding the instruction into binary code.
     * @returns void
     */
    public abstract decode(): void;
}