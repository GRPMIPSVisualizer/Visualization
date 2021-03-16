"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wired = void 0;
const Wire_1 = require("./Wire");
class Wired {
    constructor() {
        this.Wires = new Array();
    }
    addWire(changeSignal, reactSiganl, LogicFunc) {
        let newWire = (LogicFunc === undefined) ? new Wire_1.Wire(changeSignal, reactSiganl) : new Wire_1.Wire(changeSignal, reactSiganl, LogicFunc);
        this.Wires.push(newWire);
    }
}
exports.Wired = Wired;
//# sourceMappingURL=Wired.js.map