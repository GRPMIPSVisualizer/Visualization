"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux = void 0;
const AND_1 = require("../Logic/AND");
const NOT_1 = require("../Logic/NOT");
const OR_1 = require("../Logic/OR");
/**
 * This is not Logic
 */
class Mux {
    constructor(inPin1, inPin2, Select) {
        this.inPin1 = inPin1;
        this.inPin2 = inPin2;
        this.sel = Select;
        this.outPin = Mux.Mux(this.inPin1, this.inPin2, this.sel);
    }
    static Mux(inPin1, inPin2, Select) {
        let nots = new NOT_1.NOT(Select);
        let and1 = new AND_1.AND(inPin2, Select);
        let and2 = new AND_1.AND(inPin1, nots.outpin);
        return OR_1.OR.Or(and1.outpin, and2.outpin);
    }
}
exports.Mux = Mux;
//# sourceMappingURL=Mux.js.map