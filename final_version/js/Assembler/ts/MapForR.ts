/**
 * MapForR stores some type-R core instructions and their corresponding 6 bits funct codes.
 */
export class MapForR {

    /**
     * The map which the keys are type-R instructions and the values are their corresponding 6 bits funct codes.
     */
    private static map = new Map([
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

    /**
     * Constructor of MapForR which is a singleton.
     */
    private constructor() { }

    /**
     * Method for getting the singleton map.
     * @returns a map which the keys are type-R instructions and the values are their corresponding 6 bits funct codes.
     */
    public static getMap(): Map<string, string> {
        return this.map;
    }
}