export abstract class Decoder {
    protected ins: string = "";
    protected operator: string = "";
    protected binIns: string = "";

    public setIns(ins: string): void {
        this.ins = ins;
        
        var posOfSpace: number = this.ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }

    public getIns(): string {
        return this.ins;
    }

    public getBinIns(): string {
        return this.binIns;
    }

    public abstract validate(): boolean;

    public abstract decode(): void;
}