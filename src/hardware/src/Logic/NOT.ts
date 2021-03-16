import Logic from "./Logic"
import { NAND } from "./NAND";
/**
 * This is NOT Logic
 */
export class NOT extends Logic{
    constructor(inputPin1:number){
        super(inputPin1,0);
        this.outpin = NOT.Not(this.pin1);
    }

    public static Not(inputPin1:number):number{
        let nand:NAND = new NAND(inputPin1,inputPin1);
        return nand.outpin;
    }
}