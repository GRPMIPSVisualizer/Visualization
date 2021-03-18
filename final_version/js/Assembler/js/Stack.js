"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/**
 * Class Stack for storing data.
 * It is for the function which transforms a number from decimal to binary.
 * It contains methods to operate the data in stack.
 */
class Stack {
    /**
     * Constructor of Stack.
     * Initialize the array called items.
     */
    constructor() {
        this.items = [];
    }
    /**
     * Push an element into stack.
     * @param element the number need to be push into the stack.
     * @returns void
     */
    push(element) {
        this.items.push(element);
    }
    /**
     * Pop an element out from the stack.
     * @returns a number in the stack or undefined.
     */
    pop() {
        return this.items.pop();
    }
    /**
     * Get the element at the top of the stack.
     * @returns the number at the top of the stack.
     */
    peek() {
        return this.items[this.items.length - 1];
    }
    /**
     * Check whether the stack is empty or not.
     * @returns true if the stack is empty, otherwise not.
     */
    isEmpty() {
        return this.items.length == 0;
    }
    /**
     * Get the size of the stack.
     * @returns a number of the size of the stack.
     */
    size() {
        return this.items.length;
    }
    /**
     * Get the size of the stack.
     * @returns a number of the size of the stack.
     */
    length() {
        return this.size();
    }
    /**
     * Clear the elements in the stack.
     * @returns void
     */
    clear() {
        this.items = [];
    }
    /**
     * Get the elements in the stack.
     * @returns an array of numbers in the stack.
     */
    toString() {
        return this.items;
    }
}
exports.Stack = Stack;
