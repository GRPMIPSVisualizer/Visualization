import {OR} from "./OR"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class OR32WAY{
    inPin32:string;
    outPin32:number;
    constructor(inSignalA:string){
        this.inPin32 = inSignalA;
        let bitA:number[] = stringToIntArray(this.inPin32);
        this.outPin32 = OR32WAY.Or32Way(bitA);
    }

    public static Or32Way(BitsA:number[]):number{
        let outPin:number = 0;
        BitsA.forEach((bit)=>{
            outPin = OR.Or(outPin,bit);
        });
        return outPin;
    }
}