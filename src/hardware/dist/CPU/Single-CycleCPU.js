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
exports.singleCycleCpu = void 0;
var Adder_1 = require("../Circuit/Adder");
var ALU_1 = require("../Circuit/ALU");
var ControlUnits_1 = require("../Circuit/ControlUnits");
var Memory_1 = require("../Circuit/Memory");
var Register_1 = require("../Circuit/Register");
var RegisterFile_1 = require("../Circuit/RegisterFile");
var Sign_extend_1 = require("../Circuit/Sign-extend");
var Signal_1 = require("../Circuit/Signal");
var Mux32_1 = require("../Conponent/Mux32");
var BooleanHandler_1 = require("../Library/BooleanHandler");
var StringHandle_1 = require("../Library/StringHandle");
var AND_1 = require("../Logic/AND");
var PC = /** @class */ (function (_super) {
    __extends(PC, _super);
    function PC(InsMem, PCAdder) {
        var _this = _super.call(this) || this;
        _this.InstructionMem = InsMem;
        _this.setInpin32(InsMem.getTextAddress());
        _this.PCAdder = PCAdder;
        _this.oneClockCycle();
        return _this;
    }
    PC.prototype.oneClockCycle = function () {
        if (this.getClockSignal().getSignal()) {
            throw Error("One clock should start from false");
        }
        this.setClockSignal(true);
        this.setClockSignal(false);
    };
    PC.prototype.muxChange = function (MUX) {
        this.setInpin32(MUX.outPin32);
    };
    PC.prototype.setOutpin32 = function () {
        _super.prototype.setOutpin32.call(this);
        this.InstructionMem.setTextAddress(this.getOutPin32());
        this.PCAdder.newInPin(StringHandle_1.stringToIntArray(this.getOutPin32()), StringHandle_1.stringToIntArray(StringHandle_1.decToUnsignedBin32(4)));
    };
    return PC;
}(Register_1._32BitsRegister));
var PCAdder = /** @class */ (function (_super) {
    __extends(PCAdder, _super);
    function PCAdder(ALUAdder, MUX) {
        var _this = _super.call(this, StringHandle_1.decToUnsignedBin32(0), StringHandle_1.decToUnsignedBin32(4)) || this;
        _this.ALUAdder = ALUAdder;
        _this.MUX = MUX;
        return _this;
    }
    PCAdder.prototype.connectConponents = function (ALUAdder, Mux) {
        this.ALUAdder = ALUAdder;
        this.MUX = Mux;
    };
    PCAdder.prototype.newInPin = function (inSignalA, inSignalB) {
        _super.prototype.newInPin.call(this, inSignalA, inSignalB);
        this.ALUAdder.setInpinA(this.getOutput());
        this.MUX.setInpin32A(this.getOutput());
    };
    return PCAdder;
}(Adder_1.Adder));
// export class ConnectedMemory extends Memory{
//     private bindedControlUnit:ControlUnits;
//     private bindedRegisterFile:RegisterFile;
//     private bindedSignExtend:SignExtend;
//     constructor(bc:ControlUnits,br:RegisterFile,bs:SignExtend){
//         super();
//         this.bindedControlUnit = bc;
//         this.bindedRegisterFile = br;
//         this.bindedSignExtend = bs;
//     }
// }
var ALUAdder = /** @class */ (function (_super) {
    __extends(ALUAdder, _super);
    function ALUAdder(inSignalA, inSignalB, MUX) {
        var _this = _super.call(this, inSignalA, inSignalB) || this;
        _this.MUX1 = MUX;
        return _this;
    }
    ALUAdder.prototype.setOutpin32 = function () {
        this.outPin32 = StringHandle_1.intArrayToString(this.Adder32(StringHandle_1.stringToIntArray(this.inPin32A), StringHandle_1.stringToIntArray(this.inPin32A)));
        this.MUX1.setInpin32B(this.outPin32);
    };
    ALUAdder.prototype.setInpinA = function (binBits) {
        if (binBits.length != 32)
            throw Error("The length of ALU Adder Input A is not 32");
        StringHandle_1.binaryDetect(binBits);
        this.inPin32A = binBits;
        this.setOutpin32();
    };
    ALUAdder.prototype.setInpinB = function (binBits) {
        if (binBits.length != 32)
            throw Error("The length of ALU Adder Input B is not 32");
        StringHandle_1.binaryDetect(binBits);
        this.inPin32B = binBits;
        this.setOutpin32();
    };
    return ALUAdder;
}(Adder_1.Adder));
var ConSignExtend = /** @class */ (function (_super) {
    __extends(ConSignExtend, _super);
    function ConSignExtend(ALUResultAdder, ALUMux) {
        var _this = _super.call(this) || this;
        _this.ALUResultAdder = ALUResultAdder;
        _this.ALUInpinBMux = ALUMux;
        return _this;
    }
    ConSignExtend.prototype.setInPin16 = function (inPin) {
        _super.prototype.setInPin16.call(this, inPin);
        var shiftedInput = StringHandle_1.shiftLeftBinary32Bits(this.getOutPin32());
        this.ALUResultAdder.setInpinB(shiftedInput);
        this.ALUInpinBMux.setInpin32B(this.getOutPin32());
    };
    ConSignExtend.prototype.memSetInpin16 = function (Mem) {
        this.setInPin16(StringHandle_1.bitsMapping(Mem.getTextOutpin(), 0, 16));
    };
    return ConSignExtend;
}(Sign_extend_1.SignExtend));
var conALUControl = /** @class */ (function (_super) {
    __extends(conALUControl, _super);
    function conALUControl(ALU) {
        return _super.call(this, ALU) || this;
    }
    conALUControl.prototype.memSetIns = function (mem) {
        _super.prototype.setIns.call(this, StringHandle_1.bitsMapping(mem.getTextOutpin(), 0, 6));
        this.ALU.setControlBits(this.getOperationCode());
    };
    conALUControl.prototype.setALUOp = function (controlUnits) {
        _super.prototype.setALUOp.call(this, controlUnits);
        this.ALU.setControlBits(this.getOperationCode());
    };
    return conALUControl;
}(ControlUnits_1.ALUControl));
var conRegisterFile = /** @class */ (function (_super) {
    __extends(conRegisterFile, _super);
    function conRegisterFile(ALU, aluInpinBMux, dataMem) {
        var _this = _super.call(this) || this;
        _this.ALU = ALU;
        _this.ALUInpinBMUX = aluInpinBMux;
        _this.DataMemory = dataMem;
        return _this;
    }
    conRegisterFile.prototype.registerRead = function () {
        _super.prototype.registerRead.call(this);
        this.ALU.setInpinA(this.getOutDataA());
        this.ALUInpinBMUX.setInpin32A(this.getOutDataB());
        this.DataMemory.setInpin32(this.getOutDataB());
    };
    conRegisterFile.prototype.setMuxWriteData = function (MemMux) {
        this.setWriteData(MemMux.outPin32);
    };
    return conRegisterFile;
}(RegisterFile_1.RegisterFile));
var ZeroAnd = /** @class */ (function (_super) {
    __extends(ZeroAnd, _super);
    function ZeroAnd(MuxA) {
        var _this = _super.call(this, 0, 0) || this;
        _this.MuxA = MuxA;
        return _this;
    }
    ZeroAnd.prototype.setInpinA = function (inpin) {
        this.pin1 = BooleanHandler_1.bool2num(inpin);
        this.setOutpin();
    };
    ZeroAnd.prototype.setInpinB = function (inpin) {
        this.pin2 = BooleanHandler_1.bool2num(inpin);
        this.setOutpin();
    };
    ZeroAnd.prototype.setOutpin = function () {
        this.outpin = AND_1.AND.And(this.pin1, this.pin2);
        this.MuxA.setSel(this.outpin);
    };
    return ZeroAnd;
}(AND_1.AND));
var conALU = /** @class */ (function (_super) {
    __extends(conALU, _super);
    function conALU(dataMem, MemMux, zeroAnd) {
        var _this = _super.call(this, StringHandle_1.decToUnsignedBin32(0), StringHandle_1.decToUnsignedBin32(0), "0000") || this;
        _this.dataMemory = dataMem;
        _this.MemoryMux = MemMux;
        _this.zeroAnd = zeroAnd;
        return _this;
    }
    conALU.prototype.detectZero = function () {
        _super.prototype.detectZero.call(this);
        this.zeroAnd.setInpinB(this.isZero);
    };
    conALU.prototype.setOutPin = function (outPin) {
        _super.prototype.setOutPin.call(this, outPin);
        this.dataMemory.setDataAddress(this.getOutPin32());
        this.MemoryMux.setInpin32A(this.getOutPin32());
    };
    return conALU;
}(ALU_1.ALU));
var ConControlUnits = /** @class */ (function (_super) {
    __extends(ConControlUnits, _super);
    // private bi
    function ConControlUnits(bindedRegFile, conALUctl, muxb, aluMux, zeroAnd, MemMux, dataMem) {
        var _this = _super.call(this) || this;
        _this.bindedRegFile = bindedRegFile;
        _this.bindedALUControl = conALUctl;
        _this.MUXB = muxb;
        _this.ALUMUX = aluMux;
        _this.zeroAnd = zeroAnd;
        _this.MemMUX = MemMux;
        _this.dataMem = dataMem;
        return _this;
    }
    ConControlUnits.prototype.setOp = function (code) {
        _super.prototype.setOp.call(this, code);
        this.bindedRegFile.setRegDes(this.RegDes);
        this.bindedRegFile.setWriteEnable(this.RegWrite);
        this.bindedALUControl.setALUOp(this);
        this.MUXB.setSel(BooleanHandler_1.bool2num(this.Jump));
        this.ALUMUX.setSel(BooleanHandler_1.bool2num(this.ALUSrc));
        this.zeroAnd.setInpinA(this.Branch);
        this.MemMUX.setSel(BooleanHandler_1.bool2num(this.MemtoReg));
        this.dataMem.setReadWriteEnable(this.MemRead, this.MemWrite);
    };
    return ConControlUnits;
}(ControlUnits_1.ControlUnits));
var singleCycleCpu = /** @class */ (function () {
    // private _dataMemData:Map<number,string> = new Map();
    function singleCycleCpu() {
        this.MUXA = new Mux32_1.Mux32(StringHandle_1.decToUnsignedBin32(0), StringHandle_1.decToUnsignedBin32(0), 0);
        this.MUXB = new Mux32_1.Mux32(StringHandle_1.decToUnsignedBin32(0), StringHandle_1.decToUnsignedBin32(0), 0);
        this.ALUMUX = new Mux32_1.Mux32(StringHandle_1.decToUnsignedBin32(0), StringHandle_1.decToUnsignedBin32(0), 0);
        this.MemMUX = new Mux32_1.Mux32(StringHandle_1.decToUnsignedBin32(0), StringHandle_1.decToUnsignedBin32(0), 0);
        this._zeroAnd = new ZeroAnd(this.MUXA);
        this.ALUADD = new ALUAdder(StringHandle_1.decToUnsignedBin32(0), StringHandle_1.decToUnsignedBin32(0), this.MUXA);
        this._PCAdder = new PCAdder(this.ALUADD, this.MUXA);
        this._Memory = new Memory_1.Memory();
        this._PC = new PC(this._Memory, this._PCAdder);
        this._signExtend = new ConSignExtend(this.ALUADD, this.ALUMUX);
        this._alu = new conALU(this._Memory, this.MemMUX, this._zeroAnd);
        this._aluControl = new conALUControl(this._alu);
        this._registerFile = new conRegisterFile(this._alu, this.ALUMUX, this._Memory);
        this._controlUnits = new ConControlUnits(this._registerFile, this._aluControl, this.MUXB, this.ALUMUX, this._zeroAnd, this.MemMUX, this._Memory);
        this.clockSignal = new Signal_1.Signal(false);
        this._insMemData = new Map();
        this.MUXB.addNotifyFunc(this._PC.muxChange.bind(this._PC, this.MUXB));
        this.MUXA.addNotifyFunc(this.MUXB.setMuxInpin32A.bind(this.MUXB, this.MUXA));
        this.ALUMUX.addNotifyFunc(this._alu.setMuxInpinB.bind(this._alu, this.ALUMUX));
        this.MemMUX.addNotifyFunc(this._registerFile.setMuxWriteData.bind(this._registerFile, this.MemMUX));
        this._Memory.addTextNotifyFunc(this._controlUnits.changeOp.bind(this._controlUnits, this._Memory));
        this._Memory.addTextNotifyFunc(this._registerFile.setInstructionCode.bind(this._registerFile, this._Memory));
        this._Memory.addTextNotifyFunc(this.MUXB.memSetInpin32B.bind(this.MUXB, this._Memory, this._PCAdder));
        this._Memory.addTextNotifyFunc(this._signExtend.memSetInpin16.bind(this._signExtend, this._Memory));
        this._Memory.addTextNotifyFunc(this._aluControl.memSetIns.bind(this._aluControl, this._Memory));
        this._Memory.addDataNotifyFunc(this.MemMUX.dataMemSetInpin32B.bind(this.MemMUX, this._Memory));
    }
    singleCycleCpu.prototype.changeClockSignal = function () {
        this.clockSignal.changeSiganl();
        this._Memory.clockSiganlChange();
        this._registerFile.changeClockSignal();
        this._PC.changeClockSignal();
    };
    singleCycleCpu.prototype.setClockSignal = function (signal) {
        if (this.clockSignal.getSignal() == signal)
            return;
        this.setClockSignal(signal);
        this._Memory.setclockSiganl(signal);
        this._registerFile.setClockSignal(signal);
        this._PC.setClockSignal(signal);
    };
    singleCycleCpu.prototype.debugPC = function () {
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        // 3
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        // 4
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        // 5
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        // 6
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        this.changeClockSignal();
        console.log("PC: The inPin is: ", this._PC.getinPin32(), ".The OutPin is", this._PC.getOutPin32());
        console.log("The address of Memory is ", this._Memory.getTextAddress());
        console.log("The code is ", this._Memory.getTextOutpin());
        console.log(this.debugReg());
        for (var _i = 0, _a = this._Memory.getAddedData(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            console.log(key, value);
        }
    };
    singleCycleCpu.prototype.debugReg = function () {
        var regs = this._registerFile.getRegisters();
        var Regs = [];
        regs.forEach(function (reg) {
            Regs.push(reg.getOutPin32());
        });
        return Regs;
    };
    singleCycleCpu.prototype.storeIns = function (Ins) {
        var _this = this;
        var pcPtr = StringHandle_1.bin2dec("00000000010000000000000000000000", true);
        Ins.forEach(function (In) {
            if (In.length != 32)
                throw new Error("Adding Instruction Length must be 32!");
            StringHandle_1.binaryDetect(In);
            _this._Memory.addInsAt(In, pcPtr);
            _this._insMemData.set(pcPtr, In);
            pcPtr = pcPtr + 4;
        });
    };
    singleCycleCpu.prototype.resetAll = function () {
    };
    return singleCycleCpu;
}());
exports.singleCycleCpu = singleCycleCpu;
//# sourceMappingURL=Single-CycleCPU.js.map