"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimSpace = void 0;
/**
 * Delete spaces in string except the first space.
 * @param str the string which the spaces in it needed to be deleted.
 * @returns a string without spaces in it except the first space.
 */
function trimSpace(str) {
    let result = "";
    let tempString = str.trim();
    let posOfFirstSpace = tempString.indexOf(" ");
    let beforeSpace = tempString.substring(0, posOfFirstSpace + 1);
    let afterSpace = tempString.substring(posOfFirstSpace + 1, tempString.length).replace(/\s+/g, "");
    result = beforeSpace + afterSpace;
    return result;
}
exports.trimSpace = trimSpace;
