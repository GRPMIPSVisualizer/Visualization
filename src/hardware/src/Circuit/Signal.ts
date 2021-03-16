import { bool2num, num2bool } from "../Library/BooleanHandler";

export type signalType = number|boolean;
export class Signal{
    private signal:signalType;
    private reactFunc:Function;
    private notifyChangeFuncs:Function[];
    //debug
    // public name:string="";

    constructor(signal:signalType,reactFunc:Function = function(){}){
        this.signal = signal;
        this.reactFunc = reactFunc;
        this.notifyChangeFuncs = new Array<Function>();
    }

    public getSignal():signalType{
        return this.signal;
    }

    public changeSiganl():void{
        if (typeof this.signal === "boolean")
            this.signal = !this.signal;
        if (typeof this.signal === "number")
            this.signal = bool2num(!num2bool(this.signal));
        this.SignalKeep();
    }

    public setReactFunc(reactFunc:Function):void{
        this.reactFunc = reactFunc;
    }

    public setSignal(signal:signalType):void{
        this.signal = signal;
        this.SignalKeep();
    }

    public SignalKeep():void{
        this.notifyChange();
        this.reactFunc();
    }

    public addNotifyChangeFunc(notifychangeFunc:Function):void{
        this.notifyChangeFuncs.push(notifychangeFunc);
    }

    private notifyChange():void{
        if (this.notifyChangeFuncs.length === 0)
            return;
        this.notifyChangeFuncs.forEach(changeFuncs => {
            changeFuncs();
        });
    }

    public syncSignal(changedSignal:Signal,LogicFunc:(Signal:signalType)=>signalType):void{
        this.setSignal(LogicFunc(changedSignal.getSignal()));
    }

}