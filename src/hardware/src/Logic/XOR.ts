import Logic from "./Logic"
import { NAND } from "./NAND";
import {OR} from "./OR"
import {AND} from "./AND"
/**
 * This is not Logic
 */
export class XOR extends Logic{
    constructor(inputPin1:number,inputPin2:number){
        super(inputPin1,inputPin2);
        this.outpin = XOR.Xor(this.pin1,this.pin2);
    }

    public static Xor(inputPin1:number,inputPin2:number):number{
        let nand:NAND = new NAND(inputPin1,inputPin2);
        let or:OR = new OR(inputPin1,inputPin2);
        return AND.And(nand.outpin,or.outpin);
    }
}