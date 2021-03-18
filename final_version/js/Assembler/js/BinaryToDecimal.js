"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binaryToDecimal = void 0;
/**
 * Translate a 16-bits binary number into decimal number.
 * @param bin a string of a binary number(must be 16-bits) to be translated.
 * @returns a number which is the decimal format of the binary number, or 0 if the binary number is not 16-bits.
 */
function binaryToDecimal(bin) {
    let retNum = 0;
    if (bin.length != 16) {
        return 0;
    }
    else {
        let i = 1;
        let j = 0;
        for (; j < 15; j++) {
            retNum = retNum + +(bin.charAt(15 - j)) * i;
            i = 2 * i;
        }
        i = -i;
        retNum = retNum + +(bin.charAt(0)) * i;
    }
    return retNum;
}
exports.binaryToDecimal = binaryToDecimal;
