"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = void 0;
class Decoder {
    constructor() {
        this.ins = "";
        this.operator = "";
        this.binIns = "";
    }
    setIns(ins) {
        this.ins = ins;
        var posOfSpace = this.ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }
    getIns() {
        return this.ins;
    }
    getBinIns() {
        return this.binIns;
    }
}
exports.Decoder = Decoder;
