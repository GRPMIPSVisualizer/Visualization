"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMux4Way = void 0;
var DMux_1 = require("./DMux");
var StringHandle_1 = require("../Library/StringHandle");
var DMux4Way = /** @class */ (function () {
    function DMux4Way(inPin, Select) {
        this.inPin = inPin;
        this.sel = Select;
        this.outPin = StringHandle_1.intArrayToString(DMux4Way.DMux4Way(this.inPin, StringHandle_1.stringToIntArray(this.sel)));
    }
    DMux4Way.DMux4Way = function (inPin, Select) {
        var temp = [];
        var dmux1 = new DMux_1.DMux(inPin, Select[0]);
        temp = DMux_1.DMux.DMux(dmux1.outPin1, Select[1]).concat(DMux_1.DMux.DMux(dmux1.outPin2, Select[1]));
        return temp;
    };
    return DMux4Way;
}());
exports.DMux4Way = DMux4Way;
//# sourceMappingURL=DMux4Way.js.map