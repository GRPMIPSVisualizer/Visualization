"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adder = void 0;
var AND_1 = require("../Logic/AND");
var XOR_1 = require("../Logic/XOR");
var OR_1 = require("../Logic/OR");
var Mux_1 = require("../Conponent/Mux");
var StringHandle_1 = require("../Library/StringHandle");
var Adder = /** @class */ (function () {
    function Adder(inSignalA, inSignalB) {
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        var bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        var bitB = StringHandle_1.stringToIntArray(this.inPin32B);
        this.outPin32 = StringHandle_1.intArrayToString(this.Adder32(bitA, bitB));
        this.carry = 0;
    }
    Adder.halfAdder = function (inPin1, inPin2) {
        var carry = AND_1.AND.And(inPin1, inPin2);
        var sum = XOR_1.XOR.Xor(inPin1, inPin2);
        return [carry, sum];
    };
    Adder.fullAdder = function (inPin1, inPin2, carry) {
        var Pin0 = OR_1.OR.Or(inPin1, inPin2);
        var Pin1 = AND_1.AND.And(inPin1, inPin2);
        var Pin2 = XOR_1.XOR.Xor(inPin1, inPin2);
        var sum = XOR_1.XOR.Xor(Pin2, carry);
        var newCarry = Mux_1.Mux.Mux(Pin1, Pin0, carry);
        return [newCarry, sum];
    };
    Adder.prototype.Adder32 = function (inSignalA, inSignalB) {
        var _a, _b;
        var outPin = new Array(32);
        var carry = 0;
        _a = Adder.halfAdder(inSignalA[31], inSignalB[31]), carry = _a[0], outPin[31] = _a[1];
        for (var i = 1; i < inSignalA.length; ++i) {
            _b = Adder.fullAdder(inSignalA[31 - i], inSignalB[31 - i], carry), carry = _b[0], outPin[31 - i] = _b[1];
            // console.log(carry,outPin[i]);
        }
        this.carry = carry;
        return outPin;
    };
    Adder.prototype.newInPin = function (inSignalA, inSignalB) {
        this.inPin32A = StringHandle_1.intArrayToString(inSignalA);
        this.inPin32B = StringHandle_1.intArrayToString(inSignalB);
        this.outPin32 = StringHandle_1.intArrayToString(this.Adder32(inSignalA, inSignalB));
    };
    Adder.prototype.getOutputAt = function (i) {
        return parseInt(this.outPin32.charAt(i));
    };
    Adder.prototype.getOutput = function () {
        return this.outPin32;
    };
    Adder.prototype.getInpinAAt = function (i) {
        return parseInt(this.inPin32A.charAt(i));
    };
    Adder.prototype.getInpinBAt = function (i) {
        return parseInt(this.inPin32B.charAt(i));
    };
    return Adder;
}());
exports.Adder = Adder;
//# sourceMappingURL=Adder.js.map