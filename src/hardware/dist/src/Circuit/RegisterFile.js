"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterFile = void 0;
const DMux4Way_1 = require("../Conponent/DMux4Way");
const DMux8Way_1 = require("../Conponent/DMux8Way");
const Mux32_1 = require("../Conponent/Mux32");
const Mux4Way32_1 = require("../Conponent/Mux4Way32");
const Mux8Way32_1 = require("../Conponent/Mux8Way32");
const BItsGenerator_1 = require("../Library/BItsGenerator");
const BooleanHandler_1 = require("../Library/BooleanHandler");
const StringHandle_1 = require("../Library/StringHandle");
const Register_1 = require("./Register");
const Signal_1 = require("./Signal");
const Wired_1 = require("./Wired");
class RegisterFile extends Wired_1.Wired {
    constructor() {
        super();
        this.outDataA = "";
        this.outDataB = "";
        this.registers = new Array();
        this.readNumberA = BItsGenerator_1.init_bits(RegisterFile.bitWidth);
        this.readNumberB = BItsGenerator_1.init_bits(RegisterFile.bitWidth);
        this.writeNumber = BItsGenerator_1.init_bits(RegisterFile.bitWidth);
        this.writeDate = BItsGenerator_1.init_bits(Math.pow(2, RegisterFile.bitWidth));
        this.clockSignal = new Signal_1.Signal(false);
        this.writeEnable = new Signal_1.Signal(false);
        this.WriteMux = new Mux32_1.Mux32(BItsGenerator_1.init_bits(32), BItsGenerator_1.init_bits(32), 0);
        for (let i = 0; i < Math.pow(2, RegisterFile.bitWidth); ++i) {
            this.registers[i] = new Register_1._32BitsRegister();
            // this.addWire(this.clockSignal,this.registers[i].getClockSignal());
        }
        this.registers[29].setInpin32(StringHandle_1.decToUnsignedBin32(2147479548));
        this.registers[28].setInpin32(StringHandle_1.decToUnsignedBin32(268468224));
        this.registerRead();
    }
    getOutDataA() {
        return this.outDataA;
    }
    getOutDataB() {
        return this.outDataB;
    }
    setWriteEnable(siganl) {
        this.writeEnable.setSignal(siganl);
        this.registerWrite();
    }
    setWriteData(data) {
        this.writeDate = data;
        this.registerWrite();
    }
    setRegDes(signal) {
        this.WriteMux.setSel(BooleanHandler_1.bool2num(signal));
        this.writeNumber = this.WriteMux.outPin32;
    }
    changeClockSignal() {
        this.clockSignal.changeSiganl();
        this.registers.forEach(register => {
            register.changeClockSignal();
        });
    }
    setClockSignal(signal) {
        this.clockSignal.setSignal(signal);
        this.registers.forEach(register => {
            register.setClockSignal(signal);
        });
    }
    setInstructionCode(InsMem) {
        let InsCode = InsMem.getTextOutpin();
        if (InsCode.length != 32)
            throw Error("The length of Instruction code is not 32");
        StringHandle_1.binaryDetect(InsCode);
        this.readNumberA = StringHandle_1.bitsMapping(InsCode, 21, 26);
        this.readNumberB = StringHandle_1.bitsMapping(InsCode, 16, 21);
        this.setWriteNumber(StringHandle_1.bitsMapping(InsCode, 16, 21), StringHandle_1.bitsMapping(InsCode, 11, 16));
        this.registerRead();
    }
    setWriteNumber(InpinA, InpinB) {
        this.WriteMux.setInpin32A(InpinA);
        this.WriteMux.setInpin32B(InpinB);
        this.writeNumber = this.WriteMux.outPin32;
    }
    registerRead() {
        let data = new Array();
        this.registers.forEach(register => {
            data.push(register.getOutPin32());
        });
        this.outDataA = this.Mux32Way32(this.readNumberA, data);
        this.outDataB = this.Mux32Way32(this.readNumberB, data);
    }
    registerWrite() {
        this.registers.forEach(register => {
            register.resetInput();
        });
        // let clockSignals:number[] = this.DMux32Way(this.writeNumber,this.writeEnable);
        // this.registers.forEach(register=>{
        //     register.setClockSignal(num2bool(clockSignals.shift() as number));
        // });
        if (!this.writeEnable.getSignal())
            return;
        let index = StringHandle_1.bin2dec(this.writeNumber, true);
        this.registers[index].setInpin32(this.writeDate);
    }
    Mux32Way32(index, data) {
        let Muxes = new Array();
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(0, 8), index.slice(2, 5)));
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(8, 16), index.slice(2, 5)));
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(16, 24), index.slice(2, 5)));
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(24, 32), index.slice(2, 5)));
        return StringHandle_1.intArrayToString(Mux4Way32_1.Mux4Way32.Mux4Way32(Muxes, StringHandle_1.stringToIntArray(index.slice(0, 2))));
    }
    DMux32Way(index, signal) {
        let clockSignal = signal.getSignal();
        let innerOut = DMux4Way_1.DMux4Way.DMux4Way(BooleanHandler_1.bool2num(clockSignal), StringHandle_1.stringToIntArray(index.slice(0, 2)));
        let out32 = new Array();
        for (let i = 0; i < 4; ++i) {
            out32.concat(DMux8Way_1.DMux8Way.DMux8Way(innerOut[i], StringHandle_1.stringToIntArray(index.slice(2, 5))));
        }
        return out32;
    }
}
exports.RegisterFile = RegisterFile;
RegisterFile.bitWidth = 5;
//# sourceMappingURL=RegisterFile.js.map