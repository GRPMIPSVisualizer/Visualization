import {Mux4Way32} from "./Mux4Way32"
import {Mux32} from "./Mux32"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class Mux8Way32{
    inPin32:string[];
    sel:string;
    outPin32:string;
    constructor(inSignal:string[],Select:string){
        this.inPin32 = inSignal;
        this.sel = Select;
        this.outPin32 = intArrayToString(Mux8Way32.Mux8Way32(this.inPin32,this.sel));
    }

    public static Mux8Way32(inPin:string[],Select2Way:string):number[]{
        let mux4Way32A:Mux4Way32 = new Mux4Way32(inPin.slice(0,4),Select2Way.slice(1,3));
        let mux4Way32B:Mux4Way32 = new Mux4Way32(inPin.slice(4,8),Select2Way.slice(1,3));
        // console.log(mux4Way32A);
        // console.log(mux4Way32B);
        return Mux32.Mux32(stringToIntArray(mux4Way32A.outPin32),stringToIntArray(mux4Way32B.outPin32),parseInt(Select2Way.charAt(0)));
    }
}