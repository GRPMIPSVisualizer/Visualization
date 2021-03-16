import Logic from "./Logic"
import { NAND } from "./NAND";
export class AND extends Logic{
    constructor(inputPin1:number,inputPin2:number){
        super(inputPin1,inputPin2);
        this.outpin = AND.And(this.pin1,this.pin2);
    }

    public static And(inputPin1:number,inputPin2:number):number{
        let nand:NAND = new NAND(inputPin1,inputPin2);
        return NAND.Nand(nand.outpin,nand.outpin);
    }
}