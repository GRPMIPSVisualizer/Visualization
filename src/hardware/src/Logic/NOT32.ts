import {NOT} from "./NOT"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class NOT32{
    inPin32A:string;
    outPin32:string;
    constructor(inSignalA:string){
        this.inPin32A = inSignalA;
        let bitA:number[] = stringToIntArray(this.inPin32A);
        this.outPin32 = intArrayToString(NOT32.Not32(bitA));
    }

    public static Not32(BitsA:number[]):number[]{
        let outBits:number[] = [];
        let i:number = 0;
        BitsA.forEach((bit)=>{
            outBits[i] = NOT.Not(bit)
            ++i;
        });
        return outBits;
    } 
}