"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OR32 = void 0;
var OR_1 = require("./OR");
var StringHandle_1 = require("../Library/StringHandle");
var OR32 = /** @class */ (function () {
    function OR32(inSignalA, inSignalB) {
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        var bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        var bitB = StringHandle_1.stringToIntArray(this.inPin32B);
        this.outPin32 = StringHandle_1.intArrayToString(OR32.Or32(bitA, bitB));
    }
    OR32.Or32 = function (BitsA, BitsB) {
        var outBits = [];
        var i = 0;
        BitsA.forEach(function (bit) {
            outBits[i] = OR_1.OR.Or(bit, BitsB[i]);
            ++i;
        });
        return outBits;
    };
    return OR32;
}());
exports.OR32 = OR32;
//# sourceMappingURL=OR32.js.map