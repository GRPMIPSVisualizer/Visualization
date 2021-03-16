"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALU = void 0;
var Adder_1 = require("./Adder");
var AND32_1 = require("../Logic/AND32");
var OR32_1 = require("../Logic/OR32");
var StringHandle_1 = require("../Library/StringHandle");
var NOT32_1 = require("../Logic/NOT32");
var Mux4Way32_1 = require("../Conponent/Mux4Way32");
var ALU = /** @class */ (function () {
    function ALU(inPinA, inPinB, control) {
        this.outPin32 = "";
        this.inPin32A = inPinA;
        this.inPin32B = inPinB;
        this.controlBits = control;
        this.isUnsign = false;
        this.isOverflow = false;
        this.isZero = false;
        this.Adder32 = new Adder_1.Adder(inPinA, inPinB);
        this.outPin32 = StringHandle_1.decToUnsignedBin32(0);
    }
    ALU.prototype.getOutPin32 = function () {
        return this.outPin32;
    };
    ALU.prototype.ALU = function () {
        var control = StringHandle_1.stringToIntArray(this.controlBits);
        var pinA = StringHandle_1.stringToIntArray(this.inPin32A);
        var pinB = StringHandle_1.stringToIntArray(this.inPin32B);
        if (control[0])
            pinA = NOT32_1.NOT32.Not32(pinA);
        if (control[1])
            pinB = NOT32_1.NOT32.Not32(pinB);
        if (StringHandle_1.intArrayToString(control) == "0110") {
            if (!this.isUnsign) {
                pinB = StringHandle_1.stringToIntArray(StringHandle_1.decToSignedBin32(StringHandle_1.bin2dec(StringHandle_1.intArrayToString(pinB), this.isUnsign) + 1));
            }
            else {
                pinB = StringHandle_1.stringToIntArray(StringHandle_1.decToUnsignedBin32(StringHandle_1.bin2dec(StringHandle_1.intArrayToString(pinB), this.isUnsign) + 1));
            }
        }
        var or32 = OR32_1.OR32.Or32(pinA, pinB);
        var and32 = AND32_1.AND32.And32(pinA, pinB);
        this.Adder32.newInPin(pinA, pinB);
        this.overflowDetect(this.Adder32.getInpinAAt(0), this.Adder32.getInpinBAt(0), this.Adder32.getOutputAt(0), this.Adder32.carry);
        var inpin = [and32, or32, StringHandle_1.stringToIntArray(this.Adder32.getOutput()), StringHandle_1.stringToIntArray(StringHandle_1.decToSignedBin32(this.Adder32.getOutputAt(0)))];
        // console.log(inpin[0],and32);
        this.setOutPin(StringHandle_1.intArrayToString(Mux4Way32_1.Mux4Way32.Mux4Way32(inpin, [control[2], control[3]])));
        this.detectZero();
    };
    ALU.prototype.overflowDetect = function (lastPinA, lastPinB, lastOut, carry) {
        // console.log(lastPinA,lastPinB,!lastOut);
        if (this.isUnsign) {
            if (carry) {
                this.isOverflow = true;
            }
            else {
                this.isOverflow = false;
            }
        }
        else {
            if ((lastPinA && lastPinB && !lastOut) || (!lastPinA && !lastPinB && lastOut)) {
                this.isOverflow = true;
            }
            else {
                this.isOverflow = false;
            }
        }
    };
    ALU.prototype.detectZero = function () {
        for (var i = 0; i < this.outPin32.length; ++i) {
            if (parseInt(this.outPin32.charAt(i)) != 0) {
                this.isZero = false;
                return;
            }
        }
        this.isZero = true;
    };
    ALU.prototype.newSignal = function (inPinA, inPinB, controlBits) {
        this.inPin32A = inPinA;
        this.inPin32B = inPinB;
        this.controlBits = controlBits;
        this.ALU();
    };
    ALU.prototype.setControlBits = function (conBits) {
        this.controlBits = conBits;
        this.ALU();
    };
    ALU.prototype.setInpinA = function (inPin) {
        this.inPin32A = inPin;
        this.ALU();
    };
    ALU.prototype.setMuxInpinB = function (MUX) {
        this.inPin32B = MUX.outPin32;
        this.ALU();
    };
    ALU.prototype.setOutPin = function (outPin) {
        this.outPin32 = outPin;
    };
    return ALU;
}());
exports.ALU = ALU;
//# sourceMappingURL=ALU.js.map