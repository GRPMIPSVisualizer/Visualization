"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux4Way32 = void 0;
var Mux32_1 = require("./Mux32");
var StringHandle_1 = require("../Library/StringHandle");
var Mux4Way32 = /** @class */ (function () {
    function Mux4Way32(inSignal, Select) {
        this.inPin32 = inSignal;
        this.sel = Select;
        var bits = [];
        var index = 0;
        this.inPin32.forEach(function (pin) {
            bits[index] = StringHandle_1.stringToIntArray(pin);
            ++index;
        });
        var selBit = StringHandle_1.stringToIntArray(this.sel);
        this.outPin32 = StringHandle_1.intArrayToString(Mux4Way32.Mux4Way32(bits, selBit));
    }
    Mux4Way32.Mux4Way32 = function (inPin, Select2Way) {
        var mux32A = new Mux32_1.Mux32(StringHandle_1.intArrayToString(inPin[0]), StringHandle_1.intArrayToString(inPin[1]), Select2Way[1]);
        var mux32B = new Mux32_1.Mux32(StringHandle_1.intArrayToString(inPin[2]), StringHandle_1.intArrayToString(inPin[3]), Select2Way[1]);
        return Mux32_1.Mux32.Mux32(StringHandle_1.stringToIntArray(mux32A.outPin32), StringHandle_1.stringToIntArray(mux32B.outPin32), Select2Way[0]);
    };
    return Mux4Way32;
}());
exports.Mux4Way32 = Mux4Way32;
//# sourceMappingURL=Mux4Way32.js.map