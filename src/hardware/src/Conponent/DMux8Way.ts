import {DMux} from "./DMux"
import {DMux4Way} from "./DMux4Way"
import {stringToIntArray,intArrayToString} from "../Library/StringHandle"
export class DMux8Way{
    inPin:number;
    sel:string;
    outPin:string;
    
    constructor(inPin:number,Select:string){
        this.inPin = inPin;
        this.sel = Select;
        this.outPin = intArrayToString(DMux8Way.DMux8Way(this.inPin,stringToIntArray(this.sel)));
    }

    public static DMux8Way(inPin:number,Select:number[]):number[]{
        let temp:number[] = [];
        let dmux1:DMux = new DMux(inPin,Select[0]);
        temp = DMux4Way.DMux4Way(dmux1.outPin1,Select.slice(1,3)).concat(DMux4Way.DMux4Way(dmux1.outPin2,Select.slice(1,3)));
        return temp;
    }
}