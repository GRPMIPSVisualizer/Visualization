import { Signal,signalType  } from "./Signal";
import { Wire} from "./Wire";

export class Wired{
    private Wires:Wire[];
    constructor(){
        this.Wires = new Array<Wire>();
    }

    public addWire(changeSignal:Signal,reactSiganl:Signal,LogicFunc?:(Signal:signalType)=>signalType):void{
        let newWire = (LogicFunc === undefined)?new Wire(changeSignal,reactSiganl):new Wire(changeSignal,reactSiganl,LogicFunc);
        this.Wires.push(newWire);
    }
}