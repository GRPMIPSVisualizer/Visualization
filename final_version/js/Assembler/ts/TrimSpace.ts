/**
 * Delete spaces in string except the first space.
 * @param str the string which the spaces in it needed to be deleted.
 * @returns a string without spaces in it except the first space.
 */
export function trimSpace(str: string) {
    let result: string = "";
    let tempString: string = str.trim();
    let posOfFirstSpace: number = tempString.indexOf(" ");
    let beforeSpace: string = tempString.substring(0, posOfFirstSpace + 1);
    let afterSpace: string = tempString.substring(posOfFirstSpace + 1, tempString.length).replace(/\s+/g, "");
    result = beforeSpace + afterSpace;
    return result;
}