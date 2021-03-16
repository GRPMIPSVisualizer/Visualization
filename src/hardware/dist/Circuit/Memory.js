"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
var BItsGenerator_1 = require("../Library/BItsGenerator");
var StringHandle_1 = require("../Library/StringHandle");
var Signal_1 = require("./Signal");
var Memory = /** @class */ (function () {
    function Memory(MemorySize) {
        if (MemorySize === void 0) { MemorySize = Math.pow(2, 30); }
        this.notifyFuncText = new Array();
        this.notifyFuncData = new Array();
        this.readSignal = new Signal_1.Signal(false);
        this.writeSignal = new Signal_1.Signal(false);
        this.clockSignal = new Signal_1.Signal(false);
        this.addedData = new Map();
        this.MemorySize = MemorySize;
        this.MemoryArray = new Array(MemorySize);
        this.addressPin = "00000000000000000000000000000000";
        this.inPin32 = "00000000000000000000000000000000";
        this.outPin32 = undefined;
        // default = 0x00400000;
        this.textReadAddress = "00000000010000000000000000000000";
        this.textOutpin = this.readDataAt(this.textReadAddress);
    }
    Memory.prototype.getMemorySize = function () {
        return this.MemorySize;
    };
    Memory.prototype.addInsAt = function (data, addr) {
        if ((addr % 4) != 0)
            throw Error("The Instruction Address must be multiple of 4!");
        if (addr >= Math.pow(16, 7) || addr < 4 * Math.pow(16, 5))
            throw Error("Instruction Index Cross 0x1000,0000 or below 0x 0040,0000");
        var retIns = this.MemoryArray[addr / 4];
        this.MemoryArray[addr / 4] = data;
        return retIns;
    };
    Memory.prototype.setDataAddress = function (newAddr) {
        this.addressPin = newAddr;
        this.judgeReadCondition();
    };
    Memory.prototype.getTextAddress = function () {
        return this.textReadAddress;
    };
    Memory.prototype.setTextAddress = function (newAddr) {
        this.dataFormatDetect(newAddr);
        this.textReadAddress = newAddr;
        this.textOutpin = this.readDataAt(this.textReadAddress);
        this.notifychange();
    };
    Memory.prototype.setInpin32 = function (newInpin) {
        if (this.inPin32 == newInpin)
            return;
        this.dataFormatDetect(newInpin);
        this.inPin32 = newInpin;
    };
    Memory.prototype.getTextOutpin = function () {
        if (this.textOutpin == undefined)
            return BItsGenerator_1.init_bits(32);
        return this.textOutpin;
    };
    Memory.prototype.dataFormatDetect = function (binData) {
        if (binData.length != 32)
            throw Error("The length of data in memory is not 32 bits");
        StringHandle_1.binaryDetect(binData);
    };
    Memory.prototype.readDataAt = function (binIndex) {
        return this.MemoryArray[Math.floor(StringHandle_1.bin2dec(this.textReadAddress, true) / 4)];
    };
    Memory.prototype.readData = function () {
        var address = StringHandle_1.bin2dec(this.addressPin, true);
        var data1 = this.MemoryArray[Math.floor(address / 4)];
        var data2 = this.MemoryArray[Math.floor(address / 4) + 1];
        this.setOutPin32(data1.slice(8 * (address % 4)) + data2.slice(0, (address % 4)));
    };
    Memory.prototype.writeData = function () {
        var address = StringHandle_1.bin2dec(this.addressPin, true);
        var data1 = this.MemoryArray[Math.floor(address / 4)];
        var data2 = this.MemoryArray[Math.floor(address / 4) + 1];
        if (data1 == undefined) {
            data1 = BItsGenerator_1.init_bits(32);
        }
        if (data2 == undefined) {
            data2 = BItsGenerator_1.init_bits(32);
        }
        data1 = data1.slice(0, 8 * (address % 4)) + this.inPin32.slice(0, 8 * (4 - (address % 4)));
        data2 = this.inPin32.slice(8 * (4 - (address % 4))) + data2.slice(8 * (address % 4));
        this.MemoryArray[Math.floor(address / 4)] = data1;
        this.MemoryArray[Math.floor(address / 4) + 1] = data2;
        this.addedData.set(this.addressPin, this.inPin32);
    };
    Memory.prototype.clockSiganlChange = function () {
        this.clockSignal.changeSiganl();
        this.dataReact();
    };
    Memory.prototype.setclockSiganl = function (signal) {
        if (this.isSignalSame(signal))
            return;
        this.clockSignal.setSignal(signal);
        this.dataReact();
    };
    Memory.prototype.isSignalSame = function (signal) {
        if (this.clockSignal.getSignal() == signal)
            return true;
        return false;
    };
    Memory.prototype.dataReact = function () {
        if (this.writeSignal.getSignal() && this.readSignal.getSignal()) {
            throw Error("Memory can't be read and write at the same time!");
        }
        if (this.writeSignal.getSignal()) {
            if (this.clockSignal.getSignal() == true)
                return;
            this.writeData();
        }
        this.judgeReadCondition();
    };
    Memory.prototype.notifychange = function () {
        this.notifyFuncText.forEach(function (FuncText) {
            FuncText();
        });
    };
    Memory.prototype.addTextNotifyFunc = function (newFunc) {
        this.notifyFuncText.push(newFunc);
    };
    Memory.prototype.dataChange = function () {
        this.notifyFuncData.forEach(function (FuncData) {
            FuncData();
        });
    };
    Memory.prototype.addDataNotifyFunc = function (newFunc) {
        this.notifyFuncData.push(newFunc);
    };
    Memory.prototype.setOutPin32 = function (newOutPin32) {
        this.outPin32 = newOutPin32;
        if (newOutPin32 == undefined)
            return;
        this.dataChange();
    };
    Memory.prototype.getOutPin32 = function () {
        return this.outPin32;
    };
    Memory.prototype.setReadWriteEnable = function (ReadEn, WriteEn) {
        this.readSignal.setSignal(ReadEn);
        this.judgeReadCondition();
        this.writeSignal.setSignal(WriteEn);
        this.dataChange();
    };
    Memory.prototype.judgeReadCondition = function () {
        if (this.readSignal.getSignal()) {
            this.readData();
        }
        else {
            this.setOutPin32(undefined);
        }
    };
    Memory.prototype.getAddedData = function () {
        return this.addedData;
    };
    return Memory;
}());
exports.Memory = Memory;
//# sourceMappingURL=Memory.js.map