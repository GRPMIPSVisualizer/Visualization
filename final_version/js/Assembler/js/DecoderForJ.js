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
