"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForI = void 0;
class MapForI {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            let addiOp = "001000";
            let addiuOp = "001001";
            let andiOp = "001100";
            let beqOp = "000100";
            let bneOp = "000101";
            let lbuOp = "100100";
            let lhuOp = "100101";
            let llOp = "110000";
            let luiOp = "001111";
            let lwOp = "100011";
            let oriOp = "001101";
            let sltiOp = "001010";
            let sltiuOp = "001011";
            let sbOp = "101000";
            let scOp = "111000";
            let shOp = "101001";
            let swOp = "101011";
            this.map.set("addi", addiOp);
            this.map.set("addiu", addiuOp);
            this.map.set("andi", andiOp);
            this.map.set("beq", beqOp);
            this.map.set("bne", bneOp);
            this.map.set("lbu", lbuOp);
            this.map.set("lhu", lhuOp);
            this.map.set("ll", llOp);
            this.map.set("lui", luiOp);
            this.map.set("lw", lwOp);
            this.map.set("ori", oriOp);
            this.map.set("slti", sltiOp);
            this.map.set("sltiu", sltiuOp);
            this.map.set("sb", sbOp);
            this.map.set("sc", scOp);
            this.map.set("sh", shOp);
            this.map.set("sw", swOp);
        }
        return this.map;
    }
}
exports.MapForI = MapForI;
MapForI.map = new Map();
