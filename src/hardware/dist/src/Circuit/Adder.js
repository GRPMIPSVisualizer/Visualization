"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adder = void 0;
const AND_1 = require("../Logic/AND");
const XOR_1 = require("../Logic/XOR");
const OR_1 = require("../Logic/OR");
const Mux_1 = require("../Conponent/Mux");
const StringHandle_1 = require("../Library/StringHandle");
class Adder {
    constructor(inSignalA, inSignalB) {
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        let bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        let bitB = StringHandle_1.stringToIntArray(this.inPin32B);
        this.outPin32 = StringHandle_1.intArrayToString(this.Adder32(bitA, bitB));
        this.carry = 0;
    }
    static halfAdder(inPin1, inPin2) {
        let carry = AND_1.AND.And(inPin1, inPin2);
        let sum = XOR_1.XOR.Xor(inPin1, inPin2);
        return [carry, sum];
    }
    static fullAdder(inPin1, inPin2, carry) {
        let Pin0 = OR_1.OR.Or(inPin1, inPin2);
        let Pin1 = AND_1.AND.And(inPin1, inPin2);
        let Pin2 = XOR_1.XOR.Xor(inPin1, inPin2);
        let sum = XOR_1.XOR.Xor(Pin2, carry);
        let newCarry = Mux_1.Mux.Mux(Pin1, Pin0, carry);
        return [newCarry, sum];
    }
    Adder32(inSignalA, inSignalB) {
        let outPin = new Array(32);
        let carry = 0;
        [carry, outPin[31]] = Adder.halfAdder(inSignalA[31], inSignalB[31]);
        for (let i = 1; i < inSignalA.length; ++i) {
            [carry, outPin[31 - i]] = Adder.fullAdder(inSignalA[31 - i], inSignalB[31 - i], carry);
            // console.log(carry,outPin[i]);
        }
        this.carry = carry;
        return outPin;
    }
    newInPin(inSignalA, inSignalB) {
        this.inPin32A = StringHandle_1.intArrayToString(inSignalA);
        this.inPin32B = StringHandle_1.intArrayToString(inSignalB);
        this.outPin32 = StringHandle_1.intArrayToString(this.Adder32(inSignalA, inSignalB));
    }
    getOutputAt(i) {
        return parseInt(this.outPin32.charAt(i));
    }
    getOutput() {
        return this.outPin32;
    }
    getInpinAAt(i) {
        return parseInt(this.inPin32A.charAt(i));
    }
    getInpinBAt(i) {
        return parseInt(this.inPin32B.charAt(i));
    }
}
exports.Adder = Adder;
//# sourceMappingURL=Adder.js.map