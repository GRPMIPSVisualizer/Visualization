"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForR = void 0;
class MapForR {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            let addFunct = "100000";
            let adduFunct = "100001";
            let subFunct = "100010";
            let subuFunct = "100011";
            let andFunct = "100100";
            let orFunct = "100101";
            let norFunct = "100111";
            let sltFunct = "101010";
            let sltuFunct = "101011";
            let sllFunct = "000000";
            let srlFunct = "000010";
            let jrFunct = "001000";
            this.map.set("add", addFunct);
            this.map.set("addu", adduFunct);
            this.map.set("sub", subFunct);
            this.map.set("subu", subuFunct);
            this.map.set("and", andFunct);
            this.map.set("or", orFunct);
            this.map.set("nor", norFunct);
            this.map.set("slt", sltFunct);
            this.map.set("sltu", sltuFunct);
            this.map.set("sll", sllFunct);
            this.map.set("srl", srlFunct);
            this.map.set("jr", jrFunct);
        }
        return this.map;
    }
}
exports.MapForR = MapForR;
MapForR.map = new Map();
