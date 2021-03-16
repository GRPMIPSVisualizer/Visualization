"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latch = void 0;
var BooleanHandler_1 = require("../Library/BooleanHandler");
var AND_1 = require("../Logic/AND");
var NOT_1 = require("../Logic/NOT");
var OR_1 = require("../Logic/OR");
var Signal_1 = require("./Signal");
// import { Wirable } from "./Wirable";
// up-edge change
var Latch = /** @class */ (function () {
    function Latch() {
        // super();
        this.clockSignal = new Signal_1.Signal(false, this.Latch.bind(this));
        this.DSiganl = new Signal_1.Signal(false, this.Latch.bind(this));
        this.OutPinA = new Signal_1.Signal(false);
        this.OutPinB = new Signal_1.Signal(true);
    }
    Latch.prototype.getOutPinA = function () {
        return this.OutPinA;
    };
    Latch.prototype.getOutPinB = function () {
        return this.OutPinB;
    };
    Latch.prototype.getDSignal = function () {
        return this.DSiganl;
    };
    Latch.prototype.getClockSignal = function () {
        return this.clockSignal;
    };
    Latch.prototype.changeDSignal = function () {
        this.DSiganl.changeSiganl();
    };
    Latch.prototype.changeClockSignal = function () {
        this.clockSignal.changeSiganl();
    };
    Latch.prototype.Latch = function () {
        var pin1 = AND_1.AND.And(BooleanHandler_1.bool2num(this.clockSignal.getSignal()), NOT_1.NOT.Not(BooleanHandler_1.bool2num(this.DSiganl.getSignal())));
        var pin2 = AND_1.AND.And(BooleanHandler_1.bool2num(this.clockSignal.getSignal()), BooleanHandler_1.bool2num(this.DSiganl.getSignal()));
        var outA = this.OutPinA.getSignal();
        var outB = this.OutPinB.getSignal();
        this.OutPinA.setSignal(BooleanHandler_1.num2bool(NOT_1.NOT.Not(OR_1.OR.Or(pin1, BooleanHandler_1.bool2num(outB)))));
        this.OutPinB.setSignal(BooleanHandler_1.num2bool(NOT_1.NOT.Not(OR_1.OR.Or(pin2, BooleanHandler_1.bool2num(outA)))));
    };
    return Latch;
}());
exports.Latch = Latch;
//# sourceMappingURL=Latch.js.map