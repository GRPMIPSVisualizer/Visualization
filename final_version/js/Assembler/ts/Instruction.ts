/**
 * Abstract Instruction class for translating the instruction into binary code.
 * It contains a constructor and a method to get the binary code.
 */
export abstract class Instruction {
		/**
     * The instruction to be decoded.
     */
		protected ins: string;
		/**
     * The binary code of the instruction.
     */
		protected binIns: string;
		/**
     * The operator of the instruction.
     */
		protected operator: string;

		/**
		 * Constructor of Instruction.
		 * @param ins the instruction to be decoded.
		 */
		constructor(ins: string) {
				this.ins = ins;
				this.binIns = "";
				let posOfSpace: number = ins.indexOf(" ");
				this.operator = ins.substring(0, posOfSpace);
		}

		/**
     * Method for getting the instruction in binary format.
     * @returns a string of the instruction in binary format.
     */
		getBinIns(): string {
				return this.binIns;
		}
}