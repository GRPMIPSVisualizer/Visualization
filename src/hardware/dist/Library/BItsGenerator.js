"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_bits = void 0;
var StringHandle_1 = require("./StringHandle");
function init_bits(bitWidth) {
    var bits = new Array();
    for (var i = 0; i < bitWidth; ++i) {
        bits.push(0);
    }
    return StringHandle_1.intArrayToString(bits);
}
exports.init_bits = init_bits;
//# sourceMappingURL=BItsGenerator.js.map