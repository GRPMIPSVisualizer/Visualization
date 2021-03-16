import { Signal,signalType } from "./Signal";

export class Wire{
    private changePin:Signal;
    private reactPin:Signal;
    constructor(changePin:Signal,reactPin:Signal,LogicFunc:(Signal:signalType)=>signalType = function(signal:signalType){return signal}){
        this.changePin = changePin;
        this.reactPin = reactPin;
        this.reactPin.setSignal(LogicFunc(this.changePin.getSignal()));
        this.changePin.addNotifyChangeFunc(this.reactPin.syncSignal.bind(this.reactPin,this.changePin,LogicFunc));
    }
}