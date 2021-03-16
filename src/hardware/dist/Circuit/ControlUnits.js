"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALUControl = exports.ControlUnits = void 0;
var BooleanHandler_1 = require("../Library/BooleanHandler");
var StringHandle_1 = require("../Library/StringHandle");
var ControlUnits = /** @class */ (function () {
    function ControlUnits() {
        this.Op0 = false;
        this.Op1 = false;
        this.Op2 = false;
        this.Op3 = false;
        this.Op4 = false;
        this.Op5 = false;
        this.RegDes = false;
        this.Jump = false;
        this.Branch = false;
        this.MemRead = false;
        this.MemtoReg = false;
        this.ALUOp0 = false;
        this.ALUOp1 = false;
        this.MemWrite = false;
        this.ALUSrc = false;
        this.RegWrite = false;
    }
    ControlUnits.prototype.setOp = function (code) {
        if (code.length != 6)
            throw Error("The length of Op fields is not 6");
        StringHandle_1.binaryDetect(code);
        var codeBits = StringHandle_1.stringToIntArray(code);
        this.Op0 = BooleanHandler_1.num2bool(codeBits[5]);
        this.Op1 = BooleanHandler_1.num2bool(codeBits[4]);
        this.Op2 = BooleanHandler_1.num2bool(codeBits[3]);
        this.Op3 = BooleanHandler_1.num2bool(codeBits[2]);
        this.Op4 = BooleanHandler_1.num2bool(codeBits[1]);
        this.Op5 = BooleanHandler_1.num2bool(codeBits[0]);
        this.conLogic();
        this.iType(code);
    };
    ControlUnits.prototype.changeOp = function (conMem) {
        this.setOp(StringHandle_1.bitsMapping(conMem.getTextOutpin(), 26, 32));
    };
    ControlUnits.prototype.iType = function (code) {
        var decCode = StringHandle_1.bin2dec("00000000000000000000000000" + code, true);
        if (decCode == 8 || decCode == 9) {
            this.RegDes = false;
            this.ALUSrc = true;
            this.MemtoReg = false;
            this.RegWrite = true;
            this.MemRead = false;
            this.MemWrite = false;
            this.Branch = false;
            this.ALUOp1 = false;
            this.ALUOp0 = false;
            this.Jump = false;
        }
        //     this.RegDes = 
        //     this.ALUSrc = 
        //     this.MemtoReg = 
        //     this.RegWrite = 
        //     this.MemRead = 
        //     this.MemWrite = 
        //     this.Branch = 
        //     this.ALUOp1 = 
        //     this.ALUOp0 = 
        //     this.Jump = 
    };
    ControlUnits.prototype.conLogic = function () {
        var lw = this.Op0 && this.Op1 && !this.Op2 && !this.Op3 && !this.Op4 && this.Op5;
        var sw = this.Op0 && this.Op1 && !this.Op2 && this.Op3 && !this.Op4 && this.Op5;
        var beq = !this.Op0 && !this.Op1 && this.Op2 && !this.Op3 && !this.Op4 && !this.Op5;
        this.RegDes = !(this.Op0 || this.Op1 || this.Op2 || this.Op3 || this.Op4 || this.Op5);
        this.ALUSrc = lw || sw;
        this.MemtoReg = lw;
        this.RegWrite = this.RegDes || lw;
        this.MemRead = lw;
        this.MemWrite = sw;
        this.Branch = beq;
        this.ALUOp1 = !(this.Op0 || this.Op1 || this.Op2 || this.Op3 || this.Op4 || this.Op5);
        this.ALUOp0 = beq;
        this.Jump = !this.Op0 && this.Op1 && !this.Op2 && !this.Op3 && !this.Op4 && !this.Op5;
    };
    ControlUnits.prototype.getALUOp = function () {
        return [this.ALUOp0, this.ALUOp1];
    };
    return ControlUnits;
}());
exports.ControlUnits = ControlUnits;
var ALUControl = /** @class */ (function () {
    function ALUControl(ALU) {
        this.ALUOp0 = false;
        this.ALUOp1 = false;
        // private controlUnits:ControlUnits;
        this.InsCode = new Array();
        // this.controlUnits = ConUni;
        this.ALU = ALU;
        this._4OperationBits = this.conLogic();
    }
    ALUControl.prototype.setALUOp = function (controlUnits) {
        var _a;
        _a = controlUnits.getALUOp(), this.ALUOp0 = _a[0], this.ALUOp1 = _a[1];
        this.conLogic();
    };
    ALUControl.prototype.setIns = function (code) {
        if (code.length != 6)
            throw Error("The length of Op fields is not 6");
        StringHandle_1.binaryDetect(code);
        var codeBits = StringHandle_1.stringToIntArray(code);
        var newCode = new Array();
        codeBits.forEach(function (bit) {
            newCode.unshift(BooleanHandler_1.num2bool(bit));
        });
        this.InsCode = newCode;
        this.conLogic();
    };
    ALUControl.prototype.conLogic = function () {
        var operation0 = this.ALUOp1 && (this.InsCode[0] || this.InsCode[3]);
        var operation1 = !(this.ALUOp1 && this.InsCode[2]);
        var operation2 = (this.ALUOp1 && this.InsCode[1]) || this.ALUOp0;
        var operation3 = this.ALUOp0 && !this.ALUOp0;
        var operation = [BooleanHandler_1.bool2num(operation3), BooleanHandler_1.bool2num(operation2), BooleanHandler_1.bool2num(operation1), BooleanHandler_1.bool2num(operation0)];
        return this._4OperationBits = StringHandle_1.intArrayToString(operation);
    };
    ALUControl.prototype.getOperationCode = function () {
        return this._4OperationBits;
    };
    return ALUControl;
}());
exports.ALUControl = ALUControl;
//# sourceMappingURL=ControlUnits.js.map