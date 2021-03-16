"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OR32WAY = void 0;
var OR_1 = require("./OR");
var StringHandle_1 = require("../Library/StringHandle");
var OR32WAY = /** @class */ (function () {
    function OR32WAY(inSignalA) {
        this.inPin32 = inSignalA;
        var bitA = StringHandle_1.stringToIntArray(this.inPin32);
        this.outPin32 = OR32WAY.Or32Way(bitA);
    }
    OR32WAY.Or32Way = function (BitsA) {
        var outPin = 0;
        BitsA.forEach(function (bit) {
            outPin = OR_1.OR.Or(outPin, bit);
        });
        return outPin;
    };
    return OR32WAY;
}());
exports.OR32WAY = OR32WAY;
//# sourceMappingURL=OR32WAY.js.map