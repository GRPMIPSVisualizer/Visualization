"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForI = void 0;
/**
 * MapForI stores some type-I core instructions and their corresponding 6 bits opcodes.
 */
class MapForI {
    /**
     * Constructor of MapForI which is a singleton.
     */
    constructor() { }
    /**
     * Method for getting the singleton map.
     * @returns a map which the keys are type-I instructions and the values are their corresponding 6 bits opcodes.
     */
    static getMap() {
        return this.map;
    }
}
exports.MapForI = MapForI;
/**
 * The map which the keys are type-I instructions and the values are their corresponding 6 bits opcodes.
 */
MapForI.map = new Map([
    ["addi", "001000"],
    ["addiu", "001001"],
    ["andi", "001100"],
    ["beq", "000100"],
    ["bne", "000101"],
    ["lbu", "100100"],
    ["lhu", "100101"],
    ["ll", "110000"],
    ["lui", "001111"],
    ["lw", "100011"],
    ["ori", "001101"],
    ["slti", "001010"],
    ["sltiu", "001011"],
    ["sb", "101000"],
    ["sc", "111000"],
    ["sh", "101001"],
    ["sw", "101011"]
]);
