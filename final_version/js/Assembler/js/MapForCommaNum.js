"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForCommaNum = void 0;
class MapForCommaNum {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            this.map.set("add", 2);
            this.map.set("addu", 2);
            this.map.set("sub", 2);
            this.map.set("subu", 2);
            this.map.set("and", 2);
            this.map.set("or", 2);
            this.map.set("nor", 2);
            this.map.set("slt", 2);
            this.map.set("sltu", 2);
            this.map.set("sll", 2);
            this.map.set("srl", 2);
            this.map.set("jr", 0);
            this.map.set("addi", 2);
            this.map.set("addiu", 2);
            this.map.set("andi", 2);
            this.map.set("beq", 2);
            this.map.set("bne", 2);
            this.map.set("lbu", 1);
            this.map.set("lhu", 1);
            this.map.set("ll", 1);
            this.map.set("lui", 1);
            this.map.set("lw", 1);
            this.map.set("ori", 2);
            this.map.set("slti", 2);
            this.map.set("sltiu", 2);
            this.map.set("sb", 1);
            this.map.set("sc", 1);
            this.map.set("sh", 1);
            this.map.set("sw", 1);
            this.map.set("j", 0);
            this.map.set("jal", 0);
        }
        return this.map;
    }
}
exports.MapForCommaNum = MapForCommaNum;
MapForCommaNum.map = new Map();
