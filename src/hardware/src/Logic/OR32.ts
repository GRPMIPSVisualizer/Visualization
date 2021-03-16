import {OR} from "./OR"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class OR32{
    inPin32A:string;
    inPin32B:string;
    outPin32:string;
    constructor(inSignalA:string,inSignalB:string){
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        let bitA:number[] = stringToIntArray(this.inPin32A);
        let bitB:number[] = stringToIntArray(this.inPin32B);
        this.outPin32 = intArrayToString(OR32.Or32(bitA,bitB));
    }

    public static Or32(BitsA:number[],BitsB:number[]):number[]{
        let outBits:number[] = [];
        let i:number = 0;
        BitsA.forEach((bit)=>{
            outBits[i] = OR.Or(bit,BitsB[i])
            ++i;
        });
        return outBits;
    }
}