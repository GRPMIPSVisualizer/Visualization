"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux8Way32 = void 0;
const Mux4Way32_1 = require("./Mux4Way32");
const Mux32_1 = require("./Mux32");
const StringHandle_1 = require("../Library/StringHandle");
class Mux8Way32 {
    constructor(inSignal, Select) {
        this.inPin32 = inSignal;
        this.sel = Select;
        this.outPin32 = StringHandle_1.intArrayToString(Mux8Way32.Mux8Way32(this.inPin32, this.sel));
    }
    static Mux8Way32(inPin, Select2Way) {
        let mux4Way32A = new Mux4Way32_1.Mux4Way32(inPin.slice(0, 4), Select2Way.slice(0, 2));
        let mux4Way32B = new Mux4Way32_1.Mux4Way32(inPin.slice(4, 8), Select2Way.slice(0, 2));
        return Mux32_1.Mux32.Mux32(StringHandle_1.stringToIntArray(mux4Way32A.outPin32), StringHandle_1.stringToIntArray(mux4Way32B.outPin32), parseInt(Select2Way.charAt(2)));
    }
}
exports.Mux8Way32 = Mux8Way32;
//# sourceMappingURL=Mux8Way32.js.map