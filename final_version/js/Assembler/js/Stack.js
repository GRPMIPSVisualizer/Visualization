"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        // 向栈顶压入一个元素
        this.items.push(element);
    }
    pop() {
        // 从栈顶弹出一个元素
        return this.items.pop();
    }
    peek() {
        // 返回栈顶元素
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        // 测试栈是否为空
        return this.items.length == 0;
    }
    size() {
        // 返回栈元素个数
        return this.items.length;
    }
    length() {
        // 返回栈元素个数
        return this.size();
    }
    clear() {
        this.items = [];
    }
    toString() {
        return this.items;
    }
}
exports.Stack = Stack;
