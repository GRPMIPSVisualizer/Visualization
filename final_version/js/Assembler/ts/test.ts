import {ArrayList} from "./ArrayList";
import {decimalToBinary} from "./DecimalToBinary";
import {transformZeroOne } from "./TransformZeroOne";
import {binaryAddition} from "./BinaryAddition";
import {InstructionR} from "./InstructionR";
import {InstructionI} from "./InstructionI";
import {InstructionJ} from "./InstructionJ";
import {DecoderForR} from "./DecoderForR";
import {DecoderForI} from "./DecoderForI";
import {DecoderForJ} from "./DecoderForJ";
import {MapForInsType} from "./MapForInsType";
import {trimSpace} from "./TrimSpace";
var list = new ArrayList(10);
list.add("张三");
list.add("李四");
list.add("王五");
console.log("-------------测试添加-----------------");
for (var i = 0; i < list.size(); i++) {
    console.log(list.get(i));
}

console.log("-------------测试修改，下标1改为赵六-------------");
list.update(1, "赵六");
for (var i = 0; i < list.size(); i++) {
    console.log(list.get(i));
}


console.log("-------------测试删除，删除下标为2的-------------");
list.remove(2);
for (var i = 0; i < list.size(); i++) {
    console.log(list.get(i));
}

console.log("-------------测试删除，删除'王五'-------------");
list.remove('张三');
for (var i = 0; i < list.size(); i++) {
    console.log(list.get(i));
}

let nameSiteMapping = new Map();
 
// 设置 Map 对象
nameSiteMapping.set("Google", "000001");
nameSiteMapping.set("Runoob", 2);
nameSiteMapping.set("Taobao", 3);
 
// 获取键对应的值
console.log(nameSiteMapping.get("Runoob")); 
console.log(nameSiteMapping.get("Google")); 
console.log(nameSiteMapping.get("Taobao")); 

var name1 = "y";
name1 = "YCY";
let name2 = "YCYYCY";
name2 = "YCY";
var name3: string = "YCY"; 
let name4: string = "YCY";
console.log(name1);
console.log(name2);
console.log(name3);
console.log(name4);

var ins = "add $1,$2,$3";
var posOfSpace = ins.indexOf(" ");
var operands: String[] = ins.split(",", 3);
console.log(posOfSpace);
console.log(ins.substring(0,1));
console.log(ins.substring(0,posOfSpace));
console.log(ins.substring(posOfSpace + 1, ins.length));
console.log(operands[0]);
console.log(operands[1]);
console.log(operands[2]);

let arr: Array<number> = [];
arr.push(0);    
arr.push(1);
arr.push(2);
console.log(arr);

console.log(transformZeroOne("1000111"));

let x = +'1';
console.log(x);

let a: number = 10;
let b: String = '1';
let result = b + '' + a;
console.log(result);

console.log(binaryAddition("101100", "000111"));

console.log(Math.log2(8));

console.log(Math.log2(8) % 1);
console.log(Math.log2(7) % 1);
console.log(Math.ceil(Math.log2(7)) + 1);

console.log(decimalToBinary(-8, 6));

let d: undefined | number = undefined;
console.log(d == undefined);

console.log("a" != "a");
console.log("a" == "a");
console.log("-----------------");

let q: string = "abcde";
let p: string = "abc";
let o: string = q.substring(0,3);
console.log(o == "abc");
console.log(o == p);
console.log(o === "abc");
console.log(o === p);
let e = q.replace("a", "hhh");
console.log(q);
console.log(e);
console.log("---------------");

let instruction = new InstructionR("add $1,$2,$3");
console.log(instruction.getBinIns());

let instruction1 = new InstructionI("addi $1,$2,10");
console.log(instruction1.getBinIns());

let instruction2 = new InstructionI("addiu $1,$2,10");
console.log(instruction2.getBinIns());

let instruction3 = new InstructionR("addu $1,$2,$3");
console.log(instruction3.getBinIns());

let instruction4 = new InstructionR("and $1,$2,$3");
console.log(instruction4.getBinIns());

let instruction5 = new InstructionI("andi $1,$2,20");
console.log(instruction5.getBinIns());

let instruction6 = new InstructionI("beq $1,$2,25");
console.log(instruction6.getBinIns());

let instruction7 = new InstructionI("bne $1,$2,25");
console.log(instruction7.getBinIns());

let instruction8 = new InstructionJ("j 2500");
console.log(instruction8.getBinIns());

let instruction9 = new InstructionJ("jal 2500");
console.log(instruction9.getBinIns());

let instruction10 = new InstructionR("jr $31");
console.log(instruction10.getBinIns());

let instruction11 = new InstructionI("lbu $1,20($2)");
console.log(instruction11.getBinIns());

let instruction12 = new InstructionI("lhu $1,20($2)");
console.log(instruction12.getBinIns());

let instruction13 = new InstructionI("ll $1,20($2)");
console.log(instruction13.getBinIns());

let instruction14 = new InstructionI("lui $1,20");
console.log(instruction14.getBinIns());

let instruction15 = new InstructionI("lw $1,20($2)");
console.log(instruction15.getBinIns());

let instruction16 = new InstructionR("nor $1,$2,$3");
console.log(instruction16.getBinIns());

let instruction17 = new InstructionR("or $1,$2,$3");
console.log(instruction17.getBinIns());

let instruction18 = new InstructionI("ori $1,$2,20");
console.log(instruction18.getBinIns());

let instruction19 = new InstructionR("slt $1,$2,$3");
console.log(instruction19.getBinIns());

let instruction20 = new InstructionI("slti $1,$2,20");
console.log(instruction20.getBinIns());

let instruction21 = new InstructionI("sltiu $1,$2,20");
console.log(instruction21.getBinIns());

let instruction22 = new InstructionR("sltu $1,$2,$3");
console.log(instruction22.getBinIns());

let instruction23 = new InstructionR("sll $1,$2,10");
console.log(instruction23.getBinIns());

let instruction24 = new InstructionR("srl $1,$2,10");
console.log(instruction24.getBinIns());

let instruction25 = new InstructionI("sb $1,20($2)");
console.log(instruction25.getBinIns());

let instruction26 = new InstructionI("sc $1,20($2)");
console.log(instruction26.getBinIns());

let instruction27 = new InstructionI("sh $1,20($2)");
console.log(instruction27.getBinIns());

let instruction28 = new InstructionI("sw $1,20($2)");
console.log(instruction28.getBinIns());

let instruction29 = new InstructionR("sub $1,$2,$3");
console.log(instruction29.getBinIns());

let instruction30 = new InstructionR("subu $1,$2,$3");
console.log(instruction30.getBinIns());

console.log("--------------------------");

let decoderForR: DecoderForR = DecoderForR.getDecoder();
decoderForR.setIns("add $s1,$s2,$s3");
let binIns1: string = "origin";
if (decoderForR.validate() == true) {
    decoderForR.decode();
    binIns1 = decoderForR.getBinIns();
}
console.log(binIns1);

let instructionCom1 = new InstructionR("add $17,$18,$19");
console.log(instructionCom1.getBinIns());

console.log("-------------------------");
let decoderForI: DecoderForI = DecoderForI.getDecoder();
decoderForI.setIns("addi $s1,$s2,31");
let binIns2: string = "origin";
if (decoderForI.validate() == true) {
    decoderForI.decode();
    binIns2 = decoderForI.getBinIns();
}
console.log(binIns2);

let instructionCom2 = new InstructionI("addi $17,$18,31");
console.log(instructionCom2.getBinIns());

console.log("--------------------------");
let decoderForJ: DecoderForJ = DecoderForJ.getDecoder();
decoderForJ.setIns("j 10000");
let binIns3: string = "origin";
if (decoderForJ.validate() == true) {
    decoderForJ.decode();
    binIns3 = decoderForJ.getBinIns();
}
console.log(binIns3);

let instructionCom3 = new InstructionJ("j 10000");
console.log(instructionCom3.getBinIns());

console.log("------------------------------");
let map = MapForInsType.getMap();
for (let [key, value] of map) {
    console.log(key);
}

console.log("----------------------------");
let patt = /[\s]/;
console.log(patt.test("   "));
console.log(patt.test(" "));
console.log(patt.test("         "));
console.log(patt.test(""));

console.log("-----------------------------");
let testString = "add $1,$2,$3" + "\n" + "sub $3,$4,$5" + "\n" + "\n" + "ll 12";
let substrings = testString.split("\n");
console.log(substrings);

console.log("------------------------------");
let num = "-1000";
console.log(+num + 100);

let num2 = "+1000";
console.log(+num2 + 100);

console.log("-----------------------------");
let imm = "+1000";
console.log(imm.substring(1));

let patt1 = /^[0-9]$/;

let IMM = "10+00";
if ((!patt1.test(IMM.charAt(0)) && IMM.charAt(0) != "+" && IMM.charAt(0) != "-") || !patt1.test(IMM)) {
    console.log("Invalid");
} else {
    console.log("valid");
}
console.log(patt1.test(IMM));
console.log(patt1.test("1"));

console.log("--------------------------");
let str: string = "add $s1,  $s2, $s3";
str = trimSpace(str);
console.log(str);