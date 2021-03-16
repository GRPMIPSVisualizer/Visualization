"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterFile = void 0;
var DMux4Way_1 = require("../Conponent/DMux4Way");
var DMux8Way_1 = require("../Conponent/DMux8Way");
var Mux32_1 = require("../Conponent/Mux32");
var Mux4Way32_1 = require("../Conponent/Mux4Way32");
var Mux8Way32_1 = require("../Conponent/Mux8Way32");
var BItsGenerator_1 = require("../Library/BItsGenerator");
var BooleanHandler_1 = require("../Library/BooleanHandler");
var StringHandle_1 = require("../Library/StringHandle");
var Register_1 = require("./Register");
var Signal_1 = require("./Signal");
var Wired_1 = require("./Wired");
var RegisterFile = /** @class */ (function (_super) {
    __extends(RegisterFile, _super);
    function RegisterFile() {
        var _this = _super.call(this) || this;
        _this.outDataA = "";
        _this.outDataB = "";
        _this.registers = new Array();
        _this.readNumberA = BItsGenerator_1.init_bits(RegisterFile.bitWidth);
        _this.readNumberB = BItsGenerator_1.init_bits(RegisterFile.bitWidth);
        _this.writeNumber = BItsGenerator_1.init_bits(RegisterFile.bitWidth);
        _this.writeData = BItsGenerator_1.init_bits(Math.pow(2, RegisterFile.bitWidth));
        _this.clockSignal = new Signal_1.Signal(false);
        _this.writeEnable = new Signal_1.Signal(false);
        _this.WriteMux = new Mux32_1.Mux32(BItsGenerator_1.init_bits(32), BItsGenerator_1.init_bits(32), 0);
        for (var i = 0; i < Math.pow(2, RegisterFile.bitWidth); ++i) {
            _this.registers[i] = new Register_1._32BitsRegister();
            // this.addWire(this.clockSignal,this.registers[i].getClockSignal());
        }
        _this.registers[29].setInpin32(StringHandle_1.decToUnsignedBin32(2147479548));
        _this.registers[28].setInpin32(StringHandle_1.decToUnsignedBin32(268468224));
        var data = new Array();
        _this.registers.forEach(function (register) {
            data.push(register.getOutPin32());
        });
        _this.outDataA = _this.Mux32Way32(_this.readNumberA, data);
        _this.outDataB = _this.Mux32Way32(_this.readNumberB, data);
        return _this;
    }
    RegisterFile.prototype.getOutDataA = function () {
        return this.outDataA;
    };
    RegisterFile.prototype.getOutDataB = function () {
        return this.outDataB;
    };
    RegisterFile.prototype.setWriteEnable = function (siganl) {
        this.writeEnable.setSignal(siganl);
        this.registerWrite();
    };
    RegisterFile.prototype.setWriteData = function (data) {
        this.writeData = data;
        this.registerWrite();
    };
    RegisterFile.prototype.setRegDes = function (signal) {
        this.WriteMux.setSel(BooleanHandler_1.bool2num(signal));
        this.writeNumber = this.WriteMux.outPin32.slice(27, 32);
    };
    RegisterFile.prototype.changeClockSignal = function () {
        this.clockSignal.changeSiganl();
        this.registers.forEach(function (register) {
            register.changeClockSignal();
        });
    };
    RegisterFile.prototype.setClockSignal = function (signal) {
        this.clockSignal.setSignal(signal);
        this.registers.forEach(function (register) {
            register.setClockSignal(signal);
        });
    };
    RegisterFile.prototype.setInstructionCode = function (InsMem) {
        var InsCode = InsMem.getTextOutpin();
        if (InsCode.length != 32)
            throw Error("The length of Instruction code is not 32");
        StringHandle_1.binaryDetect(InsCode);
        this.readNumberA = StringHandle_1.bitsMapping(InsCode, 21, 26);
        this.readNumberB = StringHandle_1.bitsMapping(InsCode, 16, 21);
        this.setWriteNumber(StringHandle_1.bitsMapping(InsCode, 16, 21), StringHandle_1.bitsMapping(InsCode, 11, 16));
        this.registerRead();
    };
    RegisterFile.prototype.setWriteNumber = function (InpinA, InpinB) {
        this.WriteMux.setInpin32A("000000000000000000000000000" + InpinA);
        this.WriteMux.setInpin32B("000000000000000000000000000" + InpinB);
        this.writeNumber = this.WriteMux.outPin32.slice(27, 32);
    };
    RegisterFile.prototype.registerRead = function () {
        var data = new Array();
        this.registers.forEach(function (register) {
            data.push(register.getOutPin32());
        });
        this.outDataA = this.Mux32Way32(this.readNumberA, data);
        this.outDataB = this.Mux32Way32(this.readNumberB, data);
    };
    RegisterFile.prototype.registerWrite = function () {
        this.registers.forEach(function (register) {
            register.resetInput();
        });
        // let clockSignals:number[] = this.DMux32Way(this.writeNumber,this.writeEnable);
        // this.registers.forEach(register=>{
        //     register.setClockSignal(num2bool(clockSignals.shift() as number));
        // });
        if (!this.writeEnable.getSignal())
            return;
        var index = StringHandle_1.bin2dec("000000000000000000000000000" + this.writeNumber, true);
        this.registers[index].setInpin32(this.writeData);
    };
    RegisterFile.prototype.Mux32Way32 = function (index, data) {
        var Muxes = new Array();
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(0, 8), index.slice(2, 5)));
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(8, 16), index.slice(2, 5)));
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(16, 24), index.slice(2, 5)));
        Muxes.push(Mux8Way32_1.Mux8Way32.Mux8Way32(data.slice(24, 32), index.slice(2, 5)));
        return StringHandle_1.intArrayToString(Mux4Way32_1.Mux4Way32.Mux4Way32(Muxes, StringHandle_1.stringToIntArray(index.slice(0, 2))));
    };
    RegisterFile.prototype.DMux32Way = function (index, signal) {
        var clockSignal = signal.getSignal();
        var innerOut = DMux4Way_1.DMux4Way.DMux4Way(BooleanHandler_1.bool2num(clockSignal), StringHandle_1.stringToIntArray(index.slice(0, 2)));
        var out32 = new Array();
        for (var i = 0; i < 4; ++i) {
            out32.concat(DMux8Way_1.DMux8Way.DMux8Way(innerOut[i], StringHandle_1.stringToIntArray(index.slice(2, 5))));
        }
        return out32;
    };
    RegisterFile.prototype.getRegisters = function () {
        return this.registers;
    };
    RegisterFile.bitWidth = 5;
    return RegisterFile;
}(Wired_1.Wired));
exports.RegisterFile = RegisterFile;
//# sourceMappingURL=RegisterFile.js.map