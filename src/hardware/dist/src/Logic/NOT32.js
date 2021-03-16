"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT32 = void 0;
const NOT_1 = require("./NOT");
const StringHandle_1 = require("../Library/StringHandle");
class NOT32 {
    constructor(inSignalA) {
        this.inPin32A = inSignalA;
        let bitA = StringHandle_1.stringToIntArray(this.inPin32A);
        this.outPin32 = StringHandle_1.intArrayToString(NOT32.Not32(bitA));
    }
    static Not32(BitsA) {
        let outBits = [];
        let i = 0;
        BitsA.forEach((bit) => {
            outBits[i] = NOT_1.NOT.Not(bit);
            ++i;
        });
        return outBits;
    }
}
exports.NOT32 = NOT32;
//# sourceMappingURL=NOT32.js.map