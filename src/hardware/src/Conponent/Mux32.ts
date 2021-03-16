import { Adder } from "../Circuit/Adder";
import { Memory } from "../Circuit/Memory";
import {stringToIntArray,intArrayToString, bitsMapping, shiftLeftBinary32Bits} from "../Library/StringHandle";
import {Mux} from "./Mux";
export class Mux32{
    private notifyFunc:Function[] = new Array<Function>();
    inPin32A:string;
    inPin32B:string;
    sel:number;
    outPin32:string;
    constructor(inSignalA:string,inSignalB:string,Select:number){
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        this.sel = Select;
        let bitA:number[] = stringToIntArray(this.inPin32A);
        let bitB:number[] = stringToIntArray(this.inPin32B);
        this.outPin32 = intArrayToString(Mux32.Mux32(bitA,bitB,this.sel));
    }

    public static Mux32(inSignalA:number[],inSignalB:number[],Select:number):number[]{
        let i:number = 0;
        let outPin:number[] = [];
        inSignalA.forEach((bit) => {
            outPin.push(Mux.Mux(bit,inSignalB[i],Select));
            ++i;
        })
        return outPin;
    }

    public setInpin32A(newInPin:string):void{
        this.inPin32A = newInPin;
        this.setOutPin();
    }

    public memSetInpin32B(_Memory:Memory,_PCAdder:Adder):void{
        let newInpin = bitsMapping(_PCAdder.getOutput(),28,32) + bitsMapping(shiftLeftBinary32Bits(_Memory.getTextOutpin()),0,28);
        this.setInpin32B(newInpin);
    }

    public dataMemSetInpin32B(_Memory:Memory):void{
        if (_Memory.getOutPin32() == undefined)
            return;
        this.setInpin32B(_Memory.getOutPin32() as string);
    }

    public setInpin32B(newInPin:string):void{
        this.inPin32B = newInPin;
        this.setOutPin();
    }

    public setMuxInpin32A(MUX:Mux32):void{
        this.setInpin32A(MUX.outPin32);
    }

    public setSel(newSel:number):void{
        this.sel = newSel;
        this.setOutPin();
    }

    protected setOutPin():void{
        this.outPin32 = intArrayToString(Mux32.Mux32(stringToIntArray(this.inPin32A),stringToIntArray(this.inPin32B),this.sel));
        this.notifychange();
    }

    private notifychange():void{
        this.notifyFunc.forEach(Func=>{
                Func();
            }
        )
    }

    public addNotifyFunc(newFunc:Function):void{
        this.notifyFunc.push(newFunc);
    }
}