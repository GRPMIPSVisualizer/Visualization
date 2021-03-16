import { CodeActionCommand } from "typescript";
import { bool2num, num2bool } from "../Library/BooleanHandler";
import { bin2dec, binaryDetect, bitsMapping, intArrayToString, stringToIntArray } from "../Library/StringHandle";
import { ALU } from "./ALU";
import { Memory } from "./Memory";

export class ControlUnits{
    private Op0:boolean = false;
    private Op1:boolean = false;
    private Op2:boolean = false;
    private Op3:boolean = false;
    private Op4:boolean = false;
    private Op5:boolean = false;

    protected RegDes:boolean = false;
    protected Jump:boolean = false;
    protected Branch:boolean = false;
    protected MemRead:boolean = false;
    protected MemtoReg:boolean = false;
    protected ALUOp0:boolean = false;
    protected ALUOp1:boolean = false;
    protected MemWrite:boolean = false;
    protected ALUSrc:boolean = false;
    protected RegWrite:boolean = false;

    constructor(){
        
    }

    protected setOp(code:string):void{
        if (code.length != 6)
            throw Error("The length of Op fields is not 6");
        binaryDetect(code);
        let codeBits:number[] = stringToIntArray(code);
        this.Op0 = num2bool(codeBits[5]);
        this.Op1 = num2bool(codeBits[4]);
        this.Op2 = num2bool(codeBits[3]);
        this.Op3 = num2bool(codeBits[2]);
        this.Op4 = num2bool(codeBits[1]);
        this.Op5 = num2bool(codeBits[0]);
        this.conLogic();
        this.iType(code);
    }

    public changeOp(conMem:Memory):void{
        this.setOp(bitsMapping(conMem.getTextOutpin(),26,32));
    }

    private iType(code:string):void{
        let decCode:number = bin2dec("00000000000000000000000000"+code,true);
        if (decCode == 8 || decCode == 9){
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
    }

    private conLogic():void{
        let lw:boolean = this.Op0 && this.Op1 && !this.Op2 && !this.Op3 && !this.Op4 && this.Op5;
        let sw:boolean = this.Op0 && this.Op1 && !this.Op2 && this.Op3 && !this.Op4 && this.Op5;
        let beq:boolean = !this.Op0 && !this.Op1 && this.Op2 && !this.Op3 && !this.Op4 && !this.Op5;

        this.RegDes = !(this.Op0 || this.Op1 || this.Op2 || this.Op3 || this.Op4 || this.Op5 );
        this.ALUSrc = lw || sw;
        this.MemtoReg = lw;
        this.RegWrite = this.RegDes || lw;
        this.MemRead = lw;
        this.MemWrite = sw;
        this.Branch = beq;
        this.ALUOp1 = !(this.Op0 || this.Op1 || this.Op2 || this.Op3 || this.Op4 || this.Op5 );
        this.ALUOp0 = beq;
        this.Jump = !this.Op0 && this.Op1 && !this.Op2 && !this.Op3 && !this.Op4 && !this.Op5;

    }

    public getALUOp():boolean[]{
        return [this.ALUOp0,this.ALUOp1];
    }
}

export class ALUControl{
    private ALUOp0:boolean = false;
    private ALUOp1:boolean = false;
    // private controlUnits:ControlUnits;
    private InsCode:boolean[] = new Array<boolean>();
    private _4OperationBits:string;
    protected ALU:ALU;
    constructor(ALU:ALU){
        // this.controlUnits = ConUni;
        this.ALU = ALU;
        this._4OperationBits = this.conLogic();
    }

    public setALUOp(controlUnits:ControlUnits):void{
        [this.ALUOp0,this.ALUOp1] = controlUnits.getALUOp();
        this.conLogic();
    }

    public setIns(code:string):void{
        if (code.length != 6)
            throw Error("The length of Op fields is not 6");
        binaryDetect(code);
        let codeBits:number[] = stringToIntArray(code);
        let newCode:boolean[] = new Array<boolean>();
        codeBits.forEach(bit=>{
            newCode.unshift(num2bool(bit));
        });
        this.InsCode = newCode;
        this.conLogic();
    }

    private conLogic():string{
        let operation0:boolean = this.ALUOp1 && (this.InsCode[0] || this.InsCode[3]);
        let operation1:boolean = !( this.ALUOp1 && this.InsCode[2]);
        let operation2:boolean = (this.ALUOp1 && this.InsCode[1]) || this.ALUOp0;
        let operation3:boolean = this.ALUOp0 && !this.ALUOp0;
        let operation:number[] = [bool2num(operation3),bool2num(operation2),bool2num(operation1),bool2num(operation0)];
        return this._4OperationBits = intArrayToString(operation);
    }

    public getOperationCode():string{
        return this._4OperationBits;
    }
}