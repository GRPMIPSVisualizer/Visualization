"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latch = void 0;
const BooleanHandler_1 = require("../Library/BooleanHandler");
const AND_1 = require("../Logic/AND");
const NOT_1 = require("../Logic/NOT");
const OR_1 = require("../Logic/OR");
const Signal_1 = require("./Signal");
// import { Wirable } from "./Wirable";
// up-edge change
class Latch {
    constructor() {
        // super();
        this.clockSignal = new Signal_1.Signal(false, this.Latch.bind(this));
        this.DSiganl = new Signal_1.Signal(false, this.Latch.bind(this));
        this.OutPinA = new Signal_1.Signal(false);
        this.OutPinB = new Signal_1.Signal(true);
    }
    getOutPinA() {
        return this.OutPinA;
    }
    getOutPinB() {
        return this.OutPinB;
    }
    getDSignal() {
        return this.DSiganl;
    }
    getClockSignal() {
        return this.clockSignal;
    }
    changeDSignal() {
        this.DSiganl.changeSiganl();
    }
    changeClockSignal() {
        this.clockSignal.changeSiganl();
    }
    Latch() {
        let pin1 = AND_1.AND.And(BooleanHandler_1.bool2num(this.clockSignal.getSignal()), NOT_1.NOT.Not(BooleanHandler_1.bool2num(this.DSiganl.getSignal())));
        let pin2 = AND_1.AND.And(BooleanHandler_1.bool2num(this.clockSignal.getSignal()), BooleanHandler_1.bool2num(this.DSiganl.getSignal()));
        let outA = this.OutPinA.getSignal();
        let outB = this.OutPinB.getSignal();
        this.OutPinA.setSignal(BooleanHandler_1.num2bool(NOT_1.NOT.Not(OR_1.OR.Or(pin1, BooleanHandler_1.bool2num(outB)))));
        this.OutPinB.setSignal(BooleanHandler_1.num2bool(NOT_1.NOT.Not(OR_1.OR.Or(pin2, BooleanHandler_1.bool2num(outA)))));
    }
}
exports.Latch = Latch;
//# sourceMappingURL=Latch.js.map