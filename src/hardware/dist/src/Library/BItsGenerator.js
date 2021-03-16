"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_bits = void 0;
const StringHandle_1 = require("./StringHandle");
function init_bits(bitWidth) {
    let bits = new Array();
    for (let i = 0; i < bitWidth; ++i) {
        bits.push(0);
    }
    return StringHandle_1.intArrayToString(bits);
}
exports.init_bits = init_bits;
//# sourceMappingURL=BItsGenerator.js.map