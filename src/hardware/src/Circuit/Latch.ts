import { BitwiseOperator } from "typescript";
import { bool2num, num2bool } from "../Library/BooleanHandler";
import { AND } from "../Logic/AND";
import { NOT } from "../Logic/NOT";
import { OR } from "../Logic/OR";
import { Signal } from "./Signal";
// import { Wirable } from "./Wirable";
// up-edge change
export class Latch {
    private clockSignal: Signal;
    private DSiganl: Signal;
    private OutPinA: Signal;
    private OutPinB: Signal;
    constructor() {
        // super();
        this.clockSignal = new Signal(false, this.Latch.bind(this));
        this.DSiganl = new Signal(false, this.Latch.bind(this));
        this.OutPinA = new Signal(false);
        this.OutPinB = new Signal(true);
    }

    public getOutPinA():Signal{
        return this.OutPinA;
    }

    public getOutPinB():Signal{
        return this.OutPinB;
    }

    public getDSignal():Signal{
        return this.DSiganl;
    }

    public getClockSignal():Signal{
        return this.clockSignal;
    }

    public changeDSignal(): void {
        this.DSiganl.changeSiganl();
    }

    public changeClockSignal(): void {
        this.clockSignal.changeSiganl();
    }

    public Latch(): void {
        let pin1: number = AND.And(bool2num(this.clockSignal.getSignal()), NOT.Not(bool2num(this.DSiganl.getSignal())));
        let pin2: number = AND.And(bool2num(this.clockSignal.getSignal()), bool2num(this.DSiganl.getSignal()));
        let outA: boolean = this.OutPinA.getSignal() as boolean;
        let outB: boolean = this.OutPinB.getSignal() as boolean;
        this.OutPinA.setSignal(num2bool(NOT.Not(OR.Or(pin1, bool2num(outB)))));
        this.OutPinB.setSignal(num2bool(NOT.Not(OR.Or(pin2, bool2num(outA)))));
    }

}