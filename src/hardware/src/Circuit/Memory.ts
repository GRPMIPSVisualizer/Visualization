import { init_bits } from "../Library/BItsGenerator";
import { bin2dec, binaryDetect, lengthDetect, stringToIntArray } from "../Library/StringHandle";
import { Signal, signalType } from "./Signal";

export class Memory{
    private notifyFuncText:Function[] = new Array<Function>();
    private notifyFuncData:Function[] = new Array<Function>();
    private MemoryArray:string[];
    private MemorySize:number;
    private addressPin:string;
    private inPin32:string;
    private outPin32:string|undefined;

    private readSignal:Signal = new Signal(false);
    private writeSignal:Signal = new Signal(false);
    private clockSignal:Signal = new Signal(false);

    private textReadAddress:string;
    private textOutpin:string;
    private addedData:Map<string,string> = new Map();


    constructor(MemorySize:number = Math.pow(2,30)){
        this.MemorySize = MemorySize;
        this.MemoryArray = new Array<string>(MemorySize);
        this.addressPin = "00000000000000000000000000000000";
        this.inPin32 = "00000000000000000000000000000000";
        this.outPin32 = undefined;
        // default = 0x00400000;
        this.textReadAddress = "00000000010000000000000000000000";
        this.textOutpin = this.readDataAt(this.textReadAddress);
    }

    public getMemorySize():number{
        return this.MemorySize;
    }

    public addInsAt(data:string,addr:number):string{
        if ((addr % 4) != 0)
            throw Error("The Instruction Address must be multiple of 4!");

        if (addr >= Math.pow(16,7) || addr < 4*Math.pow(16,5))
            throw Error("Instruction Index Cross 0x1000,0000 or below 0x 0040,0000");
        let retIns:string = this.MemoryArray[addr/4];
        this.MemoryArray[addr/4] = data;
        return retIns;
    }

    public setDataAddress(newAddr:string):void{
        this.addressPin = newAddr;
        this.judgeReadCondition();
    }

    public getTextAddress():string{
        return this.textReadAddress;
    }

    public setTextAddress(newAddr:string):void{
        this.dataFormatDetect(newAddr);
        this.textReadAddress = newAddr;
        this.textOutpin = this.readDataAt(this.textReadAddress);
        this.notifychange();
    }

    public setInpin32(newInpin:string):void{
        if (this.inPin32 == newInpin)
            return;
        this.dataFormatDetect(newInpin);
        this.inPin32 = newInpin;
    }

    public getTextOutpin():string{
        if (this.textOutpin == undefined)
            return init_bits(32);
        return this.textOutpin;
    }

    private dataFormatDetect(binData:string):void{
        if (binData.length != 32)
            throw Error("The length of data in memory is not 32 bits");
        binaryDetect(binData);
    }

    private readDataAt(binIndex:string):string{
        return this.MemoryArray[Math.floor(bin2dec(this.textReadAddress,true)/4)];
    }

    private readData():void{
        let address:number = bin2dec(this.addressPin,true);
        let data1:string = this.MemoryArray[Math.floor(address / 4)];
        let data2:string = this.MemoryArray[Math.floor(address / 4)+1];
        
        this.setOutPin32(data1.slice(8*(address % 4)) + data2.slice(0,(address % 4)));
    }

    private writeData():void{
        let address:number = bin2dec(this.addressPin,true);
        let data1:string = this.MemoryArray[Math.floor(address / 4)];
        let data2:string = this.MemoryArray[Math.floor(address / 4)+1];

        if(data1 == undefined){
            data1 = init_bits(32);
        }

        if(data2 == undefined){
            data2 = init_bits(32);
        }
        
        data1 = data1.slice(0,8*(address % 4)) + this.inPin32.slice(0,8*(4 - (address % 4)));
        data2 = this.inPin32.slice(8*(4 - (address % 4))) + data2.slice(8*(address % 4));
        this.MemoryArray[Math.floor(address / 4)] = data1;
        this.MemoryArray[Math.floor(address / 4)+1] = data2;
        this.addedData.set(this.addressPin,this.inPin32);
    }

    public clockSiganlChange():void{
        this.clockSignal.changeSiganl();
        this.dataReact();
    }

    public setclockSiganl(signal:signalType):void{
        if (this.isSignalSame(signal))
            return;
        this.clockSignal.setSignal(signal);
        this.dataReact();
    }

    private isSignalSame(signal:signalType):boolean{
        if (this.clockSignal.getSignal() == signal)
            return true;
        return false;
    }

    private dataReact():void{
        if (this.writeSignal.getSignal() && this.readSignal.getSignal()){
            throw Error("Memory can't be read and write at the same time!");
        }

        if (this.writeSignal.getSignal()){
            if (this.clockSignal.getSignal() == true)
                return;
            this.writeData();
        }

        this.judgeReadCondition();
    }

    private notifychange():void{
        this.notifyFuncText.forEach(FuncText=>{
                FuncText();
            }
        )
    }

    public addTextNotifyFunc(newFunc:Function):void{
        this.notifyFuncText.push(newFunc);
    }

    

    private dataChange():void{
        this.notifyFuncData.forEach(FuncData=>{
            FuncData();
        })
    }

    public addDataNotifyFunc(newFunc:Function):void{
        this.notifyFuncData.push(newFunc);
    }
    
    private setOutPin32(newOutPin32:string|undefined):void{
        this.outPin32 = newOutPin32;
        if (newOutPin32 == undefined)
            return;
        this.dataChange();
    }

    public getOutPin32():string|undefined{
        return this.outPin32;
    }

    public setReadWriteEnable(ReadEn:boolean,WriteEn:boolean){
        this.readSignal.setSignal(ReadEn);
        this.judgeReadCondition();
        this.writeSignal.setSignal(WriteEn);
        this.dataChange();
    }

    private judgeReadCondition():void{
        if (this.readSignal.getSignal()){
            this.readData();
        }else{
            this.setOutPin32(undefined);
        }
    }

    public getAddedData():Map<string,string>{
        return this.addedData;
    }
}