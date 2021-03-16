export class MapForRegister {

    private static map = new Map();

    private constructor() {}

    public static getMap(): Map<string, string> {
        if (this.map.size == 0) {
            this.map.set("zero", "0");
            this.map.set("at", "1");
            this.map.set("v0", "2");
            this.map.set("v1", "3");
            this.map.set("a0", "4");
            this.map.set("a1", "5");
            this.map.set("a2", "6");
            this.map.set("a3", "7");
            this.map.set("t0", "8");
            this.map.set("t1", "9");
            this.map.set("t2", "10");
            this.map.set("t3", "11");
            this.map.set("t4", "12");
            this.map.set("t5", "13");
            this.map.set("t6", "14");
            this.map.set("t7", "15");
            this.map.set("s0", "16");
            this.map.set("s1", "17");
            this.map.set("s2", "18");
            this.map.set("s3", "19");
            this.map.set("s4", "20");
            this.map.set("s5", "21");
            this.map.set("s6", "22");
            this.map.set("s7", "23");
            this.map.set("t8", "24");
            this.map.set("t9", "25");
            this.map.set("k0", "26");
            this.map.set("k1", "27");
            this.map.set("gp", "28");
            this.map.set("sp", "29");
            this.map.set("fp", "30");
            this.map.set("ra", "31");
        }
        return this.map;
    }
}

