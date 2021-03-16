"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMux = void 0;
var AND_1 = require("../Logic/AND");
var NOT_1 = require("../Logic/NOT");
/**
 * This is not Logic
 */
var DMux = /** @class */ (function () {
    function DMux(inPin, Select) {
        this.inPin = inPin;
        this.sel = Select;
        var temp = [];
        temp = DMux.DMux(this.inPin, this.sel);
        this.outPin1 = temp[0];
        this.outPin2 = temp[1];
    }
    DMux.DMux = function (inPin, Select) {
        var temp = [];
        var nots = new NOT_1.NOT(Select);
        temp.push(AND_1.AND.And(nots.outpin, inPin));
        temp.push(AND_1.AND.And(Select, inPin));
        return temp;
    };
    return DMux;
}());
exports.DMux = DMux;
//# sourceMappingURL=DMux.js.map