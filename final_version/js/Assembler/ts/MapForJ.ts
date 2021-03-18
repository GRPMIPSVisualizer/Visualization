/**
 * MapForI stores some type-J core instructions and their corresponding 6 bits opcodes.
 */
export class MapForJ {

    /**
     * The map which the keys are type-J instructions and the values are their corresponding 6 bits opcodes.
     */
    private static map = new Map([
        ["j", "000010"],
        ["jal", "000011"]
    ]);

    /**
     * Constructor of MapForJ which is a singleton.
     */
    private constructor() { }

    /**
     * Method for getting the singleton map.
     * @returns a map which the keys are type-J instructions and the values are their corresponding 6 bits opcodes.
     */
    public static getMap(): Map<string, string> {
        return this.map;
    }
}
