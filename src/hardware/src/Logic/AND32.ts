import {AND} from "./AND"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class AND32{
    inPin32A:string;
    inPin32B:string;
    outPin32:string;
    constructor(inSignalA:string,inSignalB:string){
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        let bitA:number[] = stringToIntArray(this.inPin32A);
        let bitB:number[] = stringToIntArray(this.inPin32B);
        this.outPin32 = intArrayToString(AND32.And32(bitA,bitB));
    }

    public static And32(BitsA:number[],BitsB:number[]):number[]{
        let outBits:number[] = [];
        let i:number = 0;
        BitsA.forEach((bit)=>{
            outBits[i] = AND.And(bit,BitsB[i])
            ++i;
        });
        return outBits;
    } 
}