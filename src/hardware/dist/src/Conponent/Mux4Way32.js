"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux4Way32 = void 0;
const Mux32_1 = require("./Mux32");
const StringHandle_1 = require("../Library/StringHandle");
class Mux4Way32 {
    constructor(inSignal, Select) {
        this.inPin32 = inSignal;
        this.sel = Select;
        let bits = [];
        let index = 0;
        this.inPin32.forEach(pin => {
            bits[index] = StringHandle_1.stringToIntArray(pin);
            ++index;
        });
        let selBit = StringHandle_1.stringToIntArray(this.sel);
        this.outPin32 = StringHandle_1.intArrayToString(Mux4Way32.Mux4Way32(bits, selBit));
    }
    static Mux4Way32(inPin, Select2Way) {
        let mux32A = new Mux32_1.Mux32(StringHandle_1.intArrayToString(inPin[0]), StringHandle_1.intArrayToString(inPin[1]), Select2Way[1]);
        let mux32B = new Mux32_1.Mux32(StringHandle_1.intArrayToString(inPin[2]), StringHandle_1.intArrayToString(inPin[3]), Select2Way[1]);
        return Mux32_1.Mux32.Mux32(StringHandle_1.stringToIntArray(mux32A.outPin32), StringHandle_1.stringToIntArray(mux32B.outPin32), Select2Way[0]);
    }
}
exports.Mux4Way32 = Mux4Way32;
//# sourceMappingURL=Mux4Way32.js.map