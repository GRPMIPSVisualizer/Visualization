import {Mux32} from "./Mux32"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class Mux4Way32{
    inPin32:string[];
    sel:string;
    outPin32:string;
    constructor(inSignal:string[],Select:string){
        this.inPin32 = inSignal;
        this.sel = Select;
        
        let bits:number[][] = [];
        let index:number = 0;
        this.inPin32.forEach( pin => {
            bits[index] = stringToIntArray(pin);
            ++index;
        });
    
        let selBit:number[] = stringToIntArray(this.sel);
        this.outPin32 = intArrayToString(Mux4Way32.Mux4Way32(bits,selBit));
    }

    public static Mux4Way32(inPin:number[][],Select2Way:number[]):number[]{
        let mux32A:Mux32 = new Mux32(intArrayToString(inPin[0]),intArrayToString(inPin[1]),Select2Way[1]);
        let mux32B:Mux32 = new Mux32(intArrayToString(inPin[2]),intArrayToString(inPin[3]),Select2Way[1]);
        return Mux32.Mux32(stringToIntArray(mux32A.outPin32),stringToIntArray(mux32B.outPin32),Select2Way[0]);
    }
}