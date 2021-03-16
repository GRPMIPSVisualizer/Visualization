"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wired = void 0;
var Wire_1 = require("./Wire");
var Wired = /** @class */ (function () {
    function Wired() {
        this.Wires = new Array();
    }
    Wired.prototype.addWire = function (changeSignal, reactSiganl, LogicFunc) {
        var newWire = (LogicFunc === undefined) ? new Wire_1.Wire(changeSignal, reactSiganl) : new Wire_1.Wire(changeSignal, reactSiganl, LogicFunc);
        this.Wires.push(newWire);
    };
    return Wired;
}());
exports.Wired = Wired;
//# sourceMappingURL=Wired.js.map