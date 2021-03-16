import { isThrowStatement } from "typescript";
import { bool2num, num2bool } from "../Library/BooleanHandler";
import { NOT } from "../Logic/NOT";
import { Latch } from "./Latch";
import { Signal, signalType } from "./Signal";
// import { Wirable } from "./Wirable";
import { Wire } from "./Wire";
import {Wired} from "./Wired"

export class DFlipFlop extends Wired{
    private clockSigal:Signal;
    private DSiganl:Signal;
    private OutPinA:Signal;
    private OutPinB:Signal;
    private LatchA:Latch;
    private LatchB:Latch;
    constructor(){
        super();
        this.LatchA = new Latch();
        this.LatchB = new Latch();
        this.clockSigal = this.LatchA.getClockSignal();
        this.DSiganl = this.LatchA.getDSignal();
        this.OutPinA = this.LatchB.getOutPinA();
        this.OutPinB = this.LatchB.getOutPinB();
        this.addWire(this.LatchA.getOutPinA(),this.LatchB.getDSignal());
        this.addWire(this.clockSigal,this.LatchB.getClockSignal(),(signal:signalType)=>{
            return num2bool(NOT.Not(bool2num(signal))); 
        });

        // debug
        // this.DSiganl.name = "A-DSignal";
        // this.clockSigal.name = "A-clockSignal";
        // this.LatchA.getOutPinA().name = "A-outASignal";
        // this.LatchB.getClockSignal().name = "B-clockSignal";
        // this.LatchB.getDSignal().name = "B-DSignal";
        
    }
    public changeDSiganl():void{
        this.DSiganl.changeSiganl();
        this.clockSigalKeep();
    }

    public setDSiganl(signal:signalType):void{
        this.DSiganl.setSignal(signal);
        this.clockSigalKeep();
    }

    public setClockSiganl(signal:signalType):void{
        this.clockSigal.setSignal(signal);
        this.clockSigalKeep();
    }

    public changeClockSiganl():void{
        this.clockSigal.changeSiganl();
        this.clockSigalKeep();
    }

    public getDSignal():Signal{
        return this.DSiganl;
    }

    public clockSigalKeep():void{
        this.clockSigal.SignalKeep();
    }

    public getOutPinA():Signal{
        return this.OutPinA;
    }

    public getOutPinB():Signal{
        return this.OutPinB;
    }


}