"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForR = void 0;
/**
 * MapForR stores some type-R core instructions and their corresponding 6 bits funct codes.
 */
class MapForR {
    /**
     * Constructor of MapForR which is a singleton.
     */
    constructor() { }
    /**
     * Method for getting the singleton map.
     * @returns a map which the keys are type-R instructions and the values are their corresponding 6 bits funct codes.
     */
    static getMap() {
        return this.map;
    }
}
exports.MapForR = MapForR;
/**
 * The map which the keys are type-R instructions and the values are their corresponding 6 bits funct codes.
 */
MapForR.map = new Map([
    ["add", "100000"],
    ["addu", "100001"],
    ["sub", "100010"],
    ["subu", "100011"],
    ["and", "100100"],
    ["or", "100101"],
    ["nor", "100111"],
    ["slt", "101010"],
    ["sltu", "101011"],
    ["sll", "000000"],
    ["srl", "000010"],
    ["jr", "001000"],
    ["sra", "000011"]
]);
