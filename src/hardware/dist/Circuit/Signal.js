"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signal = void 0;
var BooleanHandler_1 = require("../Library/BooleanHandler");
var Signal = /** @class */ (function () {
    //debug
    // public name:string="";
    function Signal(signal, reactFunc) {
        if (reactFunc === void 0) { reactFunc = function () { }; }
        this.signal = signal;
        this.reactFunc = reactFunc;
        this.notifyChangeFuncs = new Array();
    }
    Signal.prototype.getSignal = function () {
        return this.signal;
    };
    Signal.prototype.changeSiganl = function () {
        if (typeof this.signal === "boolean")
            this.signal = !this.signal;
        if (typeof this.signal === "number")
            this.signal = BooleanHandler_1.bool2num(!BooleanHandler_1.num2bool(this.signal));
        this.SignalKeep();
    };
    Signal.prototype.setReactFunc = function (reactFunc) {
        this.reactFunc = reactFunc;
    };
    Signal.prototype.setSignal = function (signal) {
        this.signal = signal;
        this.SignalKeep();
    };
    Signal.prototype.SignalKeep = function () {
        this.notifyChange();
        this.reactFunc();
    };
    Signal.prototype.addNotifyChangeFunc = function (notifychangeFunc) {
        this.notifyChangeFuncs.push(notifychangeFunc);
    };
    Signal.prototype.notifyChange = function () {
        if (this.notifyChangeFuncs.length === 0)
            return;
        this.notifyChangeFuncs.forEach(function (changeFuncs) {
            changeFuncs();
        });
    };
    Signal.prototype.syncSignal = function (changedSignal, LogicFunc) {
        this.setSignal(LogicFunc(changedSignal.getSignal()));
    };
    return Signal;
}());
exports.Signal = Signal;
//# sourceMappingURL=Signal.js.map