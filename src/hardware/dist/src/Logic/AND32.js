"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AND32 = void 0;
const AND_1 = require("./AND");
const StringHandle_1 = require("../Library/StringHandle");
class AND32 {
    constructor(inSignalA, inSignalB) {
        this.inPin32A = inSignalA;
        this.inPin32B = inSignalB;
        let bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        let bitB = StringHandle_1.stringToIntArray(this.inPin32B);
        this.outPin32 = StringHandle_1.intArrayToString(AND32.And32(bitA, bitB));
    }
    static And32(BitsA, BitsB) {
        let outBits = [];
        let i = 0;
        BitsA.forEach((bit) => {
            outBits[i] = AND_1.AND.And(bit, BitsB[i]);
            ++i;
        });
        return outBits;
    }
}
exports.AND32 = AND32;
//# sourceMappingURL=AND32.js.map