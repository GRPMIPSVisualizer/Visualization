import {AND} from "../Logic/AND";
import {XOR} from "../Logic/XOR";
import {OR} from "../Logic/OR";
import {Mux} from "../Conponent/Mux";
import {stringToIntArray,intArrayToString} from "../Library/StringHandle";
export class Adder{
    // [key:string]:any;
    protected inPin32A:string;
    protected inPin32B:string;
    protected outPin32:string;
    public carry:number;
    
    constructor(inSignalA:string,inSignalB:string){
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        let bitA:number[] = stringToIntArray(this.inPin32A);
        let bitB:number[] = stringToIntArray(this.inPin32B);
        this.outPin32 = intArrayToString(this.Adder32(bitA,bitB));
        this.carry = 0;
    }

    public static halfAdder(inPin1:number,inPin2:number):number[]{
        let carry = AND.And(inPin1,inPin2);
        let sum = XOR.Xor(inPin1,inPin2);
        return [carry,sum];
    }

    public static fullAdder(inPin1:number,inPin2:number,carry:number):number[]{
        let Pin0:number = OR.Or(inPin1,inPin2);
        let Pin1:number = AND.And(inPin1,inPin2);
        let Pin2:number = XOR.Xor(inPin1,inPin2);
        let sum = XOR.Xor(Pin2,carry);
        let newCarry = Mux.Mux(Pin1,Pin0,carry);
        return [newCarry,sum];
    }

    public Adder32(inSignalA:number[],inSignalB:number[]):number[]{
        let outPin:number[] = new Array(32);
        let carry:number = 0;
        [carry,outPin[31]] = Adder.halfAdder(inSignalA[31],inSignalB[31]);
        for (let i:number =1; i < inSignalA.length;++i){
            [carry,outPin[31-i]] = Adder.fullAdder(inSignalA[31-i],inSignalB[31-i],carry);
            // console.log(carry,outPin[i]);
        }
        this.carry = carry;
        return outPin;
    }

    public newInPin(inSignalA:number[],inSignalB:number[]):void{
        this.inPin32A = intArrayToString(inSignalA);
        this.inPin32B = intArrayToString(inSignalB);
        this.outPin32 = intArrayToString(this.Adder32(inSignalA,inSignalB));
    }
    public getOutputAt(i:number):number{
        return parseInt(this.outPin32.charAt(i));
    }

    public getOutput():string{
        return this.outPin32;
    }

    public getInpinAAt(i:number):number{
        return parseInt(this.inPin32A.charAt(i));
    }

    public getInpinBAt(i:number):number{
        return parseInt(this.inPin32B.charAt(i));
    }
}