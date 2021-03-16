"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignExtend = void 0;
var StringHandle_1 = require("../Library/StringHandle");
var SignExtend = /** @class */ (function () {
    function SignExtend() {
        this.inPin16 = "0000000000000000";
        this.outPin32 = "";
        this.signExtend();
    }
    SignExtend.prototype.setInPin16 = function (inPin) {
        if (inPin.length != 16)
            throw Error("Sign Extend Input length is not 16.");
        StringHandle_1.binaryDetect(inPin);
        this.inPin16 = inPin;
        this.signExtend();
    };
    SignExtend.prototype.signExtend = function () {
        this.outPin32 = "0000000000000000" + this.inPin16;
    };
    SignExtend.prototype.getOutPin32 = function () {
        return this.outPin32;
    };
    return SignExtend;
}());
exports.SignExtend = SignExtend;
//# sourceMappingURL=Sign-extend.js.map