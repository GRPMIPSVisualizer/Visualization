"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux8Way32 = void 0;
var Mux4Way32_1 = require("./Mux4Way32");
var Mux32_1 = require("./Mux32");
var StringHandle_1 = require("../Library/StringHandle");
var Mux8Way32 = /** @class */ (function () {
    function Mux8Way32(inSignal, Select) {
        this.inPin32 = inSignal;
        this.sel = Select;
        this.outPin32 = StringHandle_1.intArrayToString(Mux8Way32.Mux8Way32(this.inPin32, this.sel));
    }
    Mux8Way32.Mux8Way32 = function (inPin, Select2Way) {
        var mux4Way32A = new Mux4Way32_1.Mux4Way32(inPin.slice(0, 4), Select2Way.slice(1, 3));
        var mux4Way32B = new Mux4Way32_1.Mux4Way32(inPin.slice(4, 8), Select2Way.slice(1, 3));
        // console.log(mux4Way32A);
        // console.log(mux4Way32B);
        return Mux32_1.Mux32.Mux32(StringHandle_1.stringToIntArray(mux4Way32A.outPin32), StringHandle_1.stringToIntArray(mux4Way32B.outPin32), parseInt(Select2Way.charAt(0)));
    };
    return Mux8Way32;
}());
exports.Mux8Way32 = Mux8Way32;
//# sourceMappingURL=Mux8Way32.js.map