export class MapForJ {
 
    private static map = new Map();

    private constructor() {}

    public static getMap(): Map<string, string> {
        if (this.map.size == 0) {
            let jOp: string = "000010";
            let jalOp: string = "000011";

            this.map.set("j", jOp);
            this.map.set("jal", jalOp);
        }
        
        return this.map;
    }
}
