"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hex2bin = exports.bin2hex = exports.shiftLeftBinary32Bits = exports.bitsMapping = exports.binaryDetect = exports.bin2dec = exports.lengthDetect = exports.decToUnsignedBin32 = exports.decToSignedBin32 = exports.intArrayToString = exports.stringToIntArray = void 0;
function stringToIntArray(binaryString) {
    var intArray = [];
    // need ES5 or higher version or right module import format
    // for(let signal of inSignalA){
    //     bitA.push(parseInt(signal));
    // }
    // for(let signal of inSignalB){
    //     bitB.push(parseInt(signal));
    // }
    for (var i = 0; i < binaryString.length; ++i) {
        intArray.push(parseInt(binaryString.charAt(i)));
    }
    return intArray;
}
exports.stringToIntArray = stringToIntArray;
function intArrayToString(intArray) {
    return intArray.join("");
}
exports.intArrayToString = intArrayToString;
function decToSignedBin32(dec) {
    var bin32 = (dec >>> 0).toString(2);
    if (dec >= 0) {
        var binArr32 = stringToIntArray(bin32);
        var i = 32;
        var out32 = new Array(i);
        var j = bin32.length;
        while (i > 0) {
            out32[--i] = binArr32[--j];
            if (j == 0)
                break;
        }
        while (i > 0) {
            out32[--i] = 0;
        }
        return intArrayToString(out32);
    }
    lengthDetect(bin32);
    return bin32;
}
exports.decToSignedBin32 = decToSignedBin32;
function decToUnsignedBin32(dec) {
    if (dec < 0)
        throw Error("Unsign number cannot less than zero!");
    var bin32 = (dec >>> 0).toString(2);
    if (bin32.length < 32)
        return decToSignedBin32(dec);
    if (bin32.length == 32)
        return bin32;
    throw Error("Unsign Overflow!");
}
exports.decToUnsignedBin32 = decToUnsignedBin32;
function lengthDetect(binNum) {
    if (binNum.length > 32)
        throw Error("binary length is longer than 32!");
}
exports.lengthDetect = lengthDetect;
function bin2dec(bin, isUnsigned) {
    if (bin.length != 32)
        throw Error("binary length is longer than 32!");
    var binArr = stringToIntArray(bin);
    var retNum = 0;
    if (isUnsigned)
        retNum += binArr[0] * Math.pow(2, 31);
    else {
        retNum += -binArr[0] * Math.pow(2, 31);
    }
    for (var i = 1; i < bin.length; ++i) {
        retNum += binArr[i] * Math.pow(2, (31 - i));
    }
    return retNum;
}
exports.bin2dec = bin2dec;
function binaryDetect(bin) {
    stringToIntArray(bin).forEach(function (bit) {
        if (bit != 0 && bit != 1)
            throw Error("Binary data " + bin + " has invalid bit.");
    });
}
exports.binaryDetect = binaryDetect;
function bitsMapping(bits, from, to) {
    var newFrom = 32 - to;
    var newTo = 32 - from;
    return bits.slice(newFrom, newTo);
}
exports.bitsMapping = bitsMapping;
function shiftLeftBinary32Bits(binBits) {
    return binBits.slice(2) + "00";
}
exports.shiftLeftBinary32Bits = shiftLeftBinary32Bits;
function bin2hex(bin) {
    return bin;
}
exports.bin2hex = bin2hex;
function hex2bin(hex) {
    return hex;
}
exports.hex2bin = hex2bin;
//# sourceMappingURL=StringHandle.js.map