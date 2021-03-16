"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT32 = void 0;
var NOT_1 = require("./NOT");
var StringHandle_1 = require("../Library/StringHandle");
var NOT32 = /** @class */ (function () {
    function NOT32(inSignalA) {
        this.inPin32A = inSignalA;
        var bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        this.outPin32 = StringHandle_1.intArrayToString(NOT32.Not32(bitA));
    }
    NOT32.Not32 = function (BitsA) {
        var outBits = [];
        var i = 0;
        BitsA.forEach(function (bit) {
            outBits[i] = NOT_1.NOT.Not(bit);
            ++i;
        });
        return outBits;
    };
    return NOT32;
}());
exports.NOT32 = NOT32;
//# sourceMappingURL=NOT32.js.map