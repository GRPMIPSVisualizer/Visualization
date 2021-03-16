import { AND } from "../Logic/AND";
import { NOT } from "../Logic/NOT"
/**
 * This is not Logic
 */
export class DMux{
    inPin:number;
    sel:number;
    outPin1:number;
    outPin2:number;
    constructor(inPin:number,Select:number){
        this.inPin = inPin;
        this.sel = Select;
        let temp:number[] = [];
        temp = DMux.DMux(this.inPin,this.sel);
        this.outPin1 = temp[0];
        this.outPin2 = temp[1];
    }

    public static DMux(inPin:number,Select:number):number[]{
        let temp:number[] = [];
        let nots:NOT = new NOT(Select);
        temp.push(AND.And(nots.outpin,inPin));
        temp.push(AND.And(Select,inPin));
        return temp;
    }
}