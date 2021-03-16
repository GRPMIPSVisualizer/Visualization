"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMux = void 0;
const AND_1 = require("../Logic/AND");
const NOT_1 = require("../Logic/NOT");
/**
 * This is not Logic
 */
class DMux {
    constructor(inPin, Select) {
        this.inPin = inPin;
        this.sel = Select;
        let temp = [];
        temp = DMux.DMux(this.inPin, this.sel);
        this.outPin1 = temp[0];
        this.outPin2 = temp[1];
    }
    static DMux(inPin, Select) {
        let temp = [];
        let nots = new NOT_1.NOT(Select);
        temp.push(AND_1.AND.And(nots.outpin, inPin));
        temp.push(AND_1.AND.And(Select, inPin));
        return temp;
    }
}
exports.DMux = DMux;
//# sourceMappingURL=DMux.js.map