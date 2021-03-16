"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wire = void 0;
class Wire {
    constructor(changePin, reactPin, LogicFunc = function (signal) { return signal; }) {
        this.changePin = changePin;
        this.reactPin = reactPin;
        this.reactPin.setSignal(LogicFunc(this.changePin.getSignal()));
        this.changePin.addNotifyChangeFunc(this.reactPin.syncSignal.bind(this.reactPin, this.changePin, LogicFunc));
    }
}
exports.Wire = Wire;
//# sourceMappingURL=Wire.js.map