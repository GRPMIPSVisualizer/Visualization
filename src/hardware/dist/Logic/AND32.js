"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AND32 = void 0;
var AND_1 = require("./AND");
var StringHandle_1 = require("../Library/StringHandle");
var AND32 = /** @class */ (function () {
    function AND32(inSignalA, inSignalB) {
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        var bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        var bitB = StringHandle_1.stringToIntArray(this.inPin32B);
        this.outPin32 = StringHandle_1.intArrayToString(AND32.And32(bitA, bitB));
    }
    AND32.And32 = function (BitsA, BitsB) {
        var outBits = [];
        var i = 0;
        BitsA.forEach(function (bit) {
            outBits[i] = AND_1.AND.And(bit, BitsB[i]);
            ++i;
        });
        return outBits;
    };
    return AND32;
}());
exports.AND32 = AND32;
//# sourceMappingURL=AND32.js.map