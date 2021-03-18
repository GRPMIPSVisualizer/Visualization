"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binaryAddition = void 0;
/**
 * Add two binary numbers in the form of string.
 * @param a a string of a binary number to be added.
 * @param b a string of a binary number to add.
 * @returns a string of the sum of the two binary numbers.
 */
function binaryAddition(a, b) {
    let result = "";
    let x = 0;
    let y = 0;
    let pre = 0;
    let sum = 0;
    while (a.length != b.length) {
        if (a.length > b.length) {
            b = "0" + b;
        }
        else {
            a = "0" + a;
        }
    }
    let i;
    for (i = a.length - 1; i >= 0; i--) {
        x = +a.charAt(i);
        y = +b.charAt(i);
        sum = x + y + pre;
        if (sum >= 2) {
            pre = 1;
            result = "" + (sum - 2) + result;
        }
        else {
            pre = 0;
            result = "" + sum + result;
        }
    }
    if (pre == 1) {
        result = "1" + result;
    }
    return result;
}
exports.binaryAddition = binaryAddition;
