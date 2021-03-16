export class MapForInsType {

    private static map = new Map();

    private constructor() {}

    public static getMap(): Map<string, string> {
        if (this.map.size == 0) {
            let typeR: string = "R";
            let typeI: string = "I";
            let typeJ: string = "J";

            this.map.set("add", typeR);
            this.map.set("addu", typeR);
            this.map.set("sub", typeR);
            this.map.set("subu", typeR);
            this.map.set("and", typeR);
            this.map.set("or", typeR);
            this.map.set("nor", typeR);
            this.map.set("slt", typeR);
            this.map.set("sltu", typeR);
            this.map.set("sll", typeR);
            this.map.set("srl", typeR);
            this.map.set("jr", typeR);

            this.map.set("addi", typeI);
            this.map.set("addiu", typeI);
            this.map.set("andi", typeI);
            this.map.set("beq", typeI);
            this.map.set("bne", typeI);
            this.map.set("lbu", typeI);
            this.map.set("lhu", typeI);
            this.map.set("llOp", typeI);
            this.map.set("lui", typeI);
            this.map.set("lw", typeI);
            this.map.set("ori", typeI);
            this.map.set("slti", typeI);
            this.map.set("sltiu", typeI);
            this.map.set("sb", typeI);
            this.map.set("sc", typeI);
            this.map.set("sh", typeI);
            this.map.set("sw", typeI);

            this.map.set("j", typeJ);
            this.map.set("jal", typeJ);
        }
        return this.map;
    }
}