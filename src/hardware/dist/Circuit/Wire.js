"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wire = void 0;
var Wire = /** @class */ (function () {
    function Wire(changePin, reactPin, LogicFunc) {
        if (LogicFunc === void 0) { LogicFunc = function (signal) { return signal; }; }
        this.changePin = changePin;
        this.reactPin = reactPin;
        this.reactPin.setSignal(LogicFunc(this.changePin.getSignal()));
        this.changePin.addNotifyChangeFunc(this.reactPin.syncSignal.bind(this.reactPin, this.changePin, LogicFunc));
    }
    return Wire;
}());
exports.Wire = Wire;
//# sourceMappingURL=Wire.js.map