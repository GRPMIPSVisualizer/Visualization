import { bool2num, num2bool } from "../Library/BooleanHandler";
import { intArrayToString, stringToIntArray } from "../Library/StringHandle";
import { DFlipFlop } from "./DFlipFlop";
import { Signal, signalType } from "./Signal";

export class _32BitsRegister{
    private static bitsCount = 32;
    private DFFs:DFlipFlop[];
    private inPin32:string | undefined;
    private outPin32:string = "00000000000000000000000000000000";
    private clockSignal:Signal = new Signal(false);

    constructor(){
        this.DFFs = new Array<DFlipFlop>();
        for (let i:number=0;i<_32BitsRegister.bitsCount;++i){
            this.DFFs[i] = new DFlipFlop();
        }
    }

    public setInpin32(newInPins:string):void{
        this.inputDetect(newInPins);
        this.inPin32 = newInPins;
        this.setDSiganls();
        // this.setOutpin32();
    }

    public resetInput():void{
        this.inPin32 = undefined;
    }

    public changeClockSignal():void{
        this.clockSignal.changeSiganl();
        this.DFFs.forEach(DFF => {
            DFF.changeClockSiganl();
        });
        this.setOutpin32();
    }

    public setClockSignal(signal:signalType):void{
        if (typeof signal == "number")
            signal = num2bool(signal);
        this.clockSignal.setSignal(signal);
        this.DFFs.forEach(DFF => {
            DFF.setClockSiganl(signal);
        });
        this.setOutpin32();
    }

    private inputDetect(input:string){
        if (input.length !=32){
            throw new Error("Invalid Input!");
        }
        let bits:number[]= stringToIntArray(input);
        bits.forEach(bit => {
            if (bit !== 0 && bit !== 1)
                throw new Error("Invalid data "+bit+"!");            
        });
    }

    private setDSiganls():void{
        if (this.inPin32 == undefined)
            return;

        let bits:number[] = stringToIntArray(this.inPin32);
        this.DFFs.forEach(DFF => {
            DFF.setDSiganl(num2bool(<number>bits.shift()));
        });
    }

    protected setOutpin32(){
        let OutPins:number[] = new Array<number>();
        this.DFFs.forEach(flipflop => {
            OutPins.push(bool2num(flipflop.getOutPinA().getSignal()));
        });
        this.outPin32 = intArrayToString(OutPins);
    }

    public getinPin32():string|undefined{
        return this.inPin32;
    }

    public getOutPin32():string{
        return this.outPin32;
    }

    public getClockSignal():Signal{
        return this.clockSignal;
    }
    
}