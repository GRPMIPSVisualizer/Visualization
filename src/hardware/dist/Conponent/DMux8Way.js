"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMux8Way = void 0;
var DMux_1 = require("./DMux");
var DMux4Way_1 = require("./DMux4Way");
var StringHandle_1 = require("../Library/StringHandle");
var DMux8Way = /** @class */ (function () {
    function DMux8Way(inPin, Select) {
        this.inPin = inPin;
        this.sel = Select;
        this.outPin = StringHandle_1.intArrayToString(DMux8Way.DMux8Way(this.inPin, StringHandle_1.stringToIntArray(this.sel)));
    }
    DMux8Way.DMux8Way = function (inPin, Select) {
        var temp = [];
        var dmux1 = new DMux_1.DMux(inPin, Select[0]);
        temp = DMux4Way_1.DMux4Way.DMux4Way(dmux1.outPin1, Select.slice(1, 3)).concat(DMux4Way_1.DMux4Way.DMux4Way(dmux1.outPin2, Select.slice(1, 3)));
        return temp;
    };
    return DMux8Way;
}());
exports.DMux8Way = DMux8Way;
//# sourceMappingURL=DMux8Way.js.map