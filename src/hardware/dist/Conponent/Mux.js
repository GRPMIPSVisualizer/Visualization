"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mux = void 0;
var AND_1 = require("../Logic/AND");
var NOT_1 = require("../Logic/NOT");
var OR_1 = require("../Logic/OR");
/**
 * This is not Logic
 */
var Mux = /** @class */ (function () {
    function Mux(inPin1, inPin2, Select) {
        this.inPin1 = inPin1;
        this.inPin2 = inPin2;
        this.sel = Select;
        this.outPin = Mux.Mux(this.inPin1, this.inPin2, this.sel);
    }
    Mux.Mux = function (inPin1, inPin2, Select) {
        var nots = new NOT_1.NOT(Select);
        var and1 = new AND_1.AND(inPin2, Select);
        var and2 = new AND_1.AND(inPin1, nots.outpin);
        return OR_1.OR.Or(and1.outpin, and2.outpin);
    };
    return Mux;
}());
exports.Mux = Mux;
//# sourceMappingURL=Mux.js.map