"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._32BitsRegister = void 0;
const BooleanHandler_1 = require("../Library/BooleanHandler");
const StringHandle_1 = require("../Library/StringHandle");
const DFlipFlop_1 = require("./DFlipFlop");
const Signal_1 = require("./Signal");
class _32BitsRegister {
    constructor() {
        this.outPin32 = "00000000000000000000000000000000";
        this.clockSignal = new Signal_1.Signal(false);
        this.DFFs = new Array();
        for (let i = 0; i < _32BitsRegister.bitsCount; ++i) {
            this.DFFs[i] = new DFlipFlop_1.DFlipFlop();
        }
    }
    setInpin32(newInPins) {
        this.inputDetect(newInPins);
        this.inPin32 = newInPins;
        this.setDSiganls();
        // this.setOutpin32();
    }
    resetInput() {
        this.inPin32 = undefined;
    }
    changeClockSignal() {
        this.clockSignal.changeSiganl();
        this.DFFs.forEach(DFF => {
            DFF.changeClockSiganl();
        });
        this.setOutpin32();
    }
    setClockSignal(signal) {
        if (typeof signal == "number")
            signal = BooleanHandler_1.num2bool(signal);
        this.clockSignal.setSignal(signal);
        this.DFFs.forEach(DFF => {
            DFF.setClockSiganl(signal);
        });
        this.setOutpin32();
    }
    inputDetect(input) {
        if (input.length != 32) {
            throw new Error("Invalid Input!");
        }
        let bits = StringHandle_1.stringToIntArray(input);
        bits.forEach(bit => {
            if (bit !== 0 && bit !== 1)
                throw new Error("Invalid data " + bit + "!");
        });
    }
    setDSiganls() {
        if (this.inPin32 == undefined)
            return;
        let bits = StringHandle_1.stringToIntArray(this.inPin32);
        this.DFFs.forEach(DFF => {
            DFF.setDSiganl(BooleanHandler_1.num2bool(bits.shift()));
        });
    }
    setOutpin32() {
        let OutPins = new Array();
        this.DFFs.forEach(flipflop => {
            OutPins.push(BooleanHandler_1.bool2num(flipflop.getOutPinA().getSignal()));
        });
        this.outPin32 = StringHandle_1.intArrayToString(OutPins);
    }
    getinPin32() {
        return this.inPin32;
    }
    getOutPin32() {
        return this.outPin32;
    }
    getClockSignal() {
        return this.clockSignal;
    }
}
exports._32BitsRegister = _32BitsRegister;
_32BitsRegister.bitsCount = 32;
//# sourceMappingURL=Register.js.map