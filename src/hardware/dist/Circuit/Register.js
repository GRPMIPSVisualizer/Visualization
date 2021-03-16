"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._32BitsRegister = void 0;
var BooleanHandler_1 = require("../Library/BooleanHandler");
var StringHandle_1 = require("../Library/StringHandle");
var DFlipFlop_1 = require("./DFlipFlop");
var Signal_1 = require("./Signal");
var _32BitsRegister = /** @class */ (function () {
    function _32BitsRegister() {
        this.outPin32 = "00000000000000000000000000000000";
        this.clockSignal = new Signal_1.Signal(false);
        this.DFFs = new Array();
        for (var i = 0; i < _32BitsRegister.bitsCount; ++i) {
            this.DFFs[i] = new DFlipFlop_1.DFlipFlop();
        }
    }
    _32BitsRegister.prototype.setInpin32 = function (newInPins) {
        this.inputDetect(newInPins);
        this.inPin32 = newInPins;
        this.setDSiganls();
        // this.setOutpin32();
    };
    _32BitsRegister.prototype.resetInput = function () {
        this.inPin32 = undefined;
    };
    _32BitsRegister.prototype.changeClockSignal = function () {
        this.clockSignal.changeSiganl();
        this.DFFs.forEach(function (DFF) {
            DFF.changeClockSiganl();
        });
        this.setOutpin32();
    };
    _32BitsRegister.prototype.setClockSignal = function (signal) {
        if (typeof signal == "number")
            signal = BooleanHandler_1.num2bool(signal);
        this.clockSignal.setSignal(signal);
        this.DFFs.forEach(function (DFF) {
            DFF.setClockSiganl(signal);
        });
        this.setOutpin32();
    };
    _32BitsRegister.prototype.inputDetect = function (input) {
        if (input.length != 32) {
            throw new Error("Invalid Input!");
        }
        var bits = StringHandle_1.stringToIntArray(input);
        bits.forEach(function (bit) {
            if (bit !== 0 && bit !== 1)
                throw new Error("Invalid data " + bit + "!");
        });
    };
    _32BitsRegister.prototype.setDSiganls = function () {
        if (this.inPin32 == undefined)
            return;
        var bits = StringHandle_1.stringToIntArray(this.inPin32);
        this.DFFs.forEach(function (DFF) {
            DFF.setDSiganl(BooleanHandler_1.num2bool(bits.shift()));
        });
    };
    _32BitsRegister.prototype.setOutpin32 = function () {
        var OutPins = new Array();
        this.DFFs.forEach(function (flipflop) {
            OutPins.push(BooleanHandler_1.bool2num(flipflop.getOutPinA().getSignal()));
        });
        this.outPin32 = StringHandle_1.intArrayToString(OutPins);
    };
    _32BitsRegister.prototype.getinPin32 = function () {
        return this.inPin32;
    };
    _32BitsRegister.prototype.getOutPin32 = function () {
        return this.outPin32;
    };
    _32BitsRegister.prototype.getClockSignal = function () {
        return this.clockSignal;
    };
    _32BitsRegister.bitsCount = 32;
    return _32BitsRegister;
}());
exports._32BitsRegister = _32BitsRegister;
//# sourceMappingURL=Register.js.map