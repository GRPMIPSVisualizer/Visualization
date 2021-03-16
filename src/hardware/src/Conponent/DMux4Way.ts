import {DMux} from "./DMux"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class DMux4Way{
    inPin:number;
    sel:string;
    outPin:string;
    
    constructor(inPin:number,Select:string){
        this.inPin = inPin;
        this.sel = Select;
        this.outPin = intArrayToString(DMux4Way.DMux4Way(this.inPin,stringToIntArray(this.sel)));
    }

    public static DMux4Way(inPin:number,Select:number[]):number[]{
        let temp:number[] = [];
        let dmux1:DMux = new DMux(inPin,Select[0]);
        temp = DMux.DMux(dmux1.outPin1,Select[1]).concat(DMux.DMux(dmux1.outPin2,Select[1]));
        return temp;
    }
}