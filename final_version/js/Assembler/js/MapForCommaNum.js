"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForCommaNum = void 0;
/**
 * MapForCommaNum stores core instructions and amount of the commas in the instructions.
 */
class MapForCommaNum {
    /**
     * Constructor of MapForCommaNum which is a singleton.
     */
    constructor() { }
    /**
     * Method for getting the singleton map.
     * @returns a map which the keys are instructions and the values are their amount of commas.
     */
    static getMap() {
        return this.map;
    }
}
exports.MapForCommaNum = MapForCommaNum;
/**
 * The map which the keys are instructions and the values are their amount of commas.
 */
MapForCommaNum.map = new Map([
    ["add", 2],
    ["addu", 2],
    ["sub", 2],
    ["subu", 2],
    ["and", 2],
    ["or", 2],
    ["nor", 2],
    ["slt", 2],
    ["sltu", 2],
    ["sll", 2],
    ["srl", 2],
    ["jr", 0],
    ["addi", 2],
    ["addiu", 2],
    ["andi", 2],
    ["beq", 2],
    ["bne", 2],
    ["lbu", 1],
    ["lhu", 1],
    ["ll", 1],
    ["lui", 1],
    ["lw", 1],
    ["ori", 2],
    ["slti", 2],
    ["sltiu", 2],
    ["sb", 1],
    ["sc", 1],
    ["sh", 1],
    ["sw", 1],
    ["j", 0],
    ["jal", 0],
    ["sra", 2],
    ["abs", 1],
    ["blt", 2],
    ["bgt", 2],
    ["ble", 2],
    ["neg", 1],
    ["negu", 1],
    ["not", 1],
    ["bge", 2],
    ["li", 1],
    ["la", 1],
    ["move", 1],
    ["sge", 2],
    ["sgt", 2]
]);
