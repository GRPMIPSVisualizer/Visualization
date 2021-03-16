"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignExtend = void 0;
const StringHandle_1 = require("../Library/StringHandle");
class SignExtend {
    constructor() {
        this.inPin16 = "0000000000000000";
        this.outPin32 = "";
        this.signExtend();
    }
    setInPin16(inPin) {
        if (inPin.length != 16)
            throw Error("Sign Extend Input length is not 16.");
        StringHandle_1.binaryDetect(inPin);
        this.inPin16 = inPin;
        this.signExtend();
    }
    signExtend() {
        this.outPin32 = "0000000000000000" + this.inPin16;
    }
    getOutPin32() {
        return this.outPin32;
    }
}
exports.SignExtend = SignExtend;
//# sourceMappingURL=Sign-extend.js.map