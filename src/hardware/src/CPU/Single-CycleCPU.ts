import { ObjectLiteralElementLike } from "typescript";
import { Adder } from "../Circuit/Adder";
import { ALU } from "../Circuit/ALU";
import { ALUControl, ControlUnits } from "../Circuit/ControlUnits";
import { Memory } from "../Circuit/Memory";
import { _32BitsRegister } from "../Circuit/Register";
import { RegisterFile } from "../Circuit/RegisterFile";
import { SignExtend } from "../Circuit/Sign-extend";
import { Signal, signalType } from "../Circuit/Signal";
import { Wired } from "../Circuit/Wired";
import { Mux } from "../Conponent/Mux";
import { Mux32 } from "../Conponent/Mux32";
import { bool2num } from "../Library/BooleanHandler";
import { binaryDetect, decToUnsignedBin32, shiftLeftBinary32Bits, stringToIntArray,intArrayToString, bitsMapping, bin2dec } from "../Library/StringHandle";
import { AND } from "../Logic/AND";

class PC extends _32BitsRegister{
    private InstructionMem:Memory;
    private PCAdder:PCAdder;
    constructor(InsMem:Memory,PCAdder:PCAdder){
        super();
        this.InstructionMem = InsMem;
        this.setInpin32(InsMem.getTextAddress());
        this.PCAdder = PCAdder;
        this.oneClockCycle();
    }

    public oneClockCycle():void{
        if (this.getClockSignal().getSignal()){
            throw Error("One clock should start from false");
        }
        this.setClockSignal(true);
        this.setClockSignal(false);
    }

    public muxChange(MUX:Mux32):void{  
        this.setInpin32(MUX.outPin32);
    }

    protected setOutpin32():void{
        super.setOutpin32();
        this.InstructionMem.setTextAddress(this.getOutPin32());
        this.PCAdder.newInPin(stringToIntArray(this.getOutPin32()) ,stringToIntArray(decToUnsignedBin32(4)));
    }

}


class PCAdder extends Adder{
    private ALUAdder:ALUAdder;
    private MUX:Mux32;
    constructor(ALUAdder:ALUAdder,MUX:Mux32){
        super(decToUnsignedBin32(0),decToUnsignedBin32(4));
        this.ALUAdder = ALUAdder;
        this.MUX = MUX;
    }

    public connectConponents(ALUAdder:ALUAdder,Mux:Mux32){
        this.ALUAdder = ALUAdder;
        this.MUX = Mux;
    }

    public newInPin(inSignalA:number[],inSignalB:number[]):void{
        super.newInPin(inSignalA,inSignalB);
        this.ALUAdder.setInpinA(this.getOutput());
        this.MUX.setInpin32A(this.getOutput());
    }
}

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

class ALUAdder extends Adder{
    private MUX1:Mux32;
    
    constructor(inSignalA:string,inSignalB:string,MUX:Mux32){
        super(inSignalA,inSignalB);
        this.MUX1 = MUX;
    }

    private setOutpin32():void{
        this.outPin32 = intArrayToString(this.Adder32(stringToIntArray(this.inPin32A),stringToIntArray(this.inPin32A)));
        this.MUX1.setInpin32B(this.outPin32);
    }

    public setInpinA(binBits:string):void{
        if (binBits.length != 32)
            throw Error("The length of ALU Adder Input A is not 32");
        binaryDetect(binBits);
        this.inPin32A = binBits;
        this.setOutpin32();
    }

    public setInpinB(binBits:string):void{
        if (binBits.length != 32)
            throw Error("The length of ALU Adder Input B is not 32");
        binaryDetect(binBits);
        this.inPin32B = binBits;
        this.setOutpin32();
    }
}



class ConSignExtend extends SignExtend{
    private ALUResultAdder:ALUAdder;
    private ALUInpinBMux:Mux32;
    constructor(ALUResultAdder:ALUAdder,ALUMux:Mux32){
        super();
        this.ALUResultAdder = ALUResultAdder;
        this.ALUInpinBMux = ALUMux;
    }

    public setInPin16(inPin:string):void{
        super.setInPin16(inPin);
        let shiftedInput:string = shiftLeftBinary32Bits(this.getOutPin32());
        this.ALUResultAdder.setInpinB(shiftedInput);
        this.ALUInpinBMux.setInpin32B(this.getOutPin32());
    }

    public memSetInpin16(Mem:Memory):void{
        this.setInPin16(bitsMapping(Mem.getTextOutpin(),0,16));
    }
}

class conALUControl extends ALUControl{
    constructor(ALU:ALU) {
        super(ALU);
    }

    public memSetIns(mem:Memory):void{
        super.setIns(bitsMapping(mem.getTextOutpin(),0,6));
        this.ALU.setControlBits(this.getOperationCode());
    }

    public setALUOp(controlUnits:ControlUnits):void{
        super.setALUOp(controlUnits);
        this.ALU.setControlBits(this.getOperationCode());
    }
}


class conRegisterFile extends RegisterFile{
    private ALU:conALU;
    private ALUInpinBMUX:Mux32;
    private DataMemory:Memory;
    constructor(ALU:conALU,aluInpinBMux:Mux32,dataMem:Memory){
        super();
        this.ALU = ALU;
        this.ALUInpinBMUX = aluInpinBMux;
        this.DataMemory = dataMem;
    }

    protected registerRead():void{
        super.registerRead();
        this.ALU.setInpinA(this.getOutDataA());
        this.ALUInpinBMUX.setInpin32A(this.getOutDataB());
        this.DataMemory.setInpin32(this.getOutDataB());
    }

    public setMuxWriteData(MemMux:Mux32):void{
        this.setWriteData(MemMux.outPin32);
    }
}

class ZeroAnd extends AND{
    private MuxA:Mux32;
    constructor(MuxA:Mux32){
        super(0,0);
        this.MuxA = MuxA;
    }

    public setInpinA(inpin:boolean):void{
        this.pin1 = bool2num(inpin);
        this.setOutpin();
    }

    public setInpinB(inpin:boolean):void{
        this.pin2 = bool2num(inpin);
        this.setOutpin();
    }

    private setOutpin():void{
        this.outpin = AND.And(this.pin1,this.pin2);
        this.MuxA.setSel(this.outpin);
    }
}

class conALU extends ALU{
    private dataMemory:Memory;
    private MemoryMux:Mux32;
    private zeroAnd:ZeroAnd;

    constructor(dataMem:Memory,MemMux:Mux32,zeroAnd:ZeroAnd){
        super(decToUnsignedBin32(0),decToUnsignedBin32(0),"0000");
        this.dataMemory = dataMem;
        this.MemoryMux = MemMux;
        this.zeroAnd = zeroAnd;
    }

    protected detectZero():void{
        super.detectZero();
        this.zeroAnd.setInpinB(this.isZero);
    }

    protected setOutPin(outPin:string):void{
        super.setOutPin(outPin);
        this.dataMemory.setDataAddress(this.getOutPin32());
        this.MemoryMux.setInpin32A(this.getOutPin32());
    }

}

class ConControlUnits extends ControlUnits{
    private bindedRegFile:RegisterFile;
    private bindedALUControl:conALUControl;
    private MUXB:Mux32;
    private ALUMUX:Mux32;
    private MemMUX:Mux32;
    private zeroAnd:ZeroAnd;
    private dataMem:Memory;
    // private bi
    constructor(bindedRegFile:RegisterFile,conALUctl:conALUControl,muxb:Mux32,aluMux:Mux32,zeroAnd:ZeroAnd,MemMux:Mux32,dataMem:Memory) {
        super();
        this.bindedRegFile = bindedRegFile;
        this.bindedALUControl = conALUctl;
        this.MUXB = muxb;
        this.ALUMUX = aluMux;
        this.zeroAnd = zeroAnd;
        this.MemMUX = MemMux;
        this.dataMem = dataMem;
    }

    protected setOp(code:string):void{
        super.setOp(code);
        this.bindedRegFile.setRegDes(this.RegDes);
        this.bindedRegFile.setWriteEnable(this.RegWrite);
        this.bindedALUControl.setALUOp(this);
        this.MUXB.setSel(bool2num(this.Jump));
        this.ALUMUX.setSel(bool2num(this.ALUSrc));
        this.zeroAnd.setInpinA(this.Branch);
        this.MemMUX.setSel(bool2num(this.MemtoReg));
        this.dataMem.setReadWriteEnable(this.MemRead,this.MemWrite);
    }

}


export class singleCycleCpu{
    private MUXA:Mux32 = new Mux32(decToUnsignedBin32(0),decToUnsignedBin32(0),0);
    private MUXB:Mux32 = new Mux32(decToUnsignedBin32(0),decToUnsignedBin32(0),0);
    private ALUMUX:Mux32 = new Mux32(decToUnsignedBin32(0),decToUnsignedBin32(0),0);
    private MemMUX:Mux32  = new Mux32(decToUnsignedBin32(0),decToUnsignedBin32(0),0); 
    private _zeroAnd:ZeroAnd = new ZeroAnd(this.MUXA);
    private ALUADD:ALUAdder = new ALUAdder(decToUnsignedBin32(0),decToUnsignedBin32(0),this.MUXA);
    private _PCAdder:PCAdder = new PCAdder(this.ALUADD,this.MUXA);
    private _Memory:Memory = new Memory();
    private _PC:PC = new PC(this._Memory,this._PCAdder);
    private _signExtend:ConSignExtend = new ConSignExtend(this.ALUADD,this.ALUMUX);
    private _alu:conALU = new conALU(this._Memory,this.MemMUX,this._zeroAnd);
    private _aluControl:conALUControl = new conALUControl(this._alu);
    private _registerFile:conRegisterFile = new conRegisterFile(this._alu,this.ALUMUX,this._Memory);
    private _controlUnits:ConControlUnits = new ConControlUnits(this._registerFile,this._aluControl,this.MUXB,this.ALUMUX,this._zeroAnd,this.MemMUX,this._Memory);
    private clockSignal:Signal = new Signal(false);
    private _insMemData:Map<number,string> = new Map();
    // private _dataMemData:Map<number,string> = new Map();

    constructor(){
        this.MUXB.addNotifyFunc(this._PC.muxChange.bind(this._PC,this.MUXB));
        this.MUXA.addNotifyFunc(this.MUXB.setMuxInpin32A.bind(this.MUXB,this.MUXA));
        this.ALUMUX.addNotifyFunc(this._alu.setMuxInpinB.bind(this._alu,this.ALUMUX));
        this.MemMUX.addNotifyFunc(this._registerFile.setMuxWriteData.bind(this._registerFile,this.MemMUX));


        this._Memory.addTextNotifyFunc(this._controlUnits.changeOp.bind(this._controlUnits,this._Memory));
        this._Memory.addTextNotifyFunc(this._registerFile.setInstructionCode.bind(this._registerFile,this._Memory));
        this._Memory.addTextNotifyFunc(this.MUXB.memSetInpin32B.bind(this.MUXB,this._Memory,this._PCAdder));
        this._Memory.addTextNotifyFunc(this._signExtend.memSetInpin16.bind(this._signExtend,this._Memory));
        this._Memory.addTextNotifyFunc(this._aluControl.memSetIns.bind(this._aluControl,this._Memory));

        this._Memory.addDataNotifyFunc(this.MemMUX.dataMemSetInpin32B.bind(this.MemMUX,this._Memory));



        
    }

    public changeClockSignal():void{
        this.clockSignal.changeSiganl();
        this._Memory.clockSiganlChange();
        this._registerFile.changeClockSignal();
        this._PC.changeClockSignal();
    }

    public setClockSignal(signal:signalType):void{
        if (this.clockSignal.getSignal() == signal)
            return;
        this.setClockSignal(signal);
        this._Memory.setclockSiganl(signal);
        this._registerFile.setClockSignal(signal);
        this._PC.setClockSignal(signal);
    }


    public debugPC():void{
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());
        
        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        // 3
        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        // 4
        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());
        // 5
        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        // 6
        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugReg());

        this.changeClockSignal();
        console.log("PC: The inPin is: ",this._PC.getinPin32(),".The OutPin is",this._PC.getOutPin32());
        console.log("The address of Memory is ",this._Memory.getTextAddress());
        console.log("The code is ",this._Memory.getTextOutpin());
        console.log(this.debugRReg());
        
        for (let [key, value] of this._Memory.getAddedData()) {
            console.log(key, value);            
        }
    }

    public debugReg():string[]{
        let regs:_32BitsRegister[] = this._registerFile.getRegisters();
        let Regs:string[] = [];
        regs.forEach(
            reg=>{
                Regs.push(reg.getOutPin32());
            }
        )
        return Regs;
    }

    public storeIns(Ins:string[]):void{
        let pcPtr:number = bin2dec("00000000010000000000000000000000",true);
        Ins.forEach(In=>{
            if (In.length !=32)
                throw new Error("Adding Instruction Length must be 32!");
            binaryDetect(In);
            this._Memory.addInsAt(In,pcPtr);
            this._insMemData.set(pcPtr,In);
            pcPtr = pcPtr + 4;
        }
        );
    }

    public resetAll():void{

    }

}