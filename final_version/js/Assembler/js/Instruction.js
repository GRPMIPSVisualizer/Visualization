"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruction = void 0;
class Instruction {
    constructor(ins) {
        this.ins = ins;
        this.binIns = "";
        let posOfSpace = ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }
    getBinIns() {
        return this.binIns;
    }
}
exports.Instruction = Instruction;
