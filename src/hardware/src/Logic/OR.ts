import Logic from "./Logic"
import { NAND } from "./NAND";
/**
 * This is OR Logic
 */
export class OR extends Logic{
    constructor(inputPin1:number,inputPin2:number){
        super(inputPin1,inputPin2);
        this.outpin = OR.Or(this.pin1,this.pin2);
    }

    public static Or(inputPin1:number,inputPin2:number):number{
        let nand1:NAND = new NAND(inputPin1,inputPin1);
        let nand2:NAND = new NAND(inputPin2,inputPin2);
        return NAND.Nand(nand1.outpin,nand2.outpin);
    }
}