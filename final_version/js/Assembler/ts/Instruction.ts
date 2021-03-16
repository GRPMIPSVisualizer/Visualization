export abstract class Instruction {

    protected ins: string;
	protected binIns: string;
	protected operator: string;

	constructor(ins: string){
		this.ins = ins;  
		this.binIns = "";
		let posOfSpace: number = ins.indexOf(" ");
		this.operator = ins.substring(0,posOfSpace);
	}

	getBinIns(): string {
		return this.binIns;
	}
}