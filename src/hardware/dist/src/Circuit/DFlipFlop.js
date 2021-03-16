"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DFlipFlop = void 0;
const BooleanHandler_1 = require("../Library/BooleanHandler");
const NOT_1 = require("../Logic/NOT");
const Latch_1 = require("./Latch");
const Wired_1 = require("./Wired");
class DFlipFlop extends Wired_1.Wired {
    constructor() {
        super();
        this.LatchA = new Latch_1.Latch();
        this.LatchB = new Latch_1.Latch();
        this.clockSigal = this.LatchA.getClockSignal();
        this.DSiganl = this.LatchA.getDSignal();
        this.OutPinA = this.LatchB.getOutPinA();
        this.OutPinB = this.LatchB.getOutPinB();
        this.addWire(this.LatchA.getOutPinA(), this.LatchB.getDSignal());
        this.addWire(this.clockSigal, this.LatchB.getClockSignal(), (signal) => {
            return BooleanHandler_1.num2bool(NOT_1.NOT.Not(BooleanHandler_1.bool2num(signal)));
        });
        // debug
        // this.DSiganl.name = "A-DSignal";
        // this.clockSigal.name = "A-clockSignal";
        // this.LatchA.getOutPinA().name = "A-outASignal";
        // this.LatchB.getClockSignal().name = "B-clockSignal";
        // this.LatchB.getDSignal().name = "B-DSignal";
    }
    changeDSiganl() {
        this.DSiganl.changeSiganl();
        this.clockSigalKeep();
    }
    setDSiganl(signal) {
        this.DSiganl.setSignal(signal);
        this.clockSigalKeep();
    }
    setClockSiganl(signal) {
        this.clockSigal.setSignal(signal);
        this.clockSigalKeep();
    }
    changeClockSiganl() {
        this.clockSigal.changeSiganl();
        this.clockSigalKeep();
    }
    getDSignal() {
        return this.DSiganl;
    }
    clockSigalKeep() {
        this.clockSigal.SignalKeep();
    }
    getOutPinA() {
        return this.OutPinA;
    }
    getOutPinB() {
        return this.OutPinB;
    }
}
exports.DFlipFlop = DFlipFlop;
//# sourceMappingURL=DFlipFlop.js.map