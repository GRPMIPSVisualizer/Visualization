import {Stack} from "./Stack";
import {transformZeroOne} from "./TransformZeroOne";
import {binaryAddition} from "./BinaryAddition";

/**
 * Transform a number from decimal to binary.
 * The input numOfBits must be sufficient to represent the input decimal number.
 * 
 * @param decimal the decimal number that need translation.
 * @param numOfBits the number of bits of the desired binary number (or two's implement).
 * If the input decimal number is positive, it will be translated into its binary number or its two's complement according to numOfBits.
 * If the input decimal number is negative, it will be translated into its two's complement.
 */
export function decimalToBinary(decimal: number, numOfBits: number) {
    let binaryString: string = '';
    let isNegative: number = 0;

    if (decimal === 0) {
        for (let i = 0; i < numOfBits; i++) {
            binaryString = binaryString + "0";
        }
        return binaryString;
    }

    if (decimal < 0) {
        decimal = -decimal;
        isNegative = 1;
    }

    let stk = new Stack()
    while (decimal > 0) {
        stk.push(Math.floor(decimal % 2));
        decimal = Math.floor(decimal / 2);
    }

    let size = stk.size();
    for (let i = 0; i < size; i++) {
        binaryString = "" + binaryString + stk.pop();
    }

    while(binaryString.length < numOfBits) {
        binaryString = "0" + binaryString;
    }

    if (isNegative) {
        binaryString = transformZeroOne(binaryString);
        binaryString = binaryAddition(binaryString, "1");
    }

    return binaryString;
}
