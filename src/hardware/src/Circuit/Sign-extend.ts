import { binaryDetect } from "../Library/StringHandle";

export class SignExtend{
    private inPin16:string;
    private outPin32:string;

    constructor(){
        this.inPin16 = "0000000000000000"
        this.outPin32 = "";
        this.signExtend();
    }

    public setInPin16(inPin:string):void{
        if (inPin.length != 16)
            throw Error("Sign Extend Input length is not 16.");
        binaryDetect(inPin);
        this.inPin16 = inPin;
        this.signExtend();
    }

    private signExtend():void{
        this.outPin32 = "0000000000000000" + this.inPin16;
    }

    public getOutPin32():string{
        return this.outPin32;
    }

}