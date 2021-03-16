"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OR32WAY = void 0;
const OR_1 = require("./OR");
const StringHandle_1 = require("../Library/StringHandle");
class OR32WAY {
    constructor(inSignalA) {
        this.inPin32 = inSignalA;
        let bitA = StringHandle_1.stringToIntArray(this.inPin32);
        this.outPin32 = OR32WAY.Or32Way(bitA);
    }
    static Or32Way(BitsA) {
        let outPin = 0;
        BitsA.forEach((bit) => {
            outPin = OR_1.OR.Or(outPin, bit);
        });
        return outPin;
    }
}
exports.OR32WAY = OR32WAY;
//# sourceMappingURL=OR32WAY.js.map