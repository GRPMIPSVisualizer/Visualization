"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Single_CycleCPU_1 = require("../src/CPU/Single-CycleCPU");
let sinCycCPU = new Single_CycleCPU_1.singleCycleCpu();
let InsSet = new Array();
[
    "00100100000010110000000000001010",
    "00100100000010100000000000010100",
    "00000001010010111001100000100000",
    "00100000000000010000000000000100",
    "00000011101000011110100000100010",
    "10101111101100110000000000000000"
];
sinCycCPU.storeIns(InsSet);
//# sourceMappingURL=SingleCycleCPU.test.js.map