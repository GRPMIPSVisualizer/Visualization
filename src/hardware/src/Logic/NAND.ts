import Logic from "./Logic"
export class NAND extends Logic{

    
    constructor(inputPin1:number,inputPin2:number){
        super(inputPin1,inputPin2);
        this.outpin = NAND.Nand(this.pin1,this.pin2);
    }

    public static Nand(inputPin1:number,inputPin2:number):number{
            return  Math.abs((inputPin1 & inputPin2) - 1);
    }

}