export class MapForR {
    
    private static map = new Map();

    private constructor() {}

    public static getMap(): Map<string, string> {
        if (this.map.size == 0) {
            let addFunct: string = "100000";
            let adduFunct: string = "100001";
            let subFunct: string = "100010";
            let subuFunct: string = "100011";
            let andFunct: string = "100100";
            let orFunct: string = "100101";
            let norFunct: string = "100111";
            let sltFunct: string = "101010";
            let sltuFunct: string = "101011";
            let sllFunct: string = "000000";
            let srlFunct: string = "000010";
            let jrFunct: string = "001000";

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