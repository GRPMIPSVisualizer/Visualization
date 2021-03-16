"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForJ = void 0;
class MapForJ {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            let jOp = "000010";
            let jalOp = "000011";
            this.map.set("j", jOp);
            this.map.set("jal", jalOp);
        }
        return this.map;
    }
}
exports.MapForJ = MapForJ;
MapForJ.map = new Map();
