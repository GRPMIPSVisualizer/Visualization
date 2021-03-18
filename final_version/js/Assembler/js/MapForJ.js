"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForJ = void 0;
/**
 * MapForI stores some type-J core instructions and their corresponding 6 bits opcodes.
 */
class MapForJ {
    /**
     * Constructor of MapForJ which is a singleton.
     */
    constructor() { }
    /**
     * Method for getting the singleton map.
     * @returns a map which the keys are type-J instructions and the values are their corresponding 6 bits opcodes.
     */
    static getMap() {
        return this.map;
    }
}
exports.MapForJ = MapForJ;
/**
 * The map which the keys are type-J instructions and the values are their corresponding 6 bits opcodes.
 */
MapForJ.map = new Map([
    ["j", "000010"],
    ["jal", "000011"]
]);
