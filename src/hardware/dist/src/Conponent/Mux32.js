"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux32 = void 0;
const StringHandle_1 = require("../Library/StringHandle");
const Mux_1 = require("./Mux");
class Mux32 {
    constructor(inSignalA, inSignalB, Select) {
        this.notifyFunc = new Array();
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        this.sel = Select;
        let bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        let bitB = StringHandle_1.stringToIntArray(this.inPin32B);
        this.outPin32 = StringHandle_1.intArrayToString(Mux32.Mux32(bitA, bitB, this.sel));
    }
    static Mux32(inSignalA, inSignalB, Select) {
        let i = 0;
        let outPin = [];
        inSignalA.forEach((bit) => {
            outPin.push(Mux_1.Mux.Mux(bit, inSignalB[i], Select));
            ++i;
        });
        return outPin;
    }
    setInpin32A(newInPin) {
        this.inPin32A = newInPin;
        this.setOutPin();
    }
    memSetInpin32B(_Memory, _PCAdder) {
        let newInpin = StringHandle_1.bitsMapping(_PCAdder.getOutput(), 28, 32) + StringHandle_1.bitsMapping(StringHandle_1.shiftLeftBinary32Bits(_Memory.getTextOutpin()), 0, 28);
        this.setInpin32B(newInpin);
    }
    dataMemSetInpin32B(_Memory) {
        if (_Memory.getOutPin32() == undefined)
            return;
        this.setInpin32B(_Memory.getOutPin32());
    }
    setInpin32B(newInPin) {
        this.inPin32B = newInPin;
        this.setOutPin();
    }
    setMuxInpin32A(MUX) {
        this.setInpin32A(MUX.outPin32);
    }
    setSel(newSel) {
        this.sel = newSel;
        this.setOutPin();
    }
    setOutPin() {
        this.outPin32 = StringHandle_1.intArrayToString(Mux32.Mux32(StringHandle_1.stringToIntArray(this.inPin32A), StringHandle_1.stringToIntArray(this.inPin32B), this.sel));
        this.notifychange();
    }
    notifychange() {
        this.notifyFunc.forEach(Func => {
            Func();
        });
    }
    addNotifyFunc(newFunc) {
        this.notifyFunc.push(newFunc);
    }
}
exports.Mux32 = Mux32;
//# sourceMappingURL=Mux32.js.map