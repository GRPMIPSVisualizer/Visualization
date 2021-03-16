(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayList = void 0;
/**
 * ArrayList
 */
class ArrayList {
    constructor(initialCapacity) {
        // The array used to store the elements
        this.elementData = [];
        // The number of elements stored in the ArrayList
        this.sizeNum = 0;
        if (typeof initialCapacity === 'number') {
            //initialize the capacity of the ArrayList
            if (initialCapacity < 0) {
                throw new Error("is no arrayList index : " + initialCapacity);
            }
            this.elementData = new Array(initialCapacity);
        }
        else {
            //initialize the capacity of the ArrayList
            this.elementData = new Array(10);
        }
    }
    add(arg0, arg1) {
        if (typeof arg0 === 'number') {
            //索引添加
            this.ensureExplicitCapacity();
            this.rangeCheck(arg0);
            this.elementData.splice(arg0, 0, arg1);
            this.sizeNum++;
        }
        else {
            //普通添加,容量计算
            this.ensureExplicitCapacity();
            this.elementData[this.sizeNum] = arg0;
            this.sizeNum++;
        }
    }
    /**
     * TODO  通过下标查询对象
     * @param index 索引
     * @return Object
     */
    get(index) {
        this.rangeCheck(index);
        return this.elementData[index];
    }
    /**
     * TODO  更新数据
     * @param index 下标
     * @param 对象数据
     * @return void
     */
    update(index, Object) {
        this.rangeCheck(index);
        this.elementData[index] = Object;
    }
    remove(arg0) {
        if (typeof arg0 === 'number') {
            //删除指定下标数据
            this.elementData.splice(arg0, 1);
            this.sizeNum--;
            return true;
        }
        else {
            //删除具体数据,数据多不建议使用
            let result = false;
            for (let i = 0; i < this.sizeNum; i++) {
                if (this.get(i) === arg0) {
                    result = this.remove(i);
                }
            }
            if (result == false) {
                console.log("is no object?");
            }
            return result;
        }
    }
    /**
     * TODO 获取集合长度
     * @return
     */
    size() {
        return this.sizeNum;
    }
    /**
     * TODO 检测数组是否下标越界，是抛出越界异常
     *
     * @param index
     */
    rangeCheck(index) {
        if (index >= this.sizeNum || index < 0) {
            throw new Error("is no index--->" + index);
        }
    }
    /**
     *  TODO 自动扩容 1.5X
     *  << : 左移运算符，num << 1, 相当于num乘以2
     *  >> : 右移运算符，num >> 1, 相当于num除以2
     */
    ensureExplicitCapacity() {
        if (this.elementData.length < this.sizeNum + 1) {
            // 当前集合实际容量
            let oldCapacity = this.elementData.length;
            //扩容1.5倍后的数
            let newCapacity = oldCapacity + (oldCapacity >> 1);
            //修改集合容量
            this.elementData.length = newCapacity;
            //console.log(this.elementData.length+"--> "+newCapacity + "--》"+this.elementData);
        }
    }
}
exports.ArrayList = ArrayList;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assembler = void 0;
const DecoderForR_1 = require("./DecoderForR");
const DecoderForI_1 = require("./DecoderForI");
const DecoderForJ_1 = require("./DecoderForJ");
const MapForCommaNum_1 = require("./MapForCommaNum");
const MapForInsType_1 = require("./MapForInsType");
const ArrayList_1 = require("./ArrayList");
const TrimSpace_1 = require("./TrimSpace");
class Assembler {
    constructor() {
        this.decoderForR = DecoderForR_1.DecoderForR.getDecoder();
        this.decoderForI = DecoderForI_1.DecoderForI.getDecoder();
        this.decoderForJ = DecoderForJ_1.DecoderForJ.getDecoder();
        this.source = new ArrayList_1.ArrayList(10);
        this.basic = new ArrayList_1.ArrayList(10);
        this.bin = new ArrayList_1.ArrayList(10);
    }
    static getAssembler() {
        return this.assembler;
    }
    getSource() {
        return this.source;
    }
    getBasic() {
        return this.basic;
    }
    setSource(source) {
        let sourceIns = source.split("\n");
        let i;
        let patt = /^[\s]$/;
        for (i = 0; i < sourceIns.length; i++) {
            sourceIns[i] = sourceIns[i].trim();
        }
        let label;
        let mapForLabel = new Map();
        let address = "4194304";
        let posOfSpace;
        let operator;
        let jumpLabel;
        let instructionCounter = 0;
        let labelCounter = 0;
        let mapForCounter = new Map();
        let relativeJump = 0;
        for (i = 0; i < sourceIns.length; i++) {
            if (sourceIns[i] == "" || patt.test(sourceIns[i])) {
                continue;
            }
            else if (sourceIns[i].substring(sourceIns[i].length - 1, sourceIns[i].length) == ":") {
                label = sourceIns[i].substring(0, sourceIns[i].lastIndexOf(":")).trim();
                if (label.search(" ") != -1) {
                    console.log("Error 9 in Assembler. Label unrecognized.");
                }
                else {
                    mapForLabel.set(label, address);
                    labelCounter = instructionCounter;
                    mapForCounter.set(label, labelCounter.toFixed());
                }
            }
            instructionCounter++;
        }
        instructionCounter = 0;
        for (i = 0; i < sourceIns.length; i++) {
            if (sourceIns[i] == "" || patt.test(sourceIns[i]) || sourceIns[i].substring(sourceIns[i].length - 1, sourceIns[i].length) == ":") {
                continue;
            }
            else {
                posOfSpace = sourceIns[i].indexOf(" ");
                operator = sourceIns[i].substring(0, posOfSpace);
                this.source.add(sourceIns[i]);
                if (operator == "j" || operator == "jal") {
                    jumpLabel = sourceIns[i].substring(posOfSpace, sourceIns[i].length).trim();
                    if (mapForLabel.has(jumpLabel)) {
                        if (operator == "j") {
                            sourceIns[i] = "j " + mapForLabel.get(jumpLabel);
                        }
                        else {
                            sourceIns[i] = "jal " + mapForLabel.get(jumpLabel);
                        }
                        address = (+address + 4).toFixed();
                    }
                    else {
                        console.log("Error 10 in Assembler. Label is not found.");
                    }
                }
                else if (operator == "beq" || operator == "bne") {
                    jumpLabel = sourceIns[i].substring(sourceIns[i].lastIndexOf(",") + 1, sourceIns[i].length).trim();
                    if (mapForLabel.has(jumpLabel)) {
                        relativeJump = +(mapForCounter.get(jumpLabel) + "") - instructionCounter - 1;
                        if (operator == "beq") {
                            sourceIns[i] = "beq" + sourceIns[i].substring(posOfSpace, sourceIns[i].lastIndexOf(",") + 1) + relativeJump.toFixed();
                        }
                        else {
                            sourceIns[i] = "bne" + sourceIns[i].substring(posOfSpace, sourceIns[i].lastIndexOf(",") + 1) + relativeJump.toFixed();
                        }
                        address = (+address + 4).toFixed();
                    }
                    else {
                        console.log("Error 11 in Assembler. Label is not found.");
                    }
                }
                this.basic.add(TrimSpace_1.trimSpace(sourceIns[i]));
                instructionCounter++;
            }
        }
    }
    getBin() {
        return this.bin;
    }
    assemble() {
        let result = true;
        let i;
        for (i = 0; i < this.basic.size(); i++) {
            let ins = this.basic.get(i).toString();
            let posOfSpace = ins.indexOf(" ");
            let operator = ins.substring(0, posOfSpace);
            if (MapForCommaNum_1.MapForCommaNum.getMap().has(operator)) {
                let expectedNumComma = MapForCommaNum_1.MapForCommaNum.getMap().get(operator);
                let actualNumComma = ins.split(",").length - 1;
                if (expectedNumComma == undefined) {
                    console.log("Error 1 in Assembler. Instruction unrecognized.");
                    return false;
                }
                else if (expectedNumComma == actualNumComma) {
                    let type = MapForInsType_1.MapForInsType.getMap().get(operator);
                    if (type == undefined) {
                        console.log("Error 2 in Assembler.");
                        return false;
                    }
                    else {
                        switch (type) {
                            case "R":
                                this.decoderForR.setIns(ins);
                                if (this.decoderForR.validate() == true) {
                                    this.decoderForR.decode();
                                    this.bin.add(this.decoderForR.getBinIns());
                                }
                                else {
                                    console.log("Error 3 in Assembler. Invalid instruction.");
                                    return false;
                                }
                                break;
                            case "I":
                                this.decoderForI.setIns(ins);
                                if (this.decoderForI.validate() == true) {
                                    this.decoderForI.decode();
                                    this.bin.add(this.decoderForI.getBinIns());
                                }
                                else {
                                    console.log("Error 4 in Assembler. Invalid instruction.");
                                    return false;
                                }
                                break;
                            case "J":
                                this.decoderForJ.setIns(ins);
                                if (this.decoderForJ.validate() == true) {
                                    this.decoderForJ.decode();
                                    this.bin.add(this.decoderForJ.getBinIns());
                                }
                                else {
                                    console.log("Error 5 in Assembler. Invalid instruction.");
                                    return false;
                                }
                                break;
                            default:
                                console.log("Error 6 in Assembler. Unrecognized instruction type.");
                                return false;
                        }
                    }
                }
                else {
                    console.log("Error 7 in Assembler. Invalid instruction.");
                    return false;
                }
            }
            else {
                console.log("Error 8 in Assembler. Instruction unrecognized.");
                return false;
            }
        }
        return result;
    }
}
exports.Assembler = Assembler;
Assembler.assembler = new Assembler();

},{"./ArrayList":1,"./DecoderForI":6,"./DecoderForJ":7,"./DecoderForR":8,"./MapForCommaNum":13,"./MapForInsType":15,"./TrimSpace":21}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binaryAddition = void 0;
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalToBinary = void 0;
const Stack_1 = require("./Stack");
const TransformZeroOne_1 = require("./TransformZeroOne");
const BinaryAddition_1 = require("./BinaryAddition");
/**
 * Transform a number from decimal to binary.
 * The input numOfBits must be sufficient to represent the input decimal number.
 *
 * @param decimal the decimal number that need translation.
 * @param numOfBits the number of bits of the desired binary number (or two's implement).
 * If the input decimal number is positive, it will be translated into its binary number or its two's complement according to numOfBits.
 * If the input decimal number is negative, it will be translated into its two's complement.
 */
function decimalToBinary(decimal, numOfBits) {
    let binaryString = '';
    let isNegative = 0;
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
    let stk = new Stack_1.Stack();
    while (decimal > 0) {
        stk.push(Math.floor(decimal % 2));
        decimal = Math.floor(decimal / 2);
    }
    let size = stk.size();
    for (let i = 0; i < size; i++) {
        binaryString = "" + binaryString + stk.pop();
    }
    while (binaryString.length < numOfBits) {
        binaryString = "0" + binaryString;
    }
    if (isNegative) {
        binaryString = TransformZeroOne_1.transformZeroOne(binaryString);
        binaryString = BinaryAddition_1.binaryAddition(binaryString, "1");
    }
    return binaryString;
}
exports.decimalToBinary = decimalToBinary;

},{"./BinaryAddition":3,"./Stack":19,"./TransformZeroOne":20}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = void 0;
class Decoder {
    constructor() {
        this.ins = "";
        this.operator = "";
        this.binIns = "";
    }
    setIns(ins) {
        this.ins = ins;
        var posOfSpace = this.ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }
    getIns() {
        return this.ins;
    }
    getBinIns() {
        return this.binIns;
    }
}
exports.Decoder = Decoder;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoderForI = void 0;
const Decoder_1 = require("./Decoder");
const InstructionI_1 = require("./InstructionI");
const MapForRegister_1 = require("./MapForRegister");
class DecoderForI extends Decoder_1.Decoder {
    constructor() {
        super();
    }
    static getDecoder() {
        return this.decoder;
    }
    validate() {
        let posOfSpace = this.ins.indexOf(" ");
        let operandRS = "";
        let operandRT = "";
        let IMM = "";
        if (this.operator == "lui") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 2);
            operandRT = operands[0];
            IMM = operands[1];
        }
        else if (this.operator == "beq" || this.operator == "bne") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRS = operands[0];
            operandRT = operands[1];
            IMM = operands[2];
        }
        else if (this.operator == "addi" ||
            this.operator == "addiu" ||
            this.operator == "andi" ||
            this.operator == "ori" ||
            this.operator == "slti" ||
            this.operator == "sltiu") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRT = operands[0];
            operandRS = operands[1];
            IMM = operands[2];
        }
        else {
            let numLeftBracket = this.ins.split("(").length - 1;
            let numRightBracket = this.ins.split(")").length - 1;
            if (!(numLeftBracket == 1 && numRightBracket == 1)) {
                console.log("Error 1 in DecoderForI. Invalid instruction format.");
                return false;
            }
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 2);
            let leftBracket = operands[1].indexOf("(");
            let rightBracket = operands[1].indexOf(")");
            operandRT = operands[0];
            operandRS = operands[1].substring(leftBracket + 1, rightBracket);
            IMM = operands[1].substring(0, leftBracket);
        }
        let patt1 = /^[0-9]+$/;
        let patt2 = /^[a-z0-9]+$/;
        if (!patt1.test(IMM.charAt(0)) && IMM.charAt(0) != "+" && IMM.charAt(0) != "-") {
            console.log("Error 2 in DecoderForI. Invalid immediate number.");
        }
        else if (+IMM <= -32768 || +IMM >= 32767) {
            console.log("Error 3 in DecoderForI. Invalid immediate number. Out of range.");
        }
        let operands = [operandRS, operandRT];
        let i;
        for (i = 0; i < operands.length; i++) {
            let operand = operands[i].substring(1, operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                console.log("Error 4 in DecoderForI. Invalid operand.");
                return false;
            }
            else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                break;
            }
            else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister_1.MapForRegister.getMap().has(operand)) {
                    let operandID = MapForRegister_1.MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        console.log("Error 5 in DecoderForI. Invalid operand.");
                        return false;
                    }
                    else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                }
            }
            else {
                console.log("Error 6 in DecoderForR. Invalid operand.");
                return false;
            }
        }
        return true;
    }
    decode() {
        let instruction = new InstructionI_1.InstructionI(this.ins);
        this.binIns = instruction.getBinIns();
    }
}
exports.DecoderForI = DecoderForI;
DecoderForI.decoder = new DecoderForI();

},{"./Decoder":5,"./InstructionI":10,"./MapForRegister":18}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoderForJ = void 0;
const Decoder_1 = require("./Decoder");
const InstructionJ_1 = require("./InstructionJ");
class DecoderForJ extends Decoder_1.Decoder {
    constructor() {
        super();
    }
    static getDecoder() {
        return this.decoder;
    }
    validate() {
        let posOfSpace = this.ins.indexOf(" ");
        let operandADDRESS = this.ins.substring(posOfSpace + 1, this.ins.length);
        let patt1 = /^[0-9]+$/;
        if (!patt1.test(operandADDRESS)) {
            console.log("Error 1 in DecoderForJ. Invalid address.");
            return false;
        }
        return true;
    }
    decode() {
        let instruction = new InstructionJ_1.InstructionJ(this.ins);
        this.binIns = instruction.getBinIns();
    }
}
exports.DecoderForJ = DecoderForJ;
DecoderForJ.decoder = new DecoderForJ();

},{"./Decoder":5,"./InstructionJ":11}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoderForR = void 0;
const Decoder_1 = require("./Decoder");
const InstructionR_1 = require("./InstructionR");
const MapForRegister_1 = require("./MapForRegister");
class DecoderForR extends Decoder_1.Decoder {
    constructor() {
        super();
    }
    static getDecoder() {
        return this.decoder;
    }
    validate() {
        let posOfSpace = this.ins.indexOf(" ");
        let operandRS = "";
        let operandRT = "";
        let operandRD = "";
        let SHAMT = "";
        if (this.operator == "jr") {
            operandRS = this.ins.substring(posOfSpace + 1, this.ins.length);
        }
        else if (this.operator == "sll" || this.operator == "srl") {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRD = operands[0];
            operandRT = operands[1];
            SHAMT = operands[2];
        }
        else {
            let operands = this.ins.substring(posOfSpace + 1, this.ins.length).split(",", 3);
            operandRD = operands[0];
            operandRS = operands[1];
            operandRT = operands[2];
        }
        let patt1 = /^[0-9]+$/;
        let patt2 = /^[a-z0-9]+$/;
        if ((!(SHAMT == "" || patt1.test(SHAMT))) || (patt1.test(SHAMT) && +SHAMT >= 32)) {
            console.log("Error 1 in DecoderForR. Invalid shift amount.");
            return false;
        }
        let operands = [operandRS, operandRT, operandRD];
        let i;
        for (i = 0; i < operands.length; i++) {
            let operand = operands[i].substring(1, operands[i].length);
            if (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand > 31) {
                console.log("Error 2 in DecoderForR. Invalid operand.");
                return false;
            }
            else if (operands[i] == "" || (operands[i].charAt(0) == "$" && patt1.test(operand) && +operand <= 31)) {
                break;
            }
            else if (operands[i].charAt(0) == "$" && patt2.test(operand)) {
                if (MapForRegister_1.MapForRegister.getMap().has(operand)) {
                    let operandID = MapForRegister_1.MapForRegister.getMap().get(operand);
                    if (operandID == undefined) {
                        console.log("Error 3 in DecoderForR. Invalid operand.");
                        return false;
                    }
                    else {
                        this.ins = this.ins.replace(operand, operandID);
                    }
                }
            }
            else {
                console.log("Error 4 in DecoderForR. Invalid operand.");
                return false;
            }
        }
        return true;
    }
    decode() {
        let instruction = new InstructionR_1.InstructionR(this.ins);
        this.binIns = instruction.getBinIns();
    }
}
exports.DecoderForR = DecoderForR;
DecoderForR.decoder = new DecoderForR();

},{"./Decoder":5,"./InstructionR":12,"./MapForRegister":18}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruction = void 0;
class Instruction {
    constructor(ins) {
        this.ins = ins;
        this.binIns = "";
        let posOfSpace = ins.indexOf(" ");
        this.operator = ins.substring(0, posOfSpace);
    }
    getBinIns() {
        return this.binIns;
    }
}
exports.Instruction = Instruction;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionI = void 0;
const DecimalToBinary_1 = require("./DecimalToBinary");
const Instruction_1 = require("./Instruction");
const MapForI_1 = require("./MapForI");
class InstructionI extends Instruction_1.Instruction {
    //The ins should be in the form like "addi $8,$16,10".
    //There should be only one space between the operator and the first operand, no other space existing.
    //The register should be in dollar sign and a number.
    constructor(ins) {
        super(ins);
        let opBin = MapForI_1.MapForI.getMap().get(this.operator);
        if (opBin == undefined) {
            this.op = "XXXXXX";
            console.log("Error in constructor for InstructionR.");
        }
        else {
            this.op = opBin;
        }
        let posOfSpace = ins.indexOf(" ");
        if (this.operator == "lui") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 2);
            this.operandRS = "";
            this.operandRT = operands[0];
            this.operandIMM = operands[1];
            this.rs = "00000";
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        else if (this.operator == "beq" || this.operator == "bne") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = operands[0];
            this.operandRT = operands[1];
            this.operandIMM = operands[2];
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        else if (this.operator == "addi" ||
            this.operator == "addiu" ||
            this.operator == "andi" ||
            this.operator == "ori" ||
            this.operator == "slti" ||
            this.operator == "sltiu") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = operands[1];
            this.operandRT = operands[0];
            this.operandIMM = operands[2];
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        else {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 2);
            let leftBracket = operands[1].indexOf("(");
            let rightBracket = operands[1].indexOf(")");
            this.operandRS = operands[1].substring(leftBracket + 1, rightBracket);
            this.operandRT = operands[0];
            this.operandIMM = operands[1].substring(0, leftBracket);
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.imm = DecimalToBinary_1.decimalToBinary(+this.operandIMM, 16);
        }
        this.binIns = this.op + this.rs + this.rt + this.imm;
    }
}
exports.InstructionI = InstructionI;

},{"./DecimalToBinary":4,"./Instruction":9,"./MapForI":14}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionJ = void 0;
const DecimalToBinary_1 = require("./DecimalToBinary");
const Instruction_1 = require("./Instruction");
const MapForJ_1 = require("./MapForJ");
class InstructionJ extends Instruction_1.Instruction {
    //The ins should be in the form like "j 10000".
    //There should be only one space between the operator and the first operand, no other space existing.
    //The address should be represented by a decimal number.
    constructor(ins) {
        super(ins);
        let opBin = MapForJ_1.MapForJ.getMap().get(this.operator);
        if (opBin == undefined) {
            this.op = "XXXXXX";
            console.log("Error in constructor for InstructionR.");
        }
        else {
            this.op = opBin;
        }
        let posOfSpace = ins.indexOf(" ");
        this.operandADDRESS = ins.substring(posOfSpace + 1, ins.length);
        this.address = DecimalToBinary_1.decimalToBinary(+this.operandADDRESS, 26);
        this.binIns = this.op + this.address;
    }
}
exports.InstructionJ = InstructionJ;

},{"./DecimalToBinary":4,"./Instruction":9,"./MapForJ":16}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionR = void 0;
const DecimalToBinary_1 = require("./DecimalToBinary");
const Instruction_1 = require("./Instruction");
const MapForR_1 = require("./MapForR");
class InstructionR extends Instruction_1.Instruction {
    //The ins should be in the form like "add $8,$16,$17".
    //There should be only one space between the operator and the first operand, no other space existing.
    //The register should be in dollar sign and a number.
    constructor(ins) {
        super(ins);
        this.op = "000000";
        let functBin = MapForR_1.MapForR.getMap().get(this.operator);
        if (functBin == undefined) {
            this.funct = "XXXXXX";
            console.log("Error in constructor for InstructionR.");
        }
        else {
            this.funct = functBin;
        }
        let posOfSpace = ins.indexOf(" ");
        if (this.operator == "jr") {
            this.operandRS = ins.substring(posOfSpace + 1, ins.length);
            this.operandRD = "";
            this.operandRT = "";
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = "00000";
            this.rd = "00000";
            this.shamt = "00000";
        }
        else if (this.operator == "sll" || this.operator == "srl") {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRS = "";
            this.operandRD = operands[0];
            this.operandRT = operands[1];
            this.shamt = DecimalToBinary_1.decimalToBinary(+operands[2], 5);
            this.rs = "00000";
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.rd = DecimalToBinary_1.decimalToBinary(+this.operandRD.substring(1), 5);
        }
        else {
            let operands = ins.substring(posOfSpace + 1, ins.length).split(",", 3);
            this.operandRD = operands[0];
            this.operandRS = operands[1];
            this.operandRT = operands[2];
            this.rs = DecimalToBinary_1.decimalToBinary(+this.operandRS.substring(1), 5);
            this.rt = DecimalToBinary_1.decimalToBinary(+this.operandRT.substring(1), 5);
            this.rd = DecimalToBinary_1.decimalToBinary(+this.operandRD.substring(1), 5);
            this.shamt = "00000";
        }
        this.binIns = this.op + this.rs + this.rt + this.rd + this.shamt + this.funct;
    }
}
exports.InstructionR = InstructionR;

},{"./DecimalToBinary":4,"./Instruction":9,"./MapForR":17}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForCommaNum = void 0;
class MapForCommaNum {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            this.map.set("add", 2);
            this.map.set("addu", 2);
            this.map.set("sub", 2);
            this.map.set("subu", 2);
            this.map.set("and", 2);
            this.map.set("or", 2);
            this.map.set("nor", 2);
            this.map.set("slt", 2);
            this.map.set("sltu", 2);
            this.map.set("sll", 2);
            this.map.set("srl", 2);
            this.map.set("jr", 0);
            this.map.set("addi", 2);
            this.map.set("addiu", 2);
            this.map.set("andi", 2);
            this.map.set("beq", 2);
            this.map.set("bne", 2);
            this.map.set("lbu", 1);
            this.map.set("lhu", 1);
            this.map.set("ll", 1);
            this.map.set("lui", 1);
            this.map.set("lw", 1);
            this.map.set("ori", 2);
            this.map.set("slti", 2);
            this.map.set("sltiu", 2);
            this.map.set("sb", 1);
            this.map.set("sc", 1);
            this.map.set("sh", 1);
            this.map.set("sw", 1);
            this.map.set("j", 0);
            this.map.set("jal", 0);
        }
        return this.map;
    }
}
exports.MapForCommaNum = MapForCommaNum;
MapForCommaNum.map = new Map();

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForI = void 0;
class MapForI {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            let addiOp = "001000";
            let addiuOp = "001001";
            let andiOp = "001100";
            let beqOp = "000100";
            let bneOp = "000101";
            let lbuOp = "100100";
            let lhuOp = "100101";
            let llOp = "110000";
            let luiOp = "001111";
            let lwOp = "100011";
            let oriOp = "001101";
            let sltiOp = "001010";
            let sltiuOp = "001011";
            let sbOp = "101000";
            let scOp = "111000";
            let shOp = "101001";
            let swOp = "101011";
            this.map.set("addi", addiOp);
            this.map.set("addiu", addiuOp);
            this.map.set("andi", andiOp);
            this.map.set("beq", beqOp);
            this.map.set("bne", bneOp);
            this.map.set("lbu", lbuOp);
            this.map.set("lhu", lhuOp);
            this.map.set("ll", llOp);
            this.map.set("lui", luiOp);
            this.map.set("lw", lwOp);
            this.map.set("ori", oriOp);
            this.map.set("slti", sltiOp);
            this.map.set("sltiu", sltiuOp);
            this.map.set("sb", sbOp);
            this.map.set("sc", scOp);
            this.map.set("sh", shOp);
            this.map.set("sw", swOp);
        }
        return this.map;
    }
}
exports.MapForI = MapForI;
MapForI.map = new Map();

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForInsType = void 0;
class MapForInsType {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            let typeR = "R";
            let typeI = "I";
            let typeJ = "J";
            this.map.set("add", typeR);
            this.map.set("addu", typeR);
            this.map.set("sub", typeR);
            this.map.set("subu", typeR);
            this.map.set("and", typeR);
            this.map.set("or", typeR);
            this.map.set("nor", typeR);
            this.map.set("slt", typeR);
            this.map.set("sltu", typeR);
            this.map.set("sll", typeR);
            this.map.set("srl", typeR);
            this.map.set("jr", typeR);
            this.map.set("addi", typeI);
            this.map.set("addiu", typeI);
            this.map.set("andi", typeI);
            this.map.set("beq", typeI);
            this.map.set("bne", typeI);
            this.map.set("lbu", typeI);
            this.map.set("lhu", typeI);
            this.map.set("llOp", typeI);
            this.map.set("lui", typeI);
            this.map.set("lw", typeI);
            this.map.set("ori", typeI);
            this.map.set("slti", typeI);
            this.map.set("sltiu", typeI);
            this.map.set("sb", typeI);
            this.map.set("sc", typeI);
            this.map.set("sh", typeI);
            this.map.set("sw", typeI);
            this.map.set("j", typeJ);
            this.map.set("jal", typeJ);
        }
        return this.map;
    }
}
exports.MapForInsType = MapForInsType;
MapForInsType.map = new Map();

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForJ = void 0;
class MapForJ {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            let jOp = "000010";
            let jalOp = "000011";
            this.map.set("j", jOp);
            this.map.set("jal", jalOp);
        }
        return this.map;
    }
}
exports.MapForJ = MapForJ;
MapForJ.map = new Map();

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForR = void 0;
class MapForR {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            let addFunct = "100000";
            let adduFunct = "100001";
            let subFunct = "100010";
            let subuFunct = "100011";
            let andFunct = "100100";
            let orFunct = "100101";
            let norFunct = "100111";
            let sltFunct = "101010";
            let sltuFunct = "101011";
            let sllFunct = "000000";
            let srlFunct = "000010";
            let jrFunct = "001000";
            this.map.set("add", addFunct);
            this.map.set("addu", adduFunct);
            this.map.set("sub", subFunct);
            this.map.set("subu", subuFunct);
            this.map.set("and", andFunct);
            this.map.set("or", orFunct);
            this.map.set("nor", norFunct);
            this.map.set("slt", sltFunct);
            this.map.set("sltu", sltuFunct);
            this.map.set("sll", sllFunct);
            this.map.set("srl", srlFunct);
            this.map.set("jr", jrFunct);
        }
        return this.map;
    }
}
exports.MapForR = MapForR;
MapForR.map = new Map();

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapForRegister = void 0;
class MapForRegister {
    constructor() { }
    static getMap() {
        if (this.map.size == 0) {
            this.map.set("zero", "0");
            this.map.set("at", "1");
            this.map.set("v0", "2");
            this.map.set("v1", "3");
            this.map.set("a0", "4");
            this.map.set("a1", "5");
            this.map.set("a2", "6");
            this.map.set("a3", "7");
            this.map.set("t0", "8");
            this.map.set("t1", "9");
            this.map.set("t2", "10");
            this.map.set("t3", "11");
            this.map.set("t4", "12");
            this.map.set("t5", "13");
            this.map.set("t6", "14");
            this.map.set("t7", "15");
            this.map.set("s0", "16");
            this.map.set("s1", "17");
            this.map.set("s2", "18");
            this.map.set("s3", "19");
            this.map.set("s4", "20");
            this.map.set("s5", "21");
            this.map.set("s6", "22");
            this.map.set("s7", "23");
            this.map.set("t8", "24");
            this.map.set("t9", "25");
            this.map.set("k0", "26");
            this.map.set("k1", "27");
            this.map.set("gp", "28");
            this.map.set("sp", "29");
            this.map.set("fp", "30");
            this.map.set("ra", "31");
        }
        return this.map;
    }
}
exports.MapForRegister = MapForRegister;
MapForRegister.map = new Map();

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformZeroOne = void 0;
//Transform one to zero and transform zero to one
function transformZeroOne(str) {
    let result = "";
    let i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == '0') {
            result = result + "1";
        }
        else if (str.charAt(i) == '1') {
            result = result + "0";
        }
        else {
            console.log("Error in function inverseZeroOne");
            return "";
        }
    }
    return result;
}
exports.transformZeroOne = transformZeroOne;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimSpace = void 0;
//Delete spaces in string except the first space
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

},{}],22:[function(require,module,exports){
$('#play').click(function () {
              const Assembler_1 = require("./Assembler");
              const InstructionI_1 = require("./InstructionI");
                let assembler = Assembler_1.Assembler.getAssembler();
                assembler.setSource(CodeMirrorEditor.getValue());
                if (assembler.assemble() == true) {
                    for (let i = 0; i < assembler.getBin().size(); i++) {
                        console.log(assembler.getBin().get(i));
                    }
                }
                else {
                  $('#displayArea').val("Error");
                }
            });
},{"./Assembler":2,"./InstructionI":10}]},{},[22]);
