"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DFlipFlop = void 0;
var BooleanHandler_1 = require("../Library/BooleanHandler");
var NOT_1 = require("../Logic/NOT");
var Latch_1 = require("./Latch");
var Wired_1 = require("./Wired");
var DFlipFlop = /** @class */ (function (_super) {
    __extends(DFlipFlop, _super);
    function DFlipFlop() {
        var _this = _super.call(this) || this;
        _this.LatchA = new Latch_1.Latch();
        _this.LatchB = new Latch_1.Latch();
        _this.clockSigal = _this.LatchA.getClockSignal();
        _this.DSiganl = _this.LatchA.getDSignal();
        _this.OutPinA = _this.LatchB.getOutPinA();
        _this.OutPinB = _this.LatchB.getOutPinB();
        _this.addWire(_this.LatchA.getOutPinA(), _this.LatchB.getDSignal());
        _this.addWire(_this.clockSigal, _this.LatchB.getClockSignal(), function (signal) {
            return BooleanHandler_1.num2bool(NOT_1.NOT.Not(BooleanHandler_1.bool2num(signal)));
        });
        return _this;
        // debug
        // this.DSiganl.name = "A-DSignal";
        // this.clockSigal.name = "A-clockSignal";
        // this.LatchA.getOutPinA().name = "A-outASignal";
        // this.LatchB.getClockSignal().name = "B-clockSignal";
        // this.LatchB.getDSignal().name = "B-DSignal";
    }
    DFlipFlop.prototype.changeDSiganl = function () {
        this.DSiganl.changeSiganl();
        this.clockSigalKeep();
    };
    DFlipFlop.prototype.setDSiganl = function (signal) {
        this.DSiganl.setSignal(signal);
        this.clockSigalKeep();
    };
    DFlipFlop.prototype.setClockSiganl = function (signal) {
        this.clockSigal.setSignal(signal);
        this.clockSigalKeep();
    };
    DFlipFlop.prototype.changeClockSiganl = function () {
        this.clockSigal.changeSiganl();
        this.clockSigalKeep();
    };
    DFlipFlop.prototype.getDSignal = function () {
        return this.DSiganl;
    };
    DFlipFlop.prototype.clockSigalKeep = function () {
        this.clockSigal.SignalKeep();
    };
    DFlipFlop.prototype.getOutPinA = function () {
        return this.OutPinA;
    };
    DFlipFlop.prototype.getOutPinB = function () {
        return this.OutPinB;
    };
    return DFlipFlop;
}(Wired_1.Wired));
exports.DFlipFlop = DFlipFlop;
//# sourceMappingURL=DFlipFlop.js.map