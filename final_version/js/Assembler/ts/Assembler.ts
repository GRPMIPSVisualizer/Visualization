import { DecoderForR } from "./DecoderForR";
import { DecoderForI } from "./DecoderForI";
import { DecoderForJ } from "./DecoderForJ";
import { MapForCommaNum } from "./MapForCommaNum";
import { MapForInsType } from "./MapForInsType";
import { ArrayList } from "./ArrayList";
import { trimSpace } from "./TrimSpace";
import { decimalToBinary } from "./DecimalToBinary";
import { binaryToDecimal } from "./BinaryToDecimal";

/**
 * Class Assembler is for an assembler to validate the MIPS code and change the MIPS code into binary code.
 * 
 * This class contains methods that format the source code, deal with labels and pseudo instructions, 
 * segment data part and text part of the code and change the code into binary code.
 * It also provides some get methods to get the source code, basic code and maps which store the address and the data stored in the address.
 * 
 */
export class Assembler {

    /**
     * Assembler for validating the MIPS code and translating the MIPS code into binary code.
     */
    private static assembler: Assembler = new Assembler();
    /**
     * The decoder to validate and decode instructions of type-R.
     */
    private decoderForR: DecoderForR = DecoderForR.getDecoder();
    /**
     * The decoder to validate and decode instructions of type-I.
     */
    private decoderForI: DecoderForI = DecoderForI.getDecoder();
    /**
     * The decoder to validate and decode instructions of type-J.
     */
    private decoderForJ: DecoderForJ = DecoderForJ.getDecoder();
    /**
     * The raw input from the user.
     */
    private sources: Array<string> = [];
    /**
     * The contents contained in the .data segment.
     */
    private data: ArrayList<string> = new ArrayList<string>(10);
    /**
     * The contents contained in the .text segment in the form of an ArrayList.
     */
    private sourceInsAL: ArrayList<string> = new ArrayList<string>(10);
    /**
     * The contents stored in the .text segment in the form of an array.
     */
    private sourceIns: Array<string> = [];
    /**
     * The contents of the code which has translated the label to address and expanded pseudo instructions.
     */
    private basic: ArrayList<string> = new ArrayList<string>(10);
    /**
     * The binary code of the MIPS instructions.
     */
    private bin: ArrayList<string> = new ArrayList<string>(10);
    /**
     * The map stored labels in the .data segment, which the keys are labels and the values are addresses matched with labels.
     */
    private mapForDataLabel: Map<string, string> = new Map();
    /**
     * The map stored .word data in the .data segment, which the keys are addresses and the values are integers stored in addresses.
     */
    private mapForWord: Map<string, number> = new Map();
    /**
     * The map stored .ascii and .asciiz data in the .data segment, which the keys are addresses and the values are strings stored in addresses.
     */
    private mapForAscii: Map<string, string> = new Map();
    /**
     * The map stored .byte data in the .data segment, which the keys are addresses and the values are integers stored in addresses.
     */
    private mapForByte: Map<string, number> = new Map();
    /**
     * The string for error message of invalid MIPS code.
     */
    private errMsg: string = "";
    
    /**
     * Constructor for Assembler.
     */
    private constructor() { }

    /**
     * Method for getting the assembler to assemble the MIPS code.
     * @returns an assembler for validating the MIPS code and translating the MIPS code into binary code.
     */
    public static getAssembler(): Assembler {
        return this.assembler;
    }

    /**
     * Method for getting the error message of invalid MIPS code.
     * @returns a string of error message.
     */
    public getErrMsg(): string {
        return this.errMsg;
    }

    /**
     * Method for getting the map which stores .word data in the .data segment.
     * @returns a map which the keys are addresses and the values are integers stored in addresses.
     */
    public getMapForWord(): Map<string, number> {
        return this.mapForWord;
    }

    /**
     * Method for getting the map which stores labels in the .data segment.
     * @returns a map which the keys are labels and the values are addresses matched with labels.
     */
    public getMapForDataLabel(): Map<string, string> {
        return this.mapForDataLabel;
    }

    /**
     * Method for getting the map which stores .ascii and .asciiz data in the .data segment.
     * @returns a map which the keys are addresses and the values are strings stored in addresses.
     */
    public getMapForAscii(): Map<string, string> {
        return this.mapForAscii;
    }

    /**
     * Method for getting the map which stores .byte data in the .data segment.
     * @returns a map which the keys are addresses and the values are integers stored in addresses.
     */
    public getMapForByte(): Map<string, number> {
        return this.mapForByte;
    }

    /**
     * Method for getting the .text segment in the form of an ArrayList.
     * @returns an ArrayList of .text segment.
     */
    public getSourceInsAL(): ArrayList<string> {
        return this.sourceInsAL;
    }

    /**
     * Method for getting .text segment in the form of an array.
     * @returns an array of .text segment.
     */
    public getSourceIns(): Array<string> {
        return this.sourceIns;
    }

    /**
     * Method for getting code which has translated the label to address and expanded pseudo instructions in the form of an ArrayList.
     * @returns an ArrayList of code which has translated the label to address and expanded pseudo instructions.
     */
    public getBasic(): ArrayList<string> {
        return this.basic;
    }

    /**
     * Method for getting the code of .data segment in the form of an ArrayList.
     * @returns an ArrayList of the code of .data segment.
     */
    public getData(): ArrayList<string> {
        return this.data;
    }

    /**
     * Method for getting the binary code of the MIPS instructions in the form of an ArrayList.
     * @returns an ArrayList of the binary code.
     */
    public getBin(): ArrayList<string> {
        return this.bin;
    }

    /**
     * Set the sources using the raw input from the user.
     * @param input the raw input from the user.
     * @returns void
     */
    public setSources(input: string): void {
        this.sources = input.split("\n");
        let i: number;
        
        //Deal with MIPS comments which start with a hash sign
        for (i = 0; i < this.sources.length; i++) {
            this.sources[i] = this.sources[i].trim();
            if (this.sources[i].search("#") != -1) {
                let posOfHash = this.sources[i].search("#");
                this.sources[i] = this.sources[i].substring(0, posOfHash);
            }
        }
    }

    /**
     * Divide the sources(the raw input from the user) into two segments -- data segment and text segment. 
     * The contents of the data segment are stored into an ArrayList called data.
     * The contents of the text segment are stored into an ArrayList called sourceInsAL
     * and an Array called sourceIns.
     * @returns void
     */
    public segmentDataText(): void {
        let i: number;
        let j: number;
        let indices: Array<number> = new Array<number>();
        for (i = 0; i < this.sources.length; i++) {
            if (this.sources[i] == ".data" || this.sources[i] == ".text") {
                indices.push(i);
            }
            if (this.sources[i] == ".globl main") {
                this.sources[i] = "";
            }
        }

        if (indices.length == 0) {
            for (i = 0; i < this.sources.length; i++) {
                this.sourceInsAL.add(this.sources[i]);
            }
        } else {
            for (i = 0; i < indices.length; i++) {
                if (i == 0) {
                    if (indices[0] != 0) {
                        for (j = 0; j < indices[0]; j++) {
                            this.sourceInsAL.add(this.sources[j]);
                        }
                    }
                    if (indices.length == 1) {
                        if (this.sources[indices[i]] == ".data") {
                            for (j = indices[0] + 1; j < this.sources.length; j++) {
                                this.data.add(this.sources[j]);
                            }
                        } else {
                            for (j = indices[0] + 1; j < this.sources.length; j++) {
                                this.sourceInsAL.add(this.sources[j]);
                            }
                        }
                    } else {
                        if (this.sources[indices[i]] == ".data") {
                            for (j = indices[0] + 1; j < indices[1]; j++) {
                                this.data.add(this.sources[j]);
                            }
                        } else {
                            for (j = indices[0] + 1; j < indices[1]; j++) {
                                this.sourceInsAL.add(this.sources[j]);
                            }
                        }
                    }
                } else {
                    if (indices.length == (i + 1)) {
                        if (this.sources[indices[i]] == ".data") {
                            for (j = indices[i] + 1; j < this.sources.length; j++) {
                                this.data.add(this.sources[j]);
                            }
                        } else {
                            for (j = indices[i] + 1; j < this.sources.length; j++) {
                                this.sourceInsAL.add(this.sources[j]);
                            }
                        }
                    } else {
                        if (this.sources[indices[i]] == ".data") {
                            for (j = indices[i] + 1; j < indices[i + 1]; j++) {
                                this.data.add(this.sources[j]);
                            }
                        } else {
                            for (j = indices[i] + 1; j < indices[i + 1]; j++) {
                                this.sourceInsAL.add(this.sources[j]);
                            }
                        }
                    }
                }
            }
        }

        for (i = 0; i < this.sourceInsAL.size(); i++) {
            if (this.sourceInsAL.get(i) == "") {
                this.sourceInsAL.remove(i);
            }
        }

        for (i = 0; i < this.sourceInsAL.size(); i++) {
            this.sourceIns[i] = this.sourceInsAL.get(i).toString();
        }
    }

    /**
     * Divide the label and instruction into two lines if they are in the same line in source instructions.
     * The function operates the Array called sourceIns directly.
     * If a label is valid and followed by an instruction which in the same line,
     * the element is separated into two elements in the array which one is the label and the other is the next instruction.
     * @returns true if there is no invalid labels and separate successfully, false if there are invalid labels.
     */
    public separateLabelIns(): boolean {
        let result: boolean = true;
        let posOfColon: number;
        let pattLabel = /^[A-Za-z0-9._]+$/;
        let pattnumber = /[0-9]/;
        let i: number;
        let label: string;
        for (i = 0; i < this.sourceIns.length; i++) {
            posOfColon = this.sourceIns[i].indexOf(":");
            if (posOfColon != -1) {
                label = this.sourceIns[i].substring(0, posOfColon).trim();
                if (pattLabel.test(label) && pattnumber.test(label.charAt(0))) {
                    this.errMsg = this.errMsg + "Error 303: Invalid label. -- " + this.sourceIns[i] + "\n";
                    return false;
                } else if (this.sourceIns[i].substring(posOfColon + 1, this.sourceIns[i].length) != "") {
                    //console.log(this.sourceIns);
                    this.sourceIns.splice(i, 1, label + ":", this.sourceIns[i].substring(posOfColon + 1, this.sourceIns[i].length));
                    //console.log(this.sourceIns);
                }
            }
        }
        return result;
    }

    /**
     * Format the data segment.
     * The function puts the label and the data layout instruction in the same line with a space interval if they do not follow this format
     * and puts the data layout instruction and the data in the same line with a space interval if they do not follow this format.
     * The formatted code is stored back to the ArrayList called data.
     * @returns true if the data segment is formatted successfully and false if there are invalid labels or instructions.
     */
    public formatData(): boolean {
        let result: boolean = true;
        let i: number;
        let posOfColon: number;
        let label: string;
        let patt = /^[\s]$/;
        let pattLabel = /^[A-Za-z0-9._]+$/;
        let pattnumber = /[0-9]/;
        let resultData: ArrayList<string> = new ArrayList<string>();
        for (i = 0; i < this.data.size(); i++) {
            posOfColon = this.data.get(i).toString().indexOf(":");
            if (posOfColon != -1) {
                label = this.data.get(i).toString().substring(0, posOfColon);
                if (pattLabel.test(label) && pattnumber.test(label.charAt(0))) {
                    this.errMsg = this.errMsg + "Error 302: Invalid label. -- " + this.data.get(i) + "\n";
                    return false;
                }
                if (this.data.get(i).toString().substring(posOfColon + 1, this.data.get(i).toString.length) == "" || !patt.test(this.data.get(i).toString().substring(posOfColon + 1, this.data.get(i).toString.length))) {
                    if (i == this.data.size() - 1) {
                        resultData.add(label + ":");
                        return true;
                    } else if (this.data.get(i + 1).toString().indexOf(":") != -1) {
                        resultData.add(label + ":");
                        continue;
                    } else {
                        if (this.data.get(i + 1).toString().trim() == ".word" || this.data.get(i + 1).toString().trim() == ".byte" || this.data.get(i + 1).toString().trim() == ".ascii" || this.data.get(i + 1).toString().trim() == ".asciiz") {
                            if (i != this.data.size() - 2) {
                                if (this.data.get(i + 2).toString().trim().charAt(0) != ".") {
                                    resultData.add(label + ": " + this.data.get(i + 1).toString() + " " + this.data.get(i + 2).toString());
                                    i = i + 2;
                                    continue;
                                }
                            }
                        } else {
                            resultData.add(label + ": " + this.data.get(i + 1).toString());
                            i++;
                            continue;
                        }
                    }
                } else {
                    resultData.add(label + ": " + this.data.get(i).toString().substring(posOfColon + 1, this.data.get(i).toString.length));
                }
            } else {
                if (this.data.get(i).toString().trim() == ".ascii" || this.data.get(i).toString().trim() == ".asciiz") {
                    if (i == this.data.size() - 1) {
                        return true;
                    } else if (this.data.get(i + 1).toString().trim().charAt(0) == "\"" && this.data.get(i + 1).toString().trim().endsWith("\"")) {
                        resultData.add(this.data.get(i).toString().trim() + " " + this.data.get(i + 1).toString().trim());
                        i++;
                        continue;
                    } else {
                        continue;
                    }
                } else if (this.data.get(i).toString().trim() == ".word") {
                    if (i == this.data.size() - 1) {
                        return true;
                    } else if (pattnumber.test(this.data.get(i + 1).toString().trim())) {
                        resultData.add(".word " + this.data.get(i + 1).toString().trim());
                        i++;
                        continue;
                    } else {
                        continue;
                    }
                } else if (this.data.get(i).toString().trim() == ".byte") {
                    if (i == this.data.size() - 1) {
                        return true;
                    } else if (pattnumber.test(this.data.get(i + 1).toString().trim())) {
                        resultData.add(".byte " + this.data.get(i + 1).toString().trim());
                        i++;
                        continue;
                    } else {
                        continue;
                    }
                } else {
                    this.errMsg = this.errMsg + "Error 336: Invalid instruction. -- " + this.data.get(i) + "\n";
                    return false;
                }
            }
        }

        for (i = 0; i < resultData.size(); i++) {
            this.data.update(i, resultData.get(i).toString());
        }
        let sizeOfData: number = this.data.size();
        if (sizeOfData > resultData.size()) {
            for (i = resultData.size(); i < sizeOfData; i++) {
                this.data.remove(i);
            }
        }
        return result;
    }

    /**
     * Store the data in the data segment into maps.
     * The labels in the data segment are stored as keys and the addresses matched with the labels are stored as values in the map called mapForDataLabel.
     * The addresses of the data stored by .word instructions are stored as keys and the data stored in this address is stored as values in the map called mapForWord.
     * The addresses of the data stored by .byte instructions are stored as keys and the data stored in this address is stored as values in the map called mapForByte.
     * The addresses of string are stored as keys and the string stored in this address is stored as values in the map called mapForAscii.
     * @returns true if all data is stored successfully and false if there is invalid data type or the data is out of range.
     */
    public storeData(): boolean {
        let result: boolean = true;
        let i: number;
        let j: number;
        let label: string;
        let address: string = "268500992";
        let posOfSpace: number;
        let dataIns: string;
        let patt = /^(\-|\+)?\d+$/;
        for (i = 0; i < this.data.size(); i++) {
            let ins: string = this.data.get(i).toString();
            let posOfColon: number = ins.indexOf(":");
            if (posOfColon != -1) {
                label = ins.substring(0, posOfColon).trim();
                this.mapForDataLabel.set(label, address);
                let insAfterLabel = ins.substring(posOfColon + 2, ins.length);
                posOfSpace = insAfterLabel.indexOf(" ");
                dataIns = insAfterLabel.substring(0, posOfSpace);
                if (dataIns == ".word") {
                    if (insAfterLabel.substring(posOfSpace, ins.length).trim().indexOf(",") != -1) {
                        let wordArray = insAfterLabel.substring(posOfSpace, ins.length).trim().split(",");
                        for (j = 0; j < wordArray.length; j++) {
                            if (!patt.test(wordArray[j])) {
                                this.errMsg = this.errMsg + "Error 304: Invalid data type. -- " + this.data.get(i) + "\n";
                                return false;
                            } else if (+wordArray[j] > 2147483647 || +wordArray[j] < -2147483648) {
                                this.errMsg = this.errMsg + "Error 305: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                if (+address % 4 == 0) {
                                    this.mapForWord.set(address, +wordArray[j]);
                                } else {
                                    address = (+address + +address % 4).toFixed();
                                    this.mapForWord.set(address, +wordArray[j]);
                                }
                                address = (+address + 4).toFixed();
                            }
                        }
                    } else {
                        if (insAfterLabel.substring(posOfSpace, ins.length).trim() == "") {
                            continue;
                        }
                        if (patt.test(insAfterLabel.substring(posOfSpace, ins.length).trim())) {
                            this.errMsg = this.errMsg + "Error 306: Invalid data type. -- " + this.data.get(i) + "\n";
                            return false;
                        } else {
                            let wordNumber: number = +ins.substring(posOfSpace, ins.length).trim();
                            if (wordNumber > 2147483647 || wordNumber < -2147483648) {
                                this.errMsg = this.errMsg + "Error 307: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                if (+address % 4 == 0) {
                                    this.mapForWord.set(address, wordNumber);
                                } else {
                                    address = (+address + +address % 4).toFixed();
                                    this.mapForWord.set(address, wordNumber);
                                }
                                address = (+address + 4).toFixed();
                            }
                        }
                    }
                } else if (dataIns == ".byte") {
                    if (insAfterLabel.substring(posOfSpace, ins.length).trim().indexOf(",") != -1) {
                        let byteArray = insAfterLabel.substring(posOfSpace, ins.length).trim().split(",");
                        for (j = 0; j < byteArray.length; j++) {
                            if (!patt.test(byteArray[j])) {
                                this.errMsg = this.errMsg + "Error 308: Invalid data type. -- " + this.data.get(i) + "\n";
                                return false;
                            } else if (+byteArray[j] > 127 || +byteArray[j] < -128) {
                                this.errMsg = this.errMsg + "Error 309: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                this.mapForByte.set(address, +byteArray[j]);
                                address = (+address + 1).toFixed();
                            }
                        }
                    } else {
                        if (insAfterLabel.substring(posOfSpace, ins.length).trim() == "") {
                            continue;
                        }
                        if (!patt.test(ins.substring(posOfSpace, ins.length).trim())) {
                            this.errMsg = this.errMsg + "Error 310: Invalid data type. -- " + this.data.get(i) + "\n";
                            return false;
                        } else {
                            let byteNumber: number = +insAfterLabel.substring(posOfSpace, ins.length).trim();
                            if (byteNumber > 127 || byteNumber < -128) {
                                this.errMsg = this.errMsg + "Error 311: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                this.mapForWord.set(address, byteNumber);
                                address = (+address + 1).toFixed();
                            }
                        }
                    }
                } else if (dataIns == ".ascii" || dataIns == ".asciiz") {
                    if (insAfterLabel.substring(posOfSpace, ins.length).trim().charAt(0) != "\"" || !insAfterLabel.substring(posOfSpace, ins.length).trim().endsWith("\"")) {
                        this.errMsg = this.errMsg + "Error 312: Invalid string. -- " + this.data.get(i) + "\n";
                        return false;
                    } else {
                        if (dataIns == ".ascii") {
                            this.mapForAscii.set(address, insAfterLabel.substring(posOfSpace + 2, insAfterLabel.length - 1));
                            address = (+address + insAfterLabel.substring(posOfSpace + 2, ins.length - 1).length).toFixed();
                        } else {
                            this.mapForAscii.set(address, insAfterLabel.substring(posOfSpace + 2, insAfterLabel.length - 1) + "\n");
                            address = (+address + insAfterLabel.substring(posOfSpace + 2, ins.length - 1).length + 1).toFixed();
                        }
                    }
                }
            } else {
                posOfSpace = ins.indexOf(" ");
                dataIns = ins.substring(0, posOfSpace);
                if (dataIns == ".word") {
                    if (ins.substring(posOfSpace, ins.length).trim().indexOf(",") != -1) {
                        let wordArray = ins.substring(posOfSpace, ins.length).trim().split(",");
                        for (j = 0; j < wordArray.length; j++) {
                            if (!patt.test(wordArray[j])) {
                                this.errMsg = this.errMsg + "Error 313: Invalid data type. -- " + this.data.get(i) + "\n";
                                return false;
                            } else if (+wordArray[j] > 2147483647 || +wordArray[j] < -2147483648) {
                                this.errMsg = this.errMsg + "Error 314: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                if (+address % 4 == 0) {
                                    this.mapForWord.set(address, +wordArray[j]);
                                } else {
                                    address = (+address + +address % 4).toFixed();
                                    this.mapForWord.set(address, +wordArray[j]);
                                }
                                address = (+address + 4).toFixed();
                            }
                        }
                    } else {
                        if (ins.substring(posOfSpace, ins.length).trim() == "") {
                            continue;
                        }
                        if (!patt.test(ins.substring(posOfSpace, ins.length).trim())) {
                            this.errMsg = this.errMsg + "Error 315: Invalid data type. -- " + this.data.get(i) + "\n";
                            return false;
                        } else {
                            let wordNumber: number = +ins.substring(posOfSpace, ins.length).trim();
                            if (wordNumber > 2147483647 || wordNumber < -2147483648) {
                                this.errMsg = this.errMsg + "Error 316: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                if (+address % 4 == 0) {
                                    this.mapForWord.set(address, wordNumber);
                                } else {
                                    address = (+address + +address % 4).toFixed();
                                    this.mapForWord.set(address, wordNumber);
                                }
                                address = (+address + 4).toFixed();
                            }
                        }
                    }
                } else if (dataIns == ".byte") {
                    if (ins.substring(posOfSpace, ins.length).trim().indexOf(",") != -1) {
                        let byteArray = ins.substring(posOfSpace, ins.length).trim().split(",");
                        for (j = 0; j < byteArray.length; j++) {
                            if (!patt.test(byteArray[j])) {
                                this.errMsg = this.errMsg + "Error 317: Invalid data type. -- " + this.data.get(i) + "\n";
                                return false;
                            } else if (+byteArray[j] > 127 || +byteArray[j] < -128) {
                                this.errMsg = this.errMsg + "Error 318: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                this.mapForByte.set(address, +byteArray[j]);
                                address = (+address + 1).toFixed();
                            }
                        }
                    } else {
                        if (ins.substring(posOfSpace, ins.length).trim() == "") {
                            continue;
                        }
                        if (!patt.test(ins.substring(posOfSpace, ins.length).trim())) {
                            this.errMsg = this.errMsg + "Error 319: Invalid data type. -- " + this.data.get(i) + "\n";
                            return false;
                        } else {
                            let byteNumber: number = +ins.substring(posOfSpace, ins.length).trim();
                            if (byteNumber > 127 || byteNumber < -128) {
                                this.errMsg = this.errMsg + "Error 320: Data value out of range. -- " + this.data.get(i) + "\n";
                                return false;
                            } else {
                                this.mapForWord.set(address, byteNumber);
                                address = (+address + 1).toFixed();
                            }
                        }
                    }
                } else if (dataIns == ".ascii" || dataIns == ".asciiz") {
                    if (ins.substring(posOfSpace, ins.length).trim().charAt(0) != "\"" || !ins.substring(posOfSpace, ins.length).trim().endsWith("\"")) {
                        this.errMsg = this.errMsg + "Error 321: Invalid string. -- " + this.data.get(i) + "\n";
                        return false;
                    } else {
                        this.mapForAscii.set(address, ins.substring(posOfSpace + 2, ins.length - 1));
                        if (dataIns == ".ascii") {
                            address = (+address + ins.substring(posOfSpace + 2, ins.length - 1).length).toFixed();
                        } else {
                            address = (+address + ins.substring(posOfSpace + 2, ins.length - 1).length + 1).toFixed();
                        }
                    }
                }
            }

        }
        return result;
    }

    /**
     * Check whether there are labels with the same name or not.
     * @returns true if there is no labels with the same name, otherwise false.
     */
    public checkLabel(): boolean {
        let result: boolean = true;
        let i: number;
        let posOfColon: number;
        let mapForAllLabel: Map<string, string> = new Map();
        for (i = 0; i < this.sources.length; i++) {
            posOfColon = this.sources[i].indexOf(":");
            if (posOfColon != -1) {
                let label = this.sources[i].substring(0, posOfColon);
                if (mapForAllLabel.has(label)) {
                    this.errMsg = this.errMsg + "Error 301: Label has already existed. -- " + this.sources[i] + "\n";
                    return false;
                } else {
                    mapForAllLabel.set(label, "");
                }
            } else {
                continue;
            }
        }
        return result;
    }

    /**
     * Expand the pseudo instructions into basic instructions.
     * @returns true if there is no error in the pseudo instructions, otherwise false.
     */
    public expandPseudo(): boolean {
        let i: number;
        let result: boolean = true;
        let posOfSpace: number;
        let operator: string;
        let temp: Array<string> = [];
        for (i = 0; i < this.sourceIns.length; i++) {
            if (this.sourceIns[i] == "syscall") {
                temp.push(this.sourceIns[i]);
                continue;
            }
            posOfSpace = this.sourceIns[i].indexOf(" ");
            operator = this.sourceIns[i].substring(0, posOfSpace);
            if (MapForCommaNum.getMap().has(operator)) {
                let expectedNumComma: number | undefined = MapForCommaNum.getMap().get(operator);
                let actualNumComma = this.sourceIns[i].split(",").length - 1;
                if (expectedNumComma == undefined) {
                    this.errMsg = this.errMsg + "Error 322: Invalid instruction. -- " + this.sourceIns[i] + "\n";
                    return false;
                } else if (expectedNumComma == actualNumComma) {
                    let type: string | undefined = MapForInsType.getMap().get(operator);
                    if (type == undefined) {
                        this.errMsg = this.errMsg + "Error 323: Invalid instruction. -- " + this.sourceIns[i] + "\n";
                        return false;
                    } else if (type == "P") {
                        let ins0: string = "";
                        let ins1: string = "";
                        let ins2: string = "";
                        let operands: Array<string>;
                        let operand0: string = "";
                        let operand1: string = "";
                        let operand2: string = "";

                        operands = this.sourceIns[i].substring(posOfSpace + 1).split(",");

                        if (operands[0] != "") {
                            operand0 = operands[0];
                        }
                        if (operands[1] != "") {
                            operand1 = operands[1];
                        }
                        if (operands[2] != "") {
                            operand2 = operands[2];
                        }

                        if (operator == "abs") {
                            ins0 = "sra $1," + operand1 + ",31";
                            ins1 = "xor " + operand0 + ",$1," + operand1;
                            ins2 = "subu " + operand0 + "," + operand0 + ",$1";
                        } else if (operator == "blt") {
                            ins0 = "slt $1," + operand0 + "," + operand1;
                            ins1 = "bne $1,$0," + operand2;
                        } else if (operator == "bgt") {
                            ins0 = "slt $1," + operand1 + "," + operand0;
                            ins1 = "bne $1,$0," + operand2;
                        } else if (operator == "ble") {
                            ins0 = "slt $1," + operand1 + "," + operand0;
                            ins1 = "beq $1,$0," + operand2;
                        } else if (operator == "neg") {
                            ins0 = "sub " + operand0 + ",$0," + operand1;
                        } else if (operator == "negu") {
                            ins0 = "subu " + operand0 + ",$0," + operand1;
                        } else if (operator == "not") {
                            ins0 = "nor " + operand0 + "," + operand1 + ",$0";
                        } else if (operator == "bge") {
                            ins0 = "slt $1," + operand0 + "," + operand1;
                            ins1 = "beq $1,$0," + operand2;
                        } else if (operator == "li") {
                            ins0 = "addiu " + operand0 + ",$0," + operand1;
                        } else if (operator == "la") {
                            if (this.mapForDataLabel.has(operand1.trim())) {
                                let address: string = decimalToBinary(+(this.mapForDataLabel.get(operand1) + ""), 32);
                                let first16bits = binaryToDecimal(address.substring(0, 16));
                                let last16bits = binaryToDecimal(address.substring(16));
                                ins0 = "lui $1," + first16bits;
                                ins1 = "ori " + operand0 + ",$1," + last16bits;
                            } else {
                                this.errMsg = this.errMsg + "Error 324: Label unrecongnized. -- " + this.sourceIns[i] + "\n";
                                return false;
                            }
                        } else if (operator == "move") {
                            ins0 = "addu " + operand0 + ",$0," + operand1;
                        } else if (operator == "sge") {
                            ins0 = "slt " + operand0 + "," + operand1 + "," + operand2;
                            ins1 = "ori $1,$0,1";
                            ins2 = "subu " + operand0 + ",$1," + operand0;
                        } else if (operator == "sgt") {
                            ins0 = "slt" + operand0 + "," + operand2 + "," + operand1;
                        }

                        if (ins0 != "") {
                            temp.push(ins0);
                        }
                        if (ins1 != "") {
                            temp.push(ins1);
                        }
                        if (ins2 != "") {
                            temp.push(ins2);
                        }
                    } else {
                        temp.push(this.sourceIns[i]);
                    }
                } else {
                    this.errMsg = this.errMsg + "Error 325: Too few or incorrectly formatted operands. -- " + this.sourceIns[i] + "\n";
                    return false;
                }
            } else if (this.sourceIns[i].trim().split(":").length != 0) {
                temp.push(this.sourceIns[i]);
            } else {
                this.errMsg = this.errMsg + "Error 326: Instruction unrecognized. -- " + this.sourceIns[i] + "\n";
                return false;
            }
        }
        this.sourceIns = temp;
        return result;
    }

    /**
     * Translate the labels in the "j", "jal", "beq" and "bne" instructions into addresses or offset.
     * The translated instructions are stored in an ArrayList called basic.
     * @returns true if all labels in the four types of instructions are translated successfully, false if there are invalid labels.
     */
    public translateLabel(): boolean {
        let result: boolean = true;
        let i: number;
        let label: string;
        let mapForLabel: Map<string, string> = new Map();
        let address: string = "4194304";
        let posOfSpace: number;
        let operator: string;
        let jumpLabel: string;
        let instructionCounter: number = 0;
        let labelCounter: number = 0;
        let mapForCounter: Map<string, string> = new Map();
        let relativeJump: number = 0;
        let patt = /^[\s]$/;
        let pattLabel = /^[A-Za-z0-9._]+$/;
        let pattnumber = /[0-9]/;
        let posOfColon: number;

        for (i = 0; i < this.sourceIns.length; i++) {
            if (this.sourceIns[i] == "" || patt.test(this.sourceIns[i])) {
                continue;
            } else {
                posOfColon = this.sourceIns[i].indexOf(":");
                if (posOfColon != -1) {
                    label = this.sourceIns[i].substring(0, posOfColon).trim();
                    if (pattLabel.test(label)) {
                        if (pattnumber.test(label.charAt(0))) {
                            this.errMsg = this.errMsg + "Error 327: Invalid label. -- " + this.sourceIns[i] + "\n";
                            return false;
                        } else {
                            mapForLabel.set(label, address);
                            labelCounter = instructionCounter;
                            mapForCounter.set(label, labelCounter.toFixed());
                        }
                    } else {
                        this.errMsg = this.errMsg + "Error 328: Invalid label. -- " + this.sourceIns[i] + "\n";
                        return false;
                    }
                }
                address = (+address + 4).toFixed();
            }
            instructionCounter++;
        }

        instructionCounter = 0;
        for (i = 0; i < this.sourceIns.length; i++) {
            if (this.sourceIns[i] == "" || patt.test(this.sourceIns[i]) || this.sourceIns[i].substring(this.sourceIns[i].length - 1, this.sourceIns[i].length) == ":") {
                instructionCounter++;
                continue;
            } else {
                posOfSpace = this.sourceIns[i].indexOf(" ");
                operator = this.sourceIns[i].substring(0, posOfSpace);
                if (operator == "j" || operator == "jal") {
                    jumpLabel = this.sourceIns[i].substring(posOfSpace, this.sourceIns[i].length).trim();
                    if (mapForLabel.has(jumpLabel)) {
                        if (operator == "j") {
                            this.sourceIns[i] = "j " + mapForLabel.get(jumpLabel);
                        } else {
                            this.sourceIns[i] = "jal " + mapForLabel.get(jumpLabel);
                        }
                    } else {
                        this.errMsg = this.errMsg + "Error 329: Operand is of incorrect type. -- " + this.sourceIns[i] + "\n";
                        return false;
                    }
                } else if (operator == "beq" || operator == "bne") {
                    jumpLabel = this.sourceIns[i].substring(this.sourceIns[i].lastIndexOf(",") + 1, this.sourceIns[i].length).trim();
                    if (mapForLabel.has(jumpLabel)) {
                        relativeJump = +(mapForCounter.get(jumpLabel) + "") - instructionCounter - 1;
                        if (operator == "beq") {
                            this.sourceIns[i] = "beq" + this.sourceIns[i].substring(posOfSpace, this.sourceIns[i].lastIndexOf(",") + 1) + relativeJump.toFixed();
                        } else {
                            this.sourceIns[i] = "bne" + this.sourceIns[i].substring(posOfSpace, this.sourceIns[i].lastIndexOf(",") + 1) + relativeJump.toFixed();
                        }
                    } else {
                        this.errMsg = this.errMsg + "Error 330: Label is not found. -- " + this.sourceIns[i] + "\n";
                        return false;
                    }
                }
                this.basic.add(trimSpace(this.sourceIns[i]));
                instructionCounter++;
            }
        }
        return result;
    }

    /**
     * Preprocess the instructions before assembling.
     * Methods called "segmentDataText", "checkLabel", "formatData", "separateLabelIns", "storeData", "expandPseudo" and "translateLabel"
     * are executed one by one.
     * @returns true if all methods in preprocess return true, otherwise false.
     */
    public preprocess(): boolean {
        this.segmentDataText();
        if (this.checkLabel()) {
            if (this.formatData()) {
                if (this.separateLabelIns()) {
                    if (this.storeData()) {
                        if (this.expandPseudo()) {
                            if (this.translateLabel()) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Clear all fields in Assembler.
     * @returns void
     */
    public refresh(): void {
        this.sources = [];
        this.data.clear();
        this.sourceInsAL.clear();
        this.sourceIns = [];
        this.basic.clear();
        this.bin.clear();
        this.mapForDataLabel.clear();
        this.mapForWord.clear();
        this.mapForAscii.clear();
        this.mapForByte.clear();
        this.errMsg = "";
    }

    /**
     * Assemble the instructions stored in the ArrayList called basic and translate instructions into a string of binary code.
     * The binary code is stored in the ArrayList called bin.
     * @returns true if all the instructions are valid and translated into binary code successfully, otherwise false. 
     */
    public assemble(): boolean {
        let result: boolean = true;
        let i: number;
        for (i = 0; i < this.basic.size(); i++) {
            let ins: string = this.basic.get(i).toString();
            if (ins == "syscall") {
                this.bin.add("00000000000000000000000000001100");
                continue;
            }
            let posOfSpace: number = ins.indexOf(" ");
            let operator: string = ins.substring(0, posOfSpace);
            if (MapForCommaNum.getMap().has(operator)) {
                let expectedNumComma: number | undefined = MapForCommaNum.getMap().get(operator);
                let actualNumComma = ins.split(",").length - 1;
                if (expectedNumComma == undefined) {
                    this.errMsg = this.errMsg + "Error 331: Instruction unrecognized. -- " + this.basic.get(i) + "\n";
                    console.log("Error 1 in Assembler. Instruction unrecognized.");
                    return false;
                } else if (expectedNumComma == actualNumComma) {
                    let type: string | undefined = MapForInsType.getMap().get(operator);
                    if (type == undefined) {
                        this.errMsg = this.errMsg + "Error 332: Instruction unrecognized. -- " + this.basic.get(i) + "\n";
                        return false;
                    } else {
                        switch (type) {
                            case "R":
                                this.decoderForR.setIns(ins);
                                if (this.decoderForR.validate() == true) {
                                    this.decoderForR.decode();
                                    this.bin.add(this.decoderForR.getBinIns());
                                } else {
                                    this.errMsg = this.decoderForR.getErrMsg();
                                    return false;
                                }
                                break;
                            case "I":
                                this.decoderForI.setIns(ins);
                                if (this.decoderForI.validate() == true) {
                                    this.decoderForI.decode();
                                    this.bin.add(this.decoderForI.getBinIns());
                                } else {
                                    this.errMsg = this.decoderForI.getErrMsg();
                                    return false;
                                }
                                break;
                            case "J":
                                this.decoderForJ.setIns(ins);
                                if (this.decoderForJ.validate() == true) {
                                    this.decoderForJ.decode();
                                    this.bin.add(this.decoderForJ.getBinIns());
                                } else {
                                    this.errMsg = this.decoderForJ.getErrMsg();
                                    return false;
                                }
                                break;
                            default:
                                this.errMsg = this.errMsg + "Error 333: Instruction unrecognized. -- " + this.basic.get(i) + "\n";
                                return false;
                        }
                    }
                } else {
                    this.errMsg = this.errMsg + "Error 334: Too few or incorrectly formatted operands. -- " + this.basic.get(i) + "\n";
                    return false;
                }
            } else {
                this.errMsg = this.errMsg + "Error 335: Instruction unrecognized. -- " + this.basic.get(i) + "\n";
                return false;
            }
        }
        return result;
    }
}