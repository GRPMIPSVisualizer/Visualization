"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux32 = void 0;
var StringHandle_1 = require("../Library/StringHandle");
var Mux_1 = require("./Mux");
var Mux32 = /** @class */ (function () {
    function Mux32(inSignalA, inSignalB, Select) {
        this.notifyFunc = new Array();
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        this.sel = Select;
        var bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        var bitB = StringHandle_1.stringToIntArray(this.inPin32B);
        this.outPin32 = StringHandle_1.intArrayToString(Mux32.Mux32(bitA, bitB, this.sel));
    }
    Mux32.Mux32 = function (inSignalA, inSignalB, Select) {
        var i = 0;
        var outPin = [];
        inSignalA.forEach(function (bit) {
            outPin.push(Mux_1.Mux.Mux(bit, inSignalB[i], Select));
            ++i;
        });
        return outPin;
    };
    Mux32.prototype.setInpin32A = function (newInPin) {
        this.inPin32A = newInPin;
        this.setOutPin();
    };
    Mux32.prototype.memSetInpin32B = function (_Memory, _PCAdder) {
        var newInpin = StringHandle_1.bitsMapping(_PCAdder.getOutput(), 28, 32) + StringHandle_1.bitsMapping(StringHandle_1.shiftLeftBinary32Bits(_Memory.getTextOutpin()), 0, 28);
        this.setInpin32B(newInpin);
    };
    Mux32.prototype.dataMemSetInpin32B = function (_Memory) {
        if (_Memory.getOutPin32() == undefined)
            return;
        this.setInpin32B(_Memory.getOutPin32());
    };
    Mux32.prototype.setInpin32B = function (newInPin) {
        this.inPin32B = newInPin;
        this.setOutPin();
    };
    Mux32.prototype.setMuxInpin32A = function (MUX) {
        this.setInpin32A(MUX.outPin32);
    };
    Mux32.prototype.setSel = function (newSel) {
        this.sel = newSel;
        this.setOutPin();
    };
    Mux32.prototype.setOutPin = function () {
        this.outPin32 = StringHandle_1.intArrayToString(Mux32.Mux32(StringHandle_1.stringToIntArray(this.inPin32A), StringHandle_1.stringToIntArray(this.inPin32B), this.sel));
        this.notifychange();
    };
    Mux32.prototype.notifychange = function () {
        this.notifyFunc.forEach(function (Func) {
            Func();
        });
    };
    Mux32.prototype.addNotifyFunc = function (newFunc) {
        this.notifyFunc.push(newFunc);
    };
    return Mux32;
}());
exports.Mux32 = Mux32;
//# sourceMappingURL=Mux32.js.map