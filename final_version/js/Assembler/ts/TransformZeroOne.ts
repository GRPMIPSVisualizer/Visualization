/**
 * Transform one to zero and transform zero to one
 * @param str the string of binary number to be transformed.
 * @returns a string which has transformed one to zero and zero to one.
 */
export function transformZeroOne(str: string) {
    let result: string = "";
    let i: number;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == '0') {
            result = result + "1";
        } else if (str.charAt(i) == '1') {
            result = result + "0";
        } else {
            console.log("Error in function inverseZeroOne");
            return "";
        }
    }
    return result;
}