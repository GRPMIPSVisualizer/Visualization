"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMux8Way = void 0;
const DMux_1 = require("./DMux");
const DMux4Way_1 = require("./DMux4Way");
const StringHandle_1 = require("../Library/StringHandle");
class DMux8Way {
    constructor(inPin, Select) {
        this.inPin = inPin;
        this.sel = Select;
        this.outPin = StringHandle_1.intArrayToString(DMux8Way.DMux8Way(this.inPin, StringHandle_1.stringToIntArray(this.sel)));
    }
    static DMux8Way(inPin, Select) {
        let temp = [];
        let dmux1 = new DMux_1.DMux(inPin, Select[0]);
        temp = DMux4Way_1.DMux4Way.DMux4Way(dmux1.outPin1, Select.slice(1, 3)).concat(DMux4Way_1.DMux4Way.DMux4Way(dmux1.outPin2, Select.slice(1, 3)));
        return temp;
    }
}
exports.DMux8Way = DMux8Way;
//# sourceMappingURL=DMux8Way.js.map