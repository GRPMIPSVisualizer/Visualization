"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signal = void 0;
const BooleanHandler_1 = require("../Library/BooleanHandler");
class Signal {
    //debug
    // public name:string="";
    constructor(signal, reactFunc = function () { }) {
        this.signal = signal;
        this.reactFunc = reactFunc;
        this.notifyChangeFuncs = new Array();
    }
    getSignal() {
        return this.signal;
    }
    changeSiganl() {
        if (typeof this.signal === "boolean")
            this.signal = !this.signal;
        if (typeof this.signal === "number")
            this.signal = BooleanHandler_1.bool2num(!BooleanHandler_1.num2bool(this.signal));
        this.SignalKeep();
    }
    setReactFunc(reactFunc) {
        this.reactFunc = reactFunc;
    }
    setSignal(signal) {
        this.signal = signal;
        this.SignalKeep();
    }
    SignalKeep() {
        this.notifyChange();
        this.reactFunc();
    }
    addNotifyChangeFunc(notifychangeFunc) {
        this.notifyChangeFuncs.push(notifychangeFunc);
    }
    notifyChange() {
        if (this.notifyChangeFuncs.length === 0)
            return;
        this.notifyChangeFuncs.forEach(changeFuncs => {
            changeFuncs();
        });
    }
    syncSignal(changedSignal, LogicFunc) {
        this.setSignal(LogicFunc(changedSignal.getSignal()));
    }
}
exports.Signal = Signal;
//# sourceMappingURL=Signal.js.map