export class MapForI {
    
    private static map = new Map();

    private constructor() {}
  
    public static getMap(): Map<string, string> {
        if (this.map.size == 0) {
            let addiOp: string = "001000";
            let addiuOp: string = "001001";
            let andiOp: string = "001100";
            let beqOp: string = "000100";
            let bneOp: string = "000101";
            let lbuOp: string = "100100";
            let lhuOp: string = "100101";
            let llOp: string = "110000";
            let luiOp: string = "001111";
            let lwOp: string = "100011";
            let oriOp: string = "001101";
            let sltiOp: string = "001010";
            let sltiuOp: string = "001011";
            let sbOp: string = "101000";
            let scOp: string = "111000";
            let shOp: string = "101001";
            let swOp: string = "101011";
            
            this.map.set("addi", addiOp);
            this.map.set("addiu", addiuOp);
            this.map.set("andi", andiOp);
            this.map.set("beq", beqOp);
            this.map.set("bne", bneOp);
            this.map.set("lbu", lbuOp);
            this.map.set("lhu", lhuOp);
            this.map.set("ll", llOp);
            this.map.set("lui", luiOp);
            this.map.set("lw", lwOp);
            this.map.set("ori", oriOp);
            this.map.set("slti", sltiOp);
            this.map.set("sltiu", sltiuOp);
            this.map.set("sb", sbOp);
            this.map.set("sc", scOp);
            this.map.set("sh", shOp);
            this.map.set("sw", swOp);
        }
        return this.map;
    }
}